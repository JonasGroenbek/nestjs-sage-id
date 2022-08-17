import { Test } from '@nestjs/testing';
import { SageOptions } from './interfaces';
import { SageIdModule } from './sage-id.module';
import { SageIdService } from './sage-id.service';

const options: SageOptions = {
  authRedirectUri: '',
  clientId: '',
  clientSecret: '',
  companyId: 0,
  subscriptionPrimaryKey: '',
  retryStrategy: {
    maxRetryAttempts: 0,
    scalingDuration: 0,
  },
};
describe('SageIdModule', () => {
  describe('register', () => {
    describe('when the `register` option is used', () => {
      it('should provide the SageIdService', async () => {
        const module = await Test.createTestingModule({
          imports: [SageIdModule.register(options)],
        }).compile();

        const sageClient = module.get<SageIdService>(SageIdService);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(SageIdService);
      });
    });
  });

  describe('registerAsync', () => {
    describe('when the `useFactory` option is used', () => {
      it('should provide the SageIdService', async () => {
        const module = await Test.createTestingModule({
          imports: [
            SageIdModule.registerAsync({
              useFactory: () => options,
            }),
          ],
        }).compile();

        const sageClient = module.get<SageIdService>(SageIdService);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(SageIdService);
      });
    });
  });
});
