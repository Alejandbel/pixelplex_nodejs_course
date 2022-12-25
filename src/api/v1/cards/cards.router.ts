import { IRouter } from 'express';
import * as express from 'express';

import { isAuth, validatePayload } from '@middleware';

import { CardsController } from './cards.controller';
import { CardsSanitization } from './cards.sanitization';
import { CardsValidation } from './cards.validation';

const router = express.Router();

router.get(
  '/',
  isAuth,
  CardsValidation.getAllCards,
  validatePayload,
  CardsSanitization.getAllCards,
  CardsController.getAllCards
);

router.get(
  '/:id',
  isAuth,
  CardsValidation.getCard,
  validatePayload,
  CardsSanitization.getCard,
  CardsController.getCard
);

router.post('/', isAuth, CardsValidation.addCard, validatePayload, CardsSanitization.addCard, CardsController.addCard);

router.patch(
  '/:id',
  isAuth,
  CardsValidation.updateCard,
  validatePayload,
  CardsSanitization.updateCard,
  CardsController.updateCard
);

router.delete(
  '/:id',
  isAuth,
  CardsValidation.deleteCard,
  validatePayload,
  CardsSanitization.deleteCard,
  CardsController.deleteCard
);

export function mountRouter(routing: IRouter): void {
  routing.use('/cards', router);
}
