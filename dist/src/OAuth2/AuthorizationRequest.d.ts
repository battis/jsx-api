import AbstractGrantRequest from './AbstractGrantRequest';
import { GetRequestParameters } from '@battis/jsx-lib';
export default class AuthorizationRequest extends GetRequestParameters {
    response_type: string;
    state: string;
    client_id: string;
    redirect_uri: string;
    constructor(state: string);
}
export declare type Authorization = {
    code: string;
    expires: string;
    state: string;
};
export declare class AuthorizationCodeGrantRequest extends AbstractGrantRequest {
    grant_type: string;
    code: string;
    redirect_uri: string;
    constructor(authorization: Authorization);
}
