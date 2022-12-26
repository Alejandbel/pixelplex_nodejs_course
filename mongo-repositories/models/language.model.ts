import mongoose from 'mongoose';

import { ILanguage } from '../languages/languages.interface';

const languageSchema = new mongoose.Schema<ILanguage>(
  {
    title: { type: String, required: true, index: true },
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Language = mongoose.model('language', languageSchema);
export { Language };
