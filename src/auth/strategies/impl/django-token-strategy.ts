import axios from 'axios';

import { AuthStrategy } from '@/auth/strategies/auth-strategy.ts';

interface TokenExchangeResponse {
  data: TokenObject;
  errors: string[];
  status: string;
}

interface TokenObject {
  token: string;
}

export class DjangoTokenStrategy implements AuthStrategy {
  private drfToken: null | string = null;
  private tokenExchangeEndpoint: string;

  constructor(config: { tokenExchangeEndpoint: string }) {
    this.tokenExchangeEndpoint = config.tokenExchangeEndpoint;
  }

  cleanup(): void {
    this.drfToken = null;
    axios.defaults.headers.common.Authorization = '';
  }

  getAuthToken(): null | string {
    return this.drfToken;
  }

  async initialize(auth0Token: string): Promise<void> {
    // Skip if already have a valid DRF token
    if (this.drfToken) return;

    const response = await fetch(this.tokenExchangeEndpoint, {
      headers: {
        Authorization: `Bearer ${auth0Token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Token exchange failed');
    }

    const data = (await response.json()) as TokenExchangeResponse;
    this.setDrfToken(data.data.token);
  }

  private setDrfToken(token: string): void {
    this.drfToken = token;
    axios.defaults.headers.common.Authorization = `Token ${token}`;
  }
}
