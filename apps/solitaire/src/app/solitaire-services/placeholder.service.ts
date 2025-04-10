import { injectable } from 'inversify';
import { injectService } from '../injector/inject-service.function';
import { ConfigService } from '../config/config.service';
import {
  Axis,
  Color4,
  CreatePlane,
  Space,
  StandardMaterial,
  Tools,
} from '@babylonjs/core';

@injectable()
export class PlaceholderService {
  private readonly configService = injectService(ConfigService);

  private placeholder;

  public constructor() {
    this.placeholder = this.createPlaceholder();
  }

  private createPlaceholder() {
    const { cardWidth, cardHeight } = this.configService;
    const placeholderMaterial = new StandardMaterial('placeholder');
    placeholderMaterial.alpha = 0;

    const placeholderMesh = CreatePlane('placeholder', {
      width: cardWidth,
      height: cardHeight,
    });
    placeholderMesh.material = placeholderMaterial;
    placeholderMesh.setEnabled(false);
    placeholderMesh.position.y = 0.001;
    placeholderMesh.rotate(Axis.X, Tools.ToRadians(90), Space.WORLD);

    placeholderMesh.enableEdgesRendering();
    placeholderMesh.edgesWidth = 2;
    placeholderMesh.edgesColor = new Color4(0, 0, 0, 255);
    placeholderMesh.edgesShareWithInstances = true;

    return placeholderMesh;
  }

  public createPlaceholderInstance(name: string) {
    return this.placeholder.createInstance(name);
  }
}
