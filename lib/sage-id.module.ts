import { DynamicModule, Module, Provider } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
  SageModuleAsyncOptions,
  SageOptions,
  SageOptionsFactory,
} from './interfaces';
import { HttpModule } from '@nestjs/axios';
import { SageIdService } from './sage-id.service';
import {
  SAGE_CONFIG,
  SAGE_ID_MODULE_ID,
  SAGE_ID_MODULE_OPTIONS,
} from './constants/sageModule';

@Module({
  imports: [HttpModule.register({ baseURL: 'https://id.sage.com' })],
  providers: [SageIdService],
  exports: [SageIdService],
})
export class SageIdModule {
  static register(config: SageOptions): DynamicModule {
    return {
      module: SageIdModule,
      providers: [
        {
          provide: SAGE_CONFIG,
          useValue: config,
        },
      ],
    };
  }

  static registerAsync(options: SageModuleAsyncOptions): DynamicModule {
    return {
      module: SageIdModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: SAGE_CONFIG,
          useFactory: (config: SageOptions) => config,
          inject: [SAGE_ID_MODULE_OPTIONS],
        },
        {
          provide: SAGE_ID_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  private static createAsyncProviders(
    options: SageModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: SageModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SAGE_ID_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SAGE_ID_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SageOptionsFactory) =>
        optionsFactory.createSageOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
