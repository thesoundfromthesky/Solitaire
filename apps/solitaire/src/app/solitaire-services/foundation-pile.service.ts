import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';
import { ValidateService } from './validate.service';
import { AbstractMesh } from '@babylonjs/core';

@injectable()
export class FoundationPileService {
  private readonly configService = injectService(ConfigService);
  private readonly validateService = injectService(ValidateService);

  public validateCardForFoundationPile(
    foundationPile: AbstractMesh[],
    card: AbstractMesh
  ) {
    if (foundationPile.length === 0 && this.validateService.isCardA(card)) {
      return true;
    }

    const lastCard = foundationPile.at(-1);
    if (!lastCard) {
      return false;
    }

    return (
      this.validateService.isSequenceIncrementing(lastCard, card) &&
      this.validateService.getSuit(lastCard) ===
        this.validateService.getSuit(card)
    );
  }

  public addCardToFoundationPile(
    trigger: AbstractMesh,
    foundationPile: AbstractMesh[],
    card: AbstractMesh
  ) {
    const triggerLocation = trigger.name.split('_').at(-1);
    if (!triggerLocation) {
      throw Error(`triggerName is ${triggerLocation}`);
    }

    const cellPositionIndex = Number(triggerLocation) - 1;
    foundationPile.push(card);
    const { cellPositions, foundationPileZ } = this.configService;
    const cellPosition = cellPositions[cellPositionIndex + 3];
    const foundationPileLastIndex = foundationPile.length - 1;

    card.position.x = cellPosition.x;
    card.position.y = 0.002 + 0.001 * foundationPileLastIndex;
    card.position.z = foundationPileZ;
  }
}
