import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, retryWhen } from 'rxjs';
import { SAGE_CONFIG } from './constants/sageModule';
import { SageAccessToken } from './dto/sage-access-token.dto';
import { SageOptions } from './interfaces';
import { retryStrategy } from './operators/retryStrategy';

@Injectable()
export class SageIdService {
  constructor(
    @Inject(SAGE_CONFIG)
    private readonly config: SageOptions,
    private readonly httpService: HttpService,
  ) {}

  /**
   * @description This method should be called with the code provided in the URI of the window
   * which the Sage authentication modal has redirected the user to, after a successful authentication.
   * @author Jonas Grønbek
   * @date 17/08/2022
   * @param authorizationCode This is the "authorization_code" param provided to the window which the sage id modal has redirected to after a succesful login
   * @return {*}
   */
  async setSageToken(authorizationCode: string): Promise<SageAccessToken> {
    const request = this.httpService
      .post<SageAccessToken>('oauth/token', {
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.authRedirectUri,
        code: authorizationCode,
        grant_type: 'authorization_code',
      })
      .pipe(
        retryWhen(
          retryStrategy({
            maxRetryAttempts: 0,
            excludedStatusCodes:
              this.config.retryStrategy?.excludedStatusCodes || [],
            scalingDuration: this.config.retryStrategy?.scalingDuration,
          }),
        ),
      );

    const response = await firstValueFrom(request);
    return response.data;
  }

  /**
   * @description This method is for when you want to refresh an unexpired Sage access token.
   * @author Jonas Grønbek
   * @date 17/08/2022
   * @param refreshToken This token is a part of the sage token provided by authenticating to sage
   * @return {*}
   */
  async refreshSageToken(refreshToken: string): Promise<SageAccessToken> {
    const request = this.httpService
      .post<SageAccessToken>('oauth/token', {
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        redirect_uri: this.config.authRedirectUri,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      })
      .pipe(
        retryWhen(
          retryStrategy({
            maxRetryAttempts: 0,
            excludedStatusCodes:
              this.config.retryStrategy?.excludedStatusCodes || [],
            scalingDuration: this.config.retryStrategy?.scalingDuration,
          }),
        ),
      );

    const response = await firstValueFrom(request);
    return response.data;
  }
}
