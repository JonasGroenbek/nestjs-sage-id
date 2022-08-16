import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SAGE_CONFIG } from './constants/sageModule';
import { TokenResponseDTO } from './dto/token-response.dto';
import { SageOptions } from './interfaces';

@Injectable()
export class SageIdService {
  constructor(
    @Inject(SAGE_CONFIG)
    private readonly config: SageOptions,
    private readonly httpService: HttpService,
  ) {}

  async setSageToken(authorizationCode: string): Promise<TokenResponseDTO> {
    const request = this.httpService.post<TokenResponseDTO>('oauth/token', {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.authRedirectUri,
      code: authorizationCode,
      grant_type: 'authorization_code',
    });

    const response = await firstValueFrom(request);
    return response.data;
  }

  async refreshSageToken(refreshToken: string): Promise<TokenResponseDTO> {
    const request = this.httpService.post<TokenResponseDTO>('oauth/token', {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.authRedirectUri,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const response = await firstValueFrom(request);
    return response.data;
  }
}
