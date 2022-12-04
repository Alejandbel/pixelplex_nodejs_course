import { IRouter } from 'express';
import * as express from 'express';

import { validatePayload } from '@middleware';

import { LanguagesController } from './languages.controller';
import { LanguagesSanitization } from './languages.sanitization';
import { LanguagesValidation } from './languages.validation';

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
