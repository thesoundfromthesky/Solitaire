import { Vector3 } from '@babylonjs/core';
import { injectable } from 'inversify';

@injectable()
export class ConfigService {
  public readonly cardWidth = 2.5 / 2.5;
  public readonly cardHeight = 3.5 / 2.5;
  public readonly cellPositions = this.createCellPositions();

  public readonly foundationPileZ = 3.3;
  public readonly tableauPileZ = 1.3;

  private createCellPositions() {
    const cellPositions = [];
    for (let i = -3; i < 4; ++i) {
      const x = this.cardWidth * i + i * 0.15;
      const cellPosition = new Vector3(x, 0, 0);
      cellPositions.push(cellPosition);
    }

    return cellPositions;
  }
}
