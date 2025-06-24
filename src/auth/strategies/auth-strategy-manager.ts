import { AuthStrategy, AuthStrategyConfig } from '@/auth/strategies/auth-strategy.ts';
import { AwsJwtStrategy } from '@/auth/strategies/impl/aws-jwt-strategy.ts';
import { DjangoTokenStrategy } from '@/auth/strategies/impl/django-token-strategy.ts';

export class AuthStrategyManager {
  private config: AuthStrategyConfig;
  private strategy: AuthStrategy | null = null;

  constructor(config: AuthStrategyConfig) {
    this.config = config;
    this.strategy = this.createStrategy(config);
  }

  getStrategy(): AuthStrategy {
    if (!this.strategy) {
      throw new Error('Auth strategy not initialized');
    }
    return this.strategy;
  }

  private createStrategy(config: AuthStrategyConfig): AuthStrategy {
    switch (config.type) {
      case 'aws-jwt':
        return new AwsJwtStrategy();

      case 'django-token-exchange':
        if (!config.tokenExchangeEndpoint) {
          throw new Error('Token exchange endpoint required for Django strategy');
        }
        return new DjangoTokenStrategy({
          tokenExchangeEndpoint: config.tokenExchangeEndpoint
        });

      case 'custom':
        // Allow for custom strategy injection
        throw new Error('Custom strategy must be provided');

      default:
        throw new Error(`Unknown auth strategy: ${this.config.type}`);
    }
  }
}
