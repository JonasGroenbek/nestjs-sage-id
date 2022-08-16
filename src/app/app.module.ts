import { Module } from '@nestjs/common';
import { SageIdModule } from 'src/lib';
import { AppService } from './app.service';

@Module({
  imports: [
    SageIdModule.register({
      authRedirectUri: '',
      clientId: '',
      clientSecret: '',
      companyId: 2,
      subscriptionPrimaryKey: '',
    }),
  ],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
