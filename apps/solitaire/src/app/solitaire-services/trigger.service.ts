import { CreateBox, StandardMaterial } from '@babylonjs/core';
import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';

@injectable()
export class TriggerService {
  private readonly configService = injectService(ConfigService);
  private readonly trigger = this.createTrigger();

  private createTrigger() {
    const triggerMaterial = new StandardMaterial('trigger');

    const { cardWidth, cardHeight } = this.configService;
    const triggerMesh = CreateBox('trigger', {
      width: cardWidth,
      depth: cardHeight,
      height: 1,
    });
    triggerMesh.setEnabled(false);
    triggerMesh.material = triggerMaterial;

    if (import.meta.env.DEV) {
      triggerMesh.visibility = 0.5;
    } else {
      triggerMesh.visibility = 0;
    }

    return triggerMesh;
  }

  public createTriggerInstance(name: string) {
    return this.trigger.createInstance(name);
  }
}
