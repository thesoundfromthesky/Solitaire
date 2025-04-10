import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';
import { PlaceholderService } from '../solitaire-services/placeholder.service';
import { DrawPileService } from '../solitaire-services/draw-pile.service';
import { DeckService } from '../solitaire-services/deck.service';

@injectable()
export class DrawPileEntity {
  private readonly configService = injectService(ConfigService);
  private readonly placeholderService = injectService(PlaceholderService);
  private readonly drawPileService = injectService(DrawPileService);
  private readonly deckService = injectService(DeckService);

  public constructor() {
    this.init();
  }

  private init() {
    this.initDrawPile();
    this.initDrawPilePlaceholder();
  }

  private initDrawPile() {
    this.deckService.deck.forEach((card) => {
      this.drawPileService.addCardToDrawPile(card);
    });
  }
  private initDrawPilePlaceholder() {
    const { cellPositions, foundationPileZ } = this.configService;

    const drawPilePlaceholder =
      this.placeholderService.createPlaceholderInstance(
        'draw_pile_placeholder'
      );

    drawPilePlaceholder.position.x = cellPositions[0].x;
    drawPilePlaceholder.position.z = foundationPileZ;
    drawPilePlaceholder.isPickable = true;

    this.drawPileService.drawPilePlaceholder = drawPilePlaceholder;
  }
}
