import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';
import { PlaceholderService } from '../solitaire-services/placeholder.service';
import { FoundationPileEntity } from './foundation-pile.entity';
import { Injector } from '../injector/injector';

@injectable()
export class FoundationPilesEntity {
  private readonly configService = injectService(ConfigService);
  private readonly placeholderService = injectService(PlaceholderService);
  private readonly injector = injectService(Injector);

  public constructor() {
    this.init();
  }

  private init() {
    this.initFoundationPiles();
  }

  private initFoundationPiles() {
    const { cellPositions, foundationPileZ } = this.configService;

    Array.from({ length: 4 }, (_, i) => {
      const {
        entity: { trigger },
      } = this.injector.createInstance(FoundationPileEntity);
      trigger.name = `foundation_pile_trigger_${i + 1}`;
      trigger.position.x = cellPositions[i + 3].x;
      trigger.position.z = foundationPileZ;

      const foundationPilePlaceholderInstance =
        this.placeholderService.createPlaceholderInstance(
          `foundation_pile_placeholder_${i + 1}`
        );
      foundationPilePlaceholderInstance.position.x = cellPositions[i + 3].x;
      foundationPilePlaceholderInstance.position.z = foundationPileZ;
    });
  }
}
