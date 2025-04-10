import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { SceneService } from '../core/scene.service';
import { WorldService } from '../core/world.service';
import { AbstractMesh, PointerEventTypes, Vector3 } from '@babylonjs/core';
import { PointerDragBehaviorService } from '../core/pointer-drag-behavior.service';
import type { FoundationPileEntityArcheType } from '../entities/foundation-pile.entity';
import type { TableauPileEntityArcheType } from '../entities/tableau-pile.entity';
import { TableauPileService } from '../solitaire-services/tableau-pile.service';

@injectable()
export class FoundationPileSystem {
  private readonly sceneService = injectService(SceneService);
  private readonly worldService = injectService(WorldService);
  private readonly pointerDragBehaviorService = injectService(
    PointerDragBehaviorService
  );
  private readonly pointerDragBehavior =
    this.pointerDragBehaviorService.createPointerDragBehavior();
  private readonly foundationPileQuery = this.worldService
    .getWorld<FoundationPileEntityArcheType>()
    .with('pile', 'trigger', 'foundation');
  private readonly tableauPileQuery = this.worldService
    .getWorld<TableauPileEntityArcheType>()
    .with('pile', 'trigger', 'tableau');
  private readonly tableauPileService = injectService(TableauPileService);

  private currentCard?: AbstractMesh;
  private currentPile?: AbstractMesh[];
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
          if (pickInfo && pickInfo.hit && pickInfo.pickedMesh) {
            const { pickedMesh: card } = pickInfo;
            for (const { pile } of this.foundationPileQuery) {
              if (!pile.includes(card)) {
                continue;
              }

              this.lastPosition.copyFrom(card.position);
              card.position.y += 0.2;
              card.computeWorldMatrix(true);
              card.addBehavior(this.pointerDragBehavior);
              this.currentCard = card;
              this.currentPile = pile;
            }
          }
          break;
        case PointerEventTypes.POINTERUP:
          for (const { pile, trigger } of this.tableauPileQuery) {
            if (!this.currentCard || !this.currentPile) {
              break;
            }

            if (
              !this.currentCard.intersectsMesh(trigger) ||
              !this.tableauPileService.validateCardForTableauPile(
                pile,
                this.currentCard
              )
            ) {
              continue;
            }

            const card = this.currentPile.pop();
            if (!card) {
              throw Error(`card is ${card}`);
            }
            this.currentCard.removeBehavior(this.pointerDragBehavior);
            this.currentCard = undefined;
            this.currentPile = undefined;
            this.tableauPileService.addCardToTableauPile(trigger, pile, card);
            break;
          }

          if (!this.currentCard) {
            break;
          }

          this.currentCard.removeBehavior(this.pointerDragBehavior);
          this.currentCard.position.copyFrom(this.lastPosition);
          this.currentCard = undefined;
          this.currentPile = undefined;

          break;
      }
    });
  }
}
