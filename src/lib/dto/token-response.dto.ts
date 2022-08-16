import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

@Exclude()
export class TokenResponseDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  id_token: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  scope: string;

  @Expose()
  @IsInt()
  @IsPositive()
  expires_in: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  token_type: string;
}
