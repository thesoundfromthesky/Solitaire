import { Axis, Space, Tools, type AbstractMesh } from '@babylonjs/core';
import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';

@injectable()
export class DiscardPileService {
  private readonly configService = injectService(ConfigService);

  public readonly discardPile: AbstractMesh[] = [];

  public addCardToDiscardPile(card: AbstractMesh) {
    this.discardPile.push(card);
    const { cellPositions } = this.configService;
    const discardPileLastIndex = this.discardPile.length - 1;
    card.position.x = cellPositions[1].x;
    card.position.y = 0.001 + 0.001 * discardPileLastIndex;
    card.rotate(Axis.Z, Tools.ToRadians(-180), Space.WORLD);
  }
}
