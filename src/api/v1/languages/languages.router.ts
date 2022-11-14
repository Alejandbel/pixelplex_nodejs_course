import * as express from 'express';
import { IRouter } from 'express';

import { LanguagesController } from './languages.controller';
import { LanguagesValidation } from './languages.validation';
import { validatePayload } from '@middleware';

const router = express.Router();

router.get('/', LanguagesValidation.getAllLanguages, validatePayload, LanguagesController.getAllLanguages);
router.get('/:id', LanguagesValidation.getLanguage, validatePayload, LanguagesController.getLanguage);
router.post('/', LanguagesValidation.addLanguage, validatePayload, LanguagesController.addLanguage);
router.patch('/:id', LanguagesValidation.updateLanguage, validatePayload, LanguagesController.updateLanguage);
router.delete('/:id', LanguagesValidation.deleteLanguage, validatePayload, LanguagesController.deleteLanguage);

export function mountRouter(routing: IRouter): void {
  routing.use('/languages', router);
}
