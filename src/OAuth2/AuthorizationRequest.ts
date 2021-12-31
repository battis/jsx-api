import Authentication from '../Authentication';
import AbstractGrantRequest from './AbstractGrantRequest';
import { GetRequestParameters } from '@battis/jsx-lib';
import OAuth2 from './OAuth2';

export default class AuthorizationRequest extends GetRequestParameters {
    public response_type = 'code';
    public state: string;
    public client_id: string;
    public redirect_uri: string = Authentication.oauth2_redirect_uri;

    constructor(state: string) {
        super();
        this.state = state;
        this.client_id = OAuth2.client_id;
    }
}

export type Authorization = {
    code: string;
    expires: string;
    state: string;
};

export class AuthorizationCodeGrantRequest extends AbstractGrantRequest {
    public grant_type = 'authorization_code';
    public code: string;
    public redirect_uri: string = Authentication.oauth2_redirect_uri;

    constructor(authorization: Authorization) {
        super();
        this.code = authorization.code;
    }
}
