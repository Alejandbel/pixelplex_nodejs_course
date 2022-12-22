import { IRouter } from 'express';
import * as express from 'express';

import { isAuth, validatePayload, isAdmin } from '@middleware';

import { LanguagesController } from './languages.controller';
import { LanguagesSanitization } from './languages.sanitization';
import { LanguagesValidation } from './languages.validation';

const router = express.Router();

router.get(
  '/',
  isAuth,
  LanguagesValidation.getAllLanguages,
  validatePayload,
  LanguagesSanitization.getAllLanguages,
  LanguagesController.getAllLanguages
);

router.get(
  '/:id',
  isAuth,
  LanguagesValidation.getLanguage,
  validatePayload,
  LanguagesSanitization.getLanguage,
  LanguagesController.getLanguage
);

router.post('/', isAuth, isAdmin, LanguagesValidation.addLanguage, validatePayload, LanguagesController.addLanguage);

router.patch(
  '/:id',
  isAuth,
  isAdmin,
  LanguagesValidation.updateLanguage,
  validatePayload,
  LanguagesSanitization.updateLanguage,
  LanguagesController.updateLanguage
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  LanguagesValidation.deleteLanguage,
  validatePayload,
  LanguagesSanitization.deleteLanguage,
  LanguagesController.deleteLanguage
);

export function mountRouter(routing: IRouter): void {
  routing.use('/languages', router);
}
