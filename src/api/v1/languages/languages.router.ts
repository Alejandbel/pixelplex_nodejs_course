import * as express from 'express';
import { IRouter } from 'express';

import { LanguagesController } from './languages.controller';

const router = express.Router();

router.get('/', LanguagesController.getAllLanguages);
router.get('/:id', LanguagesController.getLanguage);
router.post('/', LanguagesController.addLanguage);
router.patch('/:id', LanguagesController.updateLanguage);
router.delete('/:id', LanguagesController.deleteLanguage);

export function mountRouter(routing: IRouter): void {
  routing.use('/languages', router);
}
