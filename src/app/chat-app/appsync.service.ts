import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { Auth } from 'aws-amplify';

@Injectable()
export class AppsyncService {

  hc;

  constructor() {
    const client = new AWSAppSyncClient({
      url: 'https://roxnh5qerzbibjinup6cxzniie.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    });
    this.hc = client.hydrated;
  }
}
