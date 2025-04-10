import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { DiscardPileService } from '../solitaire-services/discard-pile.service';
import { SceneService } from '../core/scene.service';
import { type AbstractMesh, PointerEventTypes, Vector3 } from '@babylonjs/core';
import { WorldService } from '../core/world.service';
import type { TableauPileEntityArcheType } from '../entities/tableau-pile.entity';
import { TableauPileService } from '../solitaire-services/tableau-pile.service';
import { PointerDragBehaviorService } from '../core/pointer-drag-behavior.service';
import type { FoundationPileEntityArcheType } from '../entities/foundation-pile.entity';
import { FoundationPileService } from '../solitaire-services/foundation-pile.service';

@injectable()
export class DiscardPileSystem {
  private readonly discardPileService = injectService(DiscardPileService);
  private readonly sceneService = injectService(SceneService);
  private readonly worldService = injectService(WorldService);
  private readonly tableauPileService = injectService(TableauPileService);
  private readonly pointerDragBehaviorService = injectService(
    PointerDragBehaviorService
  );
  private readonly tableauPileQuery = this.worldService
    .getWorld<TableauPileEntityArcheType>()
    .with('pile', 'trigger', 'tableau');
  private readonly foundationPileQuery = this.worldService
    .getWorld<FoundationPileEntityArcheType>()
    .with('pile', 'trigger', 'foundation');
  private readonly foundationPileService = injectService(FoundationPileService);
  private readonly pointerDragBehavior =
    this.pointerDragBehaviorService.createPointerDragBehavior();

  private currentCard?: AbstractMesh;
  private lastPosition = Vector3.Zero();

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
          {
            const { discardPile } = this.discardPileService;
            const lastIndex = discardPile.length - 1;
            const lastCard = discardPile[lastIndex];
            if (pickInfo && pickInfo.hit && pickInfo.pickedMesh) {
              if (pickInfo.pickedMesh === lastCard) {
                this.lastPosition.copyFrom(lastCard.position);
                lastCard.position.y += 0.2;
                lastCard.computeWorldMatrix(true);
                lastCard.addBehavior(this.pointerDragBehavior);
                this.currentCard = lastCard;
              }
            }
          }
          break;

        case PointerEventTypes.POINTERUP:
          if (!this.currentCard) {
            break;
          }

          for (const { pile, trigger } of this.foundationPileQuery) {
            if (this.currentCard.intersectsMesh(trigger)) {
              if (
                !this.foundationPileService.validateCardForFoundationPile(
                  pile,
                  this.currentCard
                )
              ) {
                continue;
              }

              const card = this.discardPileService.discardPile.pop();
              if (!card) {
                throw Error(`card is ${card}`);
              }

              this.currentCard.removeBehavior(this.pointerDragBehavior);
              this.currentCard = undefined;

              this.foundationPileService.addCardToFoundationPile(
                trigger,
                pile,
                card
              );
              break;
            }
          }

          for (const { pile, trigger } of this.tableauPileQuery) {
            if (this.currentCard && this.currentCard.intersectsMesh(trigger)) {
              if (
                !this.tableauPileService.validateCardForTableauPile(
                  pile,
                  this.currentCard
                )
              ) {
                continue;
              }

              const card = this.discardPileService.discardPile.pop();
              if (!card) {
                throw Error(`card is ${card}`);
              }

              this.currentCard.removeBehavior(this.pointerDragBehavior);
              this.currentCard = undefined;

              this.tableauPileService.addCardToTableauPile(trigger, pile, card);

              break;
            }
          }

          if (!this.currentCard) {
            break;
          }

          this.currentCard.removeBehavior(this.pointerDragBehavior);
          this.currentCard.position.copyFrom(this.lastPosition);
          this.currentCard = undefined;
          break;
      }
    });
  }
}
