import { IRouter } from 'express';
import * as express from 'express';

import { validatePayload } from '@middleware';

import { CardsController } from './cards.controller';
import { CardsSanitization } from './cards.sanitization';
import { CardsValidation } from './cards.validation';

const router = express.Router();

router.get(
  '/',
  CardsValidation.getAllCards,
  validatePayload,
  CardsSanitization.getAllCards,
  CardsController.getAllCards
);

router.get('/:id', CardsValidation.getCard, validatePayload, CardsSanitization.getCard, CardsController.getCard);

router.post('/', CardsValidation.addCard, validatePayload, CardsSanitization.addCard, CardsController.addCard);

router.patch(
  '/:id',
  CardsValidation.updateCard,
  validatePayload,
  CardsSanitization.updateCard,
  CardsController.updateCard
);

router.delete(
  '/:id',
  CardsValidation.deleteCard,
  validatePayload,
  CardsSanitization.deleteCard,
  CardsController.deleteCard
);

export function mountRouter(routing: IRouter): void {
  routing.use('/cards', router);
}
