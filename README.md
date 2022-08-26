<p align="center">
  <h3 align="center">
    Nestjs-sage-id
  </h3>

  <p align="center">
    Injectable client to authenticate to Sage Api's
  </p>
</p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgements)

## About

`nestjs-sage-id` provides a client that exposes a user-friendly interface that
communicates with the [sage-id API](https://gb-kb.sage.com/portal/app/portlets/results/viewsolution.jsp?solutionid=210226173239343) in order to manage the sage tokens used for
authentication and authorization to Sage API's.

## Installation

```bash
npm install --save nestjs-sage-id
```

## Getting Started

The simplest way to use `nestjs-sage-id` is to use `SageIdModule.register`.
However, since the credentials used to authenticate through the sage-id are confidential,
it is encouraged to use environment variable(s) or an external storage method.
Either option will most likely be done in an asynchronous context,
so the example will use the `SageIdModule.registerAsync` function.

```typescript
import { Module } from '@nestjs/commosetSageTokenn';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { SageIdModule } from 'nestjs-sage-id';

@Module({
  imports: [
    SageIdModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        authRedirectUri: configService.get<string>(
            'authRedirectUri',
        )
        clientId: configService.get<string>('clientId'),
        clientSecret: configService.get<string>('secret'),
        companyId: configService.get<number>('companyId'),
        retryStrategy: {
          maxRetryAttempts: 3,
          scalingDuration: 300,
          excludedStatusCodes: [],
        },
        subscriptionPrimaryKey: configService.get<string>(
          'subscriptionPrimaryKey',
        ),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SageService],
  exports: [SageService],
})
export class SageModule {}
```

This will provide an injectable instance of the SageIdService to the module providers.

```typescript
import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SageAccessToken, SageIdService } from 'nestjs-sage-id';

@Injectable()
export class SageService {
  constructor(private readonly sageIdService: SageIdService) {}

  async getCachedSageRefreshToken(): Promise<string> {
    // retrieve the refresh token of the stored token
  }

  async setSageToken(authorizationCode: string): Promise<void> {
    const token = await this.sageIdService.getAccessToken(authorizationCode);
    // store the token
  }

  async refreshSageToken(): Promise<void> {
    const token = await this.sageIdService.refreshAccessToken(
      await this.getCachedSageRefreshToken(),
    );
    // store the token
  }
}
```

## Issues

Please include an MRE (Minimal reproducible example) when providing issues.

## Contributing

All contributions are appreciated. The more, the merrier. Please
make sure to follow the below guidelines when contributing.

1. Fork the repository
2. Create your branch (`git checkout -b my-branch`)
3. Commit any changes to your branch
4. Push your changes to your remote branch
5. Open a pull request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- [nestjs](https://nestjs.com)
- [sage-id](https://gb-kb.sage.com/portal/app/portlets/results/viewsolution.jsp?solutionid=210226173239343)

Copyright &copy; 2022 Jonas Grønbek
