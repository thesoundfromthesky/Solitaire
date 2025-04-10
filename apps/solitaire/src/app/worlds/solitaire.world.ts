import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { Injector } from '../injector/injector';
import { WorldLifeCycleService } from '../core/world-life-cycle.service';
import { HemisphericLightEntity } from '../entities/lights/hemispheric-light.entity';
import { ArcRotateCameraEntity } from '../entities/cameras/arc-rotate-camera-entity';
import { GameBoardEntity } from '../entities/game-board.entity';
import { DrawPileEntity } from '../entities/draw-pile.entity';
import { TableauPilesEntity } from '../entities/tableau-piles.entity';
import { DrawPileSystem } from '../systems/draw-pile.system';
import { WorldService } from '../core/world.service';
import type { TriggerComponent } from '../solitaire-components/trigger.component';
import { DiscardPileSystem } from '../systems/discard-pile.system';
import { TableauPileSystem } from '../systems/tableau-pile.system';
import { FoundationPilesEntity } from '../entities/foundation-piles.entity';
import { FoundationPileSystem } from '../systems/foundation-pile.system';

@injectable()
export class SolitaireWorld {
  private readonly injector = injectService(Injector);
  private readonly worldLifeCycleService = injectService(WorldLifeCycleService);
  private readonly worldService = injectService(WorldService);

  public constructor() {
    this.worldLifeCycleService.onInitObservable.add(async () => {
      await this.init();
    });
  }

  private async init() {
    this.worldService.subscribeUpdateEntityId<TriggerComponent>('trigger');
    this.initEntities();
  }

  private initEntities() {
    this.injector.createInstances([
      ArcRotateCameraEntity,
      HemisphericLightEntity,
      GameBoardEntity,
      TableauPilesEntity,
      DrawPileEntity,
      FoundationPilesEntity,
      DrawPileSystem,
      DiscardPileSystem,
      TableauPileSystem,
      FoundationPileSystem,
    ]);
  }
}
