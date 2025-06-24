import axios from 'axios';

import { AuthStrategy } from '@/auth/strategies/auth-strategy.ts';

export class AwsJwtStrategy implements AuthStrategy {
  private auth0Token: null | string = null;

  cleanup(): void {
    this.auth0Token = null;
    axios.defaults.headers.common.Authorization = '';
  }

  getAuthToken(): null | string {
    return this.auth0Token;
  }

  initialize(auth0Token: string) {
    this.auth0Token = auth0Token;
    axios.defaults.headers.common.Authorization = `Bearer ${auth0Token}`;
  }
}
