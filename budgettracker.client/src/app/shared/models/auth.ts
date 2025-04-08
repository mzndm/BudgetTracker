export interface AuthUser {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

export interface Register {
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;  
  twoFactorCode: string,
  twoFactorRecoveryCode: string,
}