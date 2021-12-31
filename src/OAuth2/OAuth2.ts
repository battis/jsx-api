import ServiceRequiringInitialization from '@battis/require-init';

export type Oauth2Config = {
    client_id: string
}

export default class OAuth2 extends ServiceRequiringInitialization{
    private static _client_id;
    public static get client_id () {
        this.requireInitialization();
        return this._client_id;
    }
    public static init(config: Oauth2Config) {
        this._client_id = config.client_id;
        this.markInitialized();
    }
}
