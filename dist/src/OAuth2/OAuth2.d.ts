import ServiceRequiringInitialization from "@battis/require-init";
declare type Oauth2Config = {
    client_id: string;
};
export default class OAuth2 extends ServiceRequiringInitialization {
    private static _client_id;
    static get client_id(): string;
    static init(config: Oauth2Config): void;
}
export {};
