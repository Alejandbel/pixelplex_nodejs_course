import { NextFunction, Response } from 'express';

import { TypedRequestBody } from '@interfaces';

import { AuthService } from './auth.service';
import { LoginBodyDTO, LoginResponseDTO, SignUpBodyDTO, SignUpResponseDTO } from './auth.types';

export class AuthController {
  static signUp = async (
    req: TypedRequestBody<SignUpBodyDTO>,
    res: Response<SignUpResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password, name } = req.body;
      const token = await AuthService.signUp(email, password, name);
      res.status(201).json({ token });
    } catch (error) {
      next(error);
    }
  };

  static login = async (
    req: TypedRequestBody<LoginBodyDTO>,
    res: Response<LoginResponseDTO>,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
