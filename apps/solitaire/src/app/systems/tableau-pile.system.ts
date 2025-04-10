import { injectable } from 'inversify';
import type { TableauPileEntityArcheType } from '../entities/tableau-pile.entity';
import { WorldService } from '../core/world.service';
import { injectService } from '../injector/inject-service.function';
import {
  type AbstractMesh,
  Axis,
  PointerEventTypes,
  Space,
  Tools,
  Vector3,
} from '@babylonjs/core';
import { SceneService } from '../core/scene.service';
import { PointerDragBehaviorService } from '../core/pointer-drag-behavior.service';
import { TableauPileService } from '../solitaire-services/tableau-pile.service';
import type { FoundationPileEntityArcheType } from '../entities/foundation-pile.entity';
import { FoundationPileService } from '../solitaire-services/foundation-pile.service';

@injectable()
export class TableauPileSystem {
  private readonly worldService = injectService(WorldService);
  private readonly sceneService = injectService(SceneService);
  private readonly pointerDragBehaviorService = injectService(
    PointerDragBehaviorService
  );
  private readonly pointerDragBehavior =
    this.pointerDragBehaviorService.createPointerDragBehavior();
  private readonly tableauPileQuery = this.worldService
    .getWorld<TableauPileEntityArcheType>()
    .with('pile', 'trigger', 'tableau');
  private readonly tableauPileService = injectService(TableauPileService);
  private readonly foundationPileQuery = this.worldService
    .getWorld<FoundationPileEntityArcheType>()
    .with('pile', 'trigger', 'foundation');
  private readonly foundationPileService = injectService(FoundationPileService);

  private currentCard?: AbstractMesh;
  private currentTrigger?: AbstractMesh;
  private currentPile?: AbstractMesh[];
  private lastPosition = Vector3.Zero();
  private childrenCards: AbstractMesh[] = [];

  public constructor() {
    this.init();
  }

  private init() {
    this.initPointerEvent();
  }

  private initPointerEvent() {
    this.sceneService.scene.onPointerObservable.add(({ type, pickInfo }) => {
      switch (type) {
        case PointerEventTypes.POINTERDOWN:
          if (pickInfo && pickInfo.hit && pickInfo.pickedMesh) {
            const { pickedMesh: card } = pickInfo;
            for (const { pile, trigger } of this.tableauPileQuery) {
              if (!pile.includes(card)) {
                continue;
              }

              if (card.forward.y === 1) {
                const lastCard = pile.at(-1);
                if (!lastCard) {
                  break;
                }

                if (lastCard === card && card.forward.y === 1) {
                  card.rotate(Axis.Z, Tools.ToRadians(-180), Space.WORLD);
                  break;
                }

                break;
              }

              const cardIndex = pile.findIndex((targetCard) => {
                return targetCard === card;
              });

              const childrenCards = pile.slice(cardIndex + 1);
              this.childrenCards = childrenCards;
              childrenCards.forEach((childCard) => {
                childCard.setParent(card);
              });

              this.lastPosition.copyFrom(card.position);
              card.position.y += 0.2;
              card.computeWorldMatrix(true);
              card.addBehavior(this.pointerDragBehavior);
              this.currentCard = card;
              this.currentTrigger = trigger;
              this.currentPile = pile;

              break;
            }
          }
          break;
        case PointerEventTypes.POINTERUP:
          if (!this.currentCard || !this.currentTrigger || !this.currentPile) {
            break;
          }

          for (const { pile, trigger } of this.foundationPileQuery) {
            if (
              !this.currentCard.intersectsMesh(trigger) ||
              this.childrenCards.length > 0 ||
              !this.foundationPileService.validateCardForFoundationPile(
                pile,
                this.currentCard
              )
            ) {
              continue;
            }

            const card = this.tableauPileService.drawCardFromTableauPile(
              this.currentTrigger,
              this.currentPile
            );

            if (!card) {
              throw Error(`card is ${card}`);
            }

            this.currentCard.removeBehavior(this.pointerDragBehavior);
            this.currentCard = undefined;
            this.currentPile = undefined;
            this.currentTrigger = undefined;

            this.foundationPileService.addCardToFoundationPile(
              trigger,
              pile,
              card
            );

            break;
          }

          for (const { pile, trigger } of this.tableauPileQuery) {
            if (
              !this.currentCard ||
              this.currentTrigger === trigger ||
              !this.currentCard.intersectsMesh(trigger) ||
              !this.tableauPileService.validateCardForTableauPile(
                pile,
                this.currentCard
              )
            ) {
              continue;
            }

            this.childrenCards.forEach((childCard) => {
              childCard.setParent(null);
            });

            const sequenceSize = this.childrenCards.length + 1;

            const sequencePile = Array.from({ length: sequenceSize }, () => {
              if (!this.currentTrigger || !this.currentPile) {
                return;
              }
              const card = this.tableauPileService.drawCardFromTableauPile(
                this.currentTrigger,
                this.currentPile
              );

              if (!card) {
                throw Error(`card is ${card}`);
              }

              return card;
            }) as AbstractMesh[];

            this.currentCard.removeBehavior(this.pointerDragBehavior);
            this.currentCard = undefined;
            this.currentPile = undefined;
            this.currentTrigger = undefined;

            let card = sequencePile.pop();
            while (card) {
              this.tableauPileService.addCardToTableauPile(trigger, pile, card);
              card = sequencePile.pop();
            }

            break;
          }

          if (!this.currentCard) {
            break;
          }

          this.currentCard.removeBehavior(this.pointerDragBehavior);
          this.currentCard.position.copyFrom(this.lastPosition);
          this.currentCard = undefined;
          this.currentPile = undefined;
          this.currentTrigger = undefined;

          this.childrenCards.forEach((childCard) => {
            childCard.setParent(null);
          });
          this.childrenCards = [];

          break;
      }
    });
  }
}
