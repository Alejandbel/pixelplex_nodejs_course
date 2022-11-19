export class AuthService {
  static async signUp(email: string, password: string, name: string): Promise<string> {
    console.log('signUp', email, password, name);
    return 'thisIsBestAuthTokenEver123456789$#@!&';
  }

  static async login(email: string, password: string): Promise<string> {
    console.log('login', email, password);
    return 'thisIsBestAuthTokenEver123456789$#@!&';
  }
  static async logout(): Promise<void> {
    console.log('logout');
  }
}
