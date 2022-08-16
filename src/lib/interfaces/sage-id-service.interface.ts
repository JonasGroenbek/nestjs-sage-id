export interface Headers {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  code: string;
  grant_type: 'authorization_code';
}
