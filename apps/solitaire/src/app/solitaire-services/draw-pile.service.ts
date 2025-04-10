import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';
import type { AbstractMesh } from '@babylonjs/core';

@injectable()
export class DrawPileService {
  public readonly drawPile: AbstractMesh[] = [];
  #drawPilePlaceholder?: AbstractMesh;
  public get drawPilePlaceholder() {
    if (!this.#drawPilePlaceholder) {
      throw Error(`drawPilePlaceholder is ${this.#drawPilePlaceholder}`);
    }
    return this.#drawPilePlaceholder;
  }
  public set drawPilePlaceholder(value) {
    this.#drawPilePlaceholder = value;
  }

  private readonly configService = injectService(ConfigService);

  public addCardToDrawPile(card: AbstractMesh) {
    this.drawPile.push(card);

    const { cellPositions, foundationPileZ } = this.configService;
    const drawPileLastIndex = this.drawPile.length - 1;
    card.position.x = cellPositions[0].x;
    card.position.y = 0.002 + 0.001 * drawPileLastIndex;
    card.position.z = foundationPileZ;
  }
}
