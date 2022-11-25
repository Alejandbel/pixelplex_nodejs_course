import * as express from 'express';
import { IRouter } from 'express';

import { LanguagesController } from './languages.controller';
import { LanguagesValidation } from './languages.validation';
import { validatePayload } from '@middleware';
import { LanguagesSanitization } from './languages.sanitization';

const router = express.Router();

router.get(
  '/',
  LanguagesValidation.getAllLanguages,
  validatePayload,
  LanguagesSanitization.getAllLanguages,
  LanguagesController.getAllLanguages
);

router.get(
  '/:id',
  LanguagesValidation.getLanguage,
  validatePayload,
  LanguagesSanitization.getLanguage,
  LanguagesController.getLanguage
);

router.post('/', LanguagesValidation.addLanguage, validatePayload, LanguagesController.addLanguage);

router.patch(
  '/:id',
  LanguagesValidation.updateLanguage,
  validatePayload,
  LanguagesSanitization.updateLanguage,
  LanguagesController.updateLanguage
);

router.delete(
  '/:id',
  LanguagesValidation.deleteLanguage,
  validatePayload,
  LanguagesSanitization.deleteLanguage,
  LanguagesController.deleteLanguage
);

export function mountRouter(routing: IRouter): void {
  routing.use('/languages', router);
}
