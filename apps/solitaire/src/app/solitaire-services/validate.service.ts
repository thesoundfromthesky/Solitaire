import type { AbstractMesh } from '@babylonjs/core';
import { injectable } from 'inversify';
import type { Suit } from './deck.service';

@injectable()
export class ValidateService {
  public isRed(card: AbstractMesh) {
    const cardName = card.name.split('_')[0] as Suit;
    if (cardName === 'diamond' || cardName === 'heart') {
      return true;
    }
    return false;
  }

  public isBlack(card: AbstractMesh) {
    const cardName = card.name.split('_')[0] as Suit;
    if (cardName === 'club' || cardName === 'spade') {
      return true;
    }
    return false;
  }

  public getSuit(card: AbstractMesh) {
    const cardSuit = card.name.split('_')[0] as Suit;
    return cardSuit;
  }
  
  public isCardK(card: AbstractMesh) {
    const cardNumber = Number(card.name.split('_')[1]);
    return cardNumber === 13;
  }

  public isCardA(card: AbstractMesh) {
    const cardNumber = Number(card.name.split('_')[1]);
    return cardNumber === 1;
  }

  public isSequenceDecrementing(lastCard: AbstractMesh, card: AbstractMesh) {
    const lastCardNumber = Number(lastCard.name.split('_')[1]);
    const cardNumber = Number(card.name.split('_')[1]);

    return lastCardNumber - cardNumber === 1;
  }

  public isSequenceIncrementing(lastCard: AbstractMesh, card: AbstractMesh) {
    const lastCardNumber = Number(lastCard.name.split('_')[1]);
    const cardNumber = Number(card.name.split('_')[1]);

    return cardNumber - lastCardNumber === 1;
  }
}
