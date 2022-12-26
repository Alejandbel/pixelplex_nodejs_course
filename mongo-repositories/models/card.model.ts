import mongoose, { Types } from 'mongoose';

import { ICard } from '../cards/cards.inteface';

import { taskSchema } from './tasks.schema';

const cardSchema = new mongoose.Schema<ICard>(
  {
    user: {
      ref: 'user',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    nativeLanguage: {
      ref: 'language',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    nativeWord: String,
    foreignLanguage: {
      ref: 'language',
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    foreignWord: String,
    tasks: {
      type: [taskSchema],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Card = mongoose.model('card', cardSchema);
export { Card };
