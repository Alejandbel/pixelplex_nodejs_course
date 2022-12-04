type TokenResponse = { token: string };

export type SignUpBodyDTO = { email: string; password: string; name: string };
export type SignUpResponseDTO = TokenResponse;

export type LoginResponseDTO = TokenResponse;
export type LoginBodyDTO = { email: string; password: string };
