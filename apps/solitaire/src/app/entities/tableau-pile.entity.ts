import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { TriggerService } from '../solitaire-services/trigger.service';
import { WorldService } from '../core/world.service';
import { PileComponent } from '../solitaire-components/pile.component';
import { TriggerComponent } from '../solitaire-components/trigger.component';
import { TableauComponent } from '../solitaire-components/tableau.component';

export type TableauPileEntityArcheType = TriggerComponent &
  PileComponent &
  TableauComponent;

@injectable()
export class TableauPileEntity {
  private readonly triggerService = injectService(TriggerService);
  private readonly worldService = injectService(WorldService);

  public entity!: TableauPileEntityArcheType;
  public constructor() {
    this.init();
  }

  private init() {
    this.initEntity();
  }

  private initEntity() {
    const { trigger } = this.createTriggerComponent();
    const { pile } = this.createPileComponent();
    const { tableau } = this.createTableauComponent();
    const entity = this.worldService
      .getWorld<TableauPileEntityArcheType>()
      .add({
        trigger,
        pile,
        tableau,
      });
    this.entity = entity;
  }

  private createTriggerComponent() {
    const tableauPileInstance =
      this.triggerService.createTriggerInstance('tableau_pile');
    return new TriggerComponent(tableauPileInstance);
  }

  private createPileComponent() {
    return new PileComponent([]);
  }

  private createTableauComponent() {
    return new TableauComponent();
  }
}
