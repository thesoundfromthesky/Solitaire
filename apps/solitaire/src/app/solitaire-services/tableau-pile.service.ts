import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';
import type { AbstractMesh } from '@babylonjs/core';
import { ValidateService } from './validate.service';

@injectable()
export class TableauPileService {
  private readonly configService = injectService(ConfigService);
  private readonly validateService = injectService(ValidateService);

  public addCardToTableauPile(
    trigger: AbstractMesh,
    tableauPile: AbstractMesh[],
    card: AbstractMesh
  ) {
    const triggerLocation = trigger.name.split('_').at(-1);
    if (!triggerLocation) {
      throw Error(`triggerName is ${triggerLocation}`);
    }

    const cellPositionIndex = Number(triggerLocation) - 1;
    tableauPile.push(card);
    const { cellPositions, tableauPileZ } = this.configService;
    const cellPosition = cellPositions[cellPositionIndex];
    const tableauPileLastIndex = tableauPile.length - 1;
    card.position.x = cellPosition.x;
    card.position.y = 0.001 + 0.001 * tableauPileLastIndex;
    card.position.z = tableauPileZ - tableauPileLastIndex * 0.35;

    trigger.position.copyFrom(card.position);
  }

  public drawCardFromTableauPile(
    trigger: AbstractMesh,
    tableauPile: AbstractMesh[]
  ) {
    const triggerLocation = trigger.name.split('_').at(-1);
    if (!triggerLocation) {
      throw Error(`triggerName is ${triggerLocation}`);
    }

    const cellPositionIndex = Number(triggerLocation) - 1;
    const { cellPositions, tableauPileZ } = this.configService;
    const cellPosition = cellPositions[cellPositionIndex];

    const card = tableauPile.pop();

    const tableauPileLastIndex = Math.max(tableauPile.length - 1, 0);
    trigger.position.x = cellPosition.x;
    trigger.position.y = 0.001 + 0.001 * tableauPileLastIndex;
    trigger.position.z = tableauPileZ - tableauPileLastIndex * 0.35;

    return card;
  }

  public validateCardForTableauPile(
    tableauPile: AbstractMesh[],
    card: AbstractMesh
  ) {
    if (tableauPile.length === 0 && this.validateService.isCardK(card)) {
      return true;
    }
    const lastCard = tableauPile.at(-1);
    if (!lastCard) {
      return false;
    }

    return (
      this.validateService.isSequenceDecrementing(lastCard, card) &&
      this.validateService.isRed(lastCard) !== this.validateService.isRed(card)
    );
  }
}
