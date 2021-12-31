import AbstractGrantRequest from './AbstractGrantRequest';

export default class RefreshTokenGrantRequest extends AbstractGrantRequest {
    public grant_type = 'refresh_token';
    public refresh_token: string;

    constructor(refresh_token: string) {
        super();
        this.refresh_token = refresh_token;
    }
}
