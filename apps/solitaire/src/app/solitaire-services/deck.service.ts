import {
  type AbstractMesh,
  Axis,
  CreatePlane,
  Mesh,
  Space,
  StandardMaterial,
  Texture,
  Tools,
} from '@babylonjs/core';
import { injectable } from 'inversify';
import { ConfigService } from '../config/config.service';
import { injectService } from '../injector/inject-service.function';
import { UvService } from '../core/uv.service';

export type Suit = 'club' | 'diamond' | 'heart' | 'spade';

@injectable()
export class DeckService {
  private readonly configService = injectService(ConfigService);
  private readonly uvService = injectService(UvService);

  private cardTexture?: Texture;
  private cardMaterial?: StandardMaterial;

  public deck!: AbstractMesh[];

  public constructor() {
    this.init();
  }

  private init() {
    this.initDeck();
  }

  private createCard(
    suit: Suit,
    numbering: number,
    column: number,
    row: number
  ) {
    if (!this.cardTexture) {
      const cardTexture = new Texture('textures/cards/cards.png');
      this.cardTexture = cardTexture;
      cardTexture.hasAlpha = true;
    }
    const cardTexture = this.cardTexture;

    if (!this.cardMaterial) {
      const cardMaterial = new StandardMaterial('card');
      this.cardMaterial = cardMaterial;
      cardMaterial.diffuseTexture = cardTexture;
    }

    const cardMaterial = this.cardMaterial;

    const { cardWidth, cardHeight } = this.configService;
    const frontUVs = this.uvService.getUVs(column, row);
    const backUVs = this.uvService.getUVs(1, 13);
    const card = CreatePlane(`${suit}_${numbering}`, {
      width: cardWidth,
      height: cardHeight,
      sideOrientation: Mesh.DOUBLESIDE,
      frontUVs,
      backUVs,
    });
    card.isPickable = true;
    card.material = cardMaterial;
    card.position.y = 0.001;
    card.rotate(Axis.X, Tools.ToRadians(90), Space.WORLD); 
    card.rotate(Axis.Z, Tools.ToRadians(180), Space.WORLD);

    return card;
  }

  private shuffle(array: unknown[]) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  private initDeck() {
    const deck: AbstractMesh[] = [];
    const suits: Suit[] = ['spade', 'heart', 'diamond', 'club'];
    const rowsWithThreeColumns = [1, 4, 7, 10];

    let rowCount = 0;
    let currentSuit: Suit = 'club';

    const { uvColumns, uvRows } = this.uvService;
    for (let row = uvRows - 1; row > 0; --row) {
      for (let column = 1; column <= uvColumns; ++column) {
        if (row % 3 === 0 && column === 1) {
          rowCount = 0;

          const suit = suits.pop();
          if (!suit) {
            throw Error(`suit is ${suit}`);
          }
          currentSuit = suit;
        }

        const numbering = column + rowCount * uvColumns;

        if (rowsWithThreeColumns.includes(row) && column > 3) {
          break;
        }

        const card = this.createCard(currentSuit, numbering, column, row);

        card.position.x = 0;
        card.position.z = 0;
        deck.push(card);
      }
      ++rowCount;
    }

    this.shuffle(deck);
    this.deck = deck;
  }
}
