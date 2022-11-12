import * as express from 'express';
import { IRouter } from 'express';

import { CardsController } from './cards.controller';

const router = express.Router();

router.get('/', CardsController.getAllCards);
router.get('/:id', CardsController.getCard);
router.post('/', CardsController.addCard);
router.patch('/:id', CardsController.updateCard);
router.delete('/:id', CardsController.deleteCard);

export function mountRouter(routing: IRouter): void {
  routing.use('/cards', router);
}
