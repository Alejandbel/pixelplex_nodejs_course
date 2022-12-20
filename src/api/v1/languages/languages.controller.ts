import { NextFunction, Response } from 'express';

import { TypedRequestBody, TypedRequestParams, TypedRequestQuery } from '@interfaces';

import { pickPropsFromBody } from './languages.controller.utils';
import { LanguagesService } from './languages.service';
import {
  AddLanguageBodyDTO,
  AddLanguageResponseDTO,
  DeleteLanguageParamsDTO,
  GetAllLanguagesQueryDTO,
  GetAllLanguagesResponseDTO,
  GetLanguageParamsDTO,
  GetLanguageResponseDTO,
  UpdateLanguageBodyDTO,
  UpdateLanguageParamsDTO,
  UpdateLanguageResponseDTO,
} from './languages.types';

export class LanguagesController {
  static getAllLanguages = async (
    req: TypedRequestQuery<GetAllLanguagesQueryDTO>,
    res: Response<GetAllLanguagesResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search } = req.query;
      const languages = await LanguagesService.getAllLanguages(limit, offset, orderBy, sort, search);
      const total = await LanguagesService.getCountByFilter(search);
      res.status(200).json({
        items: languages,
        pagination: {
          offset,
          limit,
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static getLanguage = async (
    req: TypedRequestParams<GetLanguageParamsDTO>,
    res: Response<GetLanguageResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const language = await LanguagesService.getLanguage(id);
      res.status(200).json(language);
    } catch (error) {
      next(error);
    }
  };

  static addLanguage = async (
    req: TypedRequestBody<AddLanguageBodyDTO>,
    res: Response<AddLanguageResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, code } = req.body;
      const language = await LanguagesService.addLanguage(title, code);
      res.status(201).json(language);
    } catch (error) {
      next(error);
    }
  };

  static updateLanguage = async (
    req: TypedRequestParams<UpdateLanguageParamsDTO> & TypedRequestBody<UpdateLanguageBodyDTO>,
    res: Response<UpdateLanguageResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const props = pickPropsFromBody(req.body);
      const language = await LanguagesService.updateLanguage(id, props);
      res.status(200).json(language);
    } catch (error) {
      next(error);
    }
  };

  static deleteLanguage = async (
    req: TypedRequestParams<DeleteLanguageParamsDTO>,
    res: Response<void>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await LanguagesService.deleteLanguage(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
