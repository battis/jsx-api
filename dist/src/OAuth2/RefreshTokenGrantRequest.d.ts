import AbstractGrantRequest from './AbstractGrantRequest';
export default class RefreshTokenGrantRequest extends AbstractGrantRequest {
    grant_type: string;
    refresh_token: string;
    constructor(refresh_token: string);
}
