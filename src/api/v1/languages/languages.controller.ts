import { NextFunction, Response } from 'express';
import { LanguagesService } from './languages.service';
import { TypedRequestBody, TypedRequestParams, TypedRequestQuery } from '@interfaces';
import { ILanguage, Language } from './languages.entity';

export class LanguagesController {
  static getAllLanguages = async (
    req: TypedRequestQuery<{
      limit: number;
      offset: number;
      orderBy: 'name' | 'date';
      sort: 'asc' | 'desc';
      search: string;
    }>,
    res: Response<{
      items: Language[];
      pagination: {
        offset: number;
        limit: number;
        total: number;
      };
    }>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { limit, offset, orderBy, sort, search } = req.query;
      const languages = await LanguagesService.getAllLanguages(limit, offset, orderBy, sort, search);
      res.status(200).json({
        items: languages,
        pagination: {
          offset,
          limit,
          total: 10,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  static getLanguage = async (
    req: TypedRequestParams<{ id: number }>,
    res: Response<Language>,
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
    req: TypedRequestBody<Required<ILanguage>>,
    res: Response<Language>,
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
    req: TypedRequestParams<{ id: number }> & TypedRequestBody<ILanguage>,
    res: Response<Language>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params as any;
      const props = req.body;
      const language = await LanguagesService.updateLanguage(id, props);
      res.status(200).json(language);
    } catch (error) {
      next(error);
    }
  };

  static deleteLanguage = async (
    req: TypedRequestParams<{ id: number }>,
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
