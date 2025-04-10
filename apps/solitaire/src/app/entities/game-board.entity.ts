import { Color3, CreateGround, StandardMaterial } from '@babylonjs/core';
import { injectable } from 'inversify';

@injectable()
export class GameBoardEntity {
  public constructor() {
    this.init();
  }

  private init() {
    const gameBoardMaterial = new StandardMaterial('game_board');
    gameBoardMaterial.diffuseColor = Color3.Green();

    const ground = CreateGround('game_board', { width: 20, height: 13 });
    ground.material = gameBoardMaterial; 
  }
}
