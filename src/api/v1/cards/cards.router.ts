import * as express from 'express';
import { IRouter } from 'express';

import { CardsController } from './cards.controller';
import { CardsValidation } from './cards.validation';
import { validatePayload } from '@middleware';

const router = express.Router();

router.get('/', CardsValidation.getAllCards, validatePayload, CardsController.getAllCards);
router.get('/:id', CardsValidation.getCard, validatePayload, CardsController.getCard);
router.post('/', CardsValidation.addCard, validatePayload, CardsController.addCard);
router.patch('/:id', CardsValidation.updateCard, validatePayload, CardsController.updateCard);
router.delete('/:id', CardsValidation.deleteCard, validatePayload, CardsController.deleteCard);

export function mountRouter(routing: IRouter): void {
  routing.use('/cards', router);
}
