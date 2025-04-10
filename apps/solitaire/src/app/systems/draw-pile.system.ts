import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { SceneService } from '../core/scene.service';
import { DrawPileService } from '../solitaire-services/draw-pile.service';
import { Axis, PointerEventTypes, Space, Tools } from '@babylonjs/core';
import { DiscardPileService } from '../solitaire-services/discard-pile.service';

@injectable()
export class DrawPileSystem {
  private readonly sceneService = injectService(SceneService);
  private readonly drawPileService = injectService(DrawPileService);
  private readonly discardPileService = injectService(DiscardPileService);

  public constructor() {
    this.init();
  }

  private init() {
    this.sceneService.scene.onPointerObservable.add(({ type, pickInfo }) => {
      switch (type) {
        case PointerEventTypes.POINTERPICK:
          {
            const { drawPile, drawPilePlaceholder } = this.drawPileService;
            const lastIndex = drawPile.length - 1;
            const lastCard = drawPile[lastIndex];

            if (pickInfo && pickInfo.hit && pickInfo.pickedMesh) {
              switch (pickInfo.pickedMesh) {
                case lastCard:
                  {
                    const card = drawPile.pop();
                    if (card) {
                      this.discardPileService.addCardToDiscardPile(card);
                    }
                  }
                  break;
                case drawPilePlaceholder:
                  {
                    let card = this.discardPileService.discardPile.pop();
                    while (card) {
                      card.rotate(Axis.Z, Tools.ToRadians(-180), Space.WORLD);
                      this.drawPileService.addCardToDrawPile(card);
                      card = this.discardPileService.discardPile.pop();
                    }
                  }
                  break;
              }
            }
          }
          break;
      }
    });
  }
}
