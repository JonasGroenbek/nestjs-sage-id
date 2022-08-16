import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { SageOptions, SageOptionsFactory } from './interfaces';
import { SageIdModule } from './sage-id.module';

describe('SageModule', () => {
  const apiKey = 'test';

  class TestService implements SageOptionsFactory {
    createSageOptions(): SageOptions {
      return {
        authRedirectUri: '',
        clientId: '',
        clientSecret: '',
        companyId: 2,
        subscriptionPrimaryKey: '',
      };
    }
  }
});
/*

  @Module({
    exports: [TestService],
    providers: [TestService],
  })
  class TestModule {}

  describe('forRoot', () => {
    it('should provide the sage client', async () => {
      const module = await Test.createTestingModule({
        imports: [SageIdModule.forRoot({ apiKey })],
      }).compile();

      const sageClient = module.get<SageIdModule>(sageToken);
      expect(sageClient).toBeDefined();
      expect(sageClient).toBeInstanceOf(Sage);
    });
  });

  describe('forRootAsync', () => {
    describe('when the `useFactory` option is used', () => {
      it('should provide the sage client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            SageIdModule.forRootAsync({
              useFactory: () => ({ apiKey }),
            }),
          ],
        }).compile();

        const sageClient = module.get<SageIdModule>(sageToken);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(Sage);
      });
    });

    describe('when the `useExisting` option is used', () => {
      it('should provide the sage client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            SageIdModule.forRootAsync({
              imports: [TestModule],
              useExisting: TestService,
            }),
          ],
        }).compile();

        const sageClient = module.get<Sage>(sageToken);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(Sage);
      });
    });

    describe('when the `useClass` option is used', () => {
      it('should provide the sage client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            SageIdModule.forRootAsync({
              useClass: TestService,
            }),
          ],
        }).compile();

        const sageClient = module.get<Sage>(sageToken);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(Sage);
      });
    });
  });
});
*/
