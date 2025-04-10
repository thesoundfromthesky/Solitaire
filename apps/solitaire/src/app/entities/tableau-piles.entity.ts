import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { Injector } from '../injector/injector';
import { TableauPileEntity } from './tableau-pile.entity';
import { DeckService } from '../solitaire-services/deck.service';
import { TableauPileService } from '../solitaire-services/tableau-pile.service';
import { Axis, Space, Tools } from '@babylonjs/core';

@injectable()
export class TableauPilesEntity {
  private readonly injector = injectService(Injector);
  private readonly deckService = injectService(DeckService);
  private readonly tableauPileService = injectService(TableauPileService);

  public constructor() {
    this.init();
  }

  private init() {
    this.initTableauPiles();
  }

  private initTableauPiles() {
    Array.from({ length: 7 }, (_, i) => {
      const {
        entity: { trigger, pile },
      } = this.injector.createInstance(TableauPileEntity);
      trigger.name = `tableau_pile_trigger_${i + 1}`;

      for (let j = 0; j < i + 1; ++j) {
        const card = this.deckService.deck.pop();
        if (!card) {
          throw Error(`card is ${card}`);
        }

        if (j === i && card.rotationQuaternion) {
          card.rotate(Axis.Z, Tools.ToRadians(180), Space.WORLD);
        } else if (!card.rotationQuaternion) {
          throw Error(`card.rotationQuaternion is ${card.rotationQuaternion}`);
        }

        this.tableauPileService.addCardToTableauPile(trigger, pile, card);
      }
    });
  }
}
