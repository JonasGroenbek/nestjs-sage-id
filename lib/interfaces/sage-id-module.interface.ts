import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface SageModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<SageOptionsFactory>;
  useExisting?: Type<SageOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SageOptions> | SageOptions;
}

export interface SageOptionsFactory {
  createSageOptions(): Promise<SageOptions> | SageOptions;
}

export interface SageOptions {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly authRedirectUri: string;
  readonly subscriptionPrimaryKey: string;
  readonly companyId: number;
  readonly retryStrategy: {
    maxRetryAttempts: number;
    scalingDuration: number;
    excludedStatusCodes?: number[];
  };
}
