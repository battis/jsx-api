import { PageHandler } from "@battis/jsx-routing";
import RequireInitialization from "@battis/require-init";
import { AuthorizationRequest } from "./OAuth2";
declare type AuthenticationConfig = {
    login_path: string;
    logout_path: string;
    oauth2_redirect_path: string;
    oauth2_authorize_path: string;
    oauth2_authorized_path: string;
    authorize_endpoint: string;
    client_endpoint: string;
    token_endpoint: string;
    clientDescriptor: (client_id: string) => Promise<ClientDescriptor>;
    loginComponent: typeof Login;
    logoutHandler: PageHandler;
};
declare type ClientDescriptor = {
    client_id: string;
    display_name: string;
    description?: string;
};
declare type LoginConfig = {
    client: ClientDescriptor;
    request: AuthorizationRequest;
    authorize_uri: string;
} & object;
export declare class Login {
    protected readonly client: ClientDescriptor;
    protected readonly request: AuthorizationRequest;
    protected readonly authorize_uri: string;
    constructor({ client, request, authorize_uri, ...rest }: LoginConfig);
    render(): any;
}
export default class Authentication extends RequireInitialization {
    /***************************************************************************
     * Configurable properties
     */
    private static config;
    private static _client;
    static get login_path(): string;
    static get logout_path(): string;
    static get oauth2_redirect_path(): string;
    static get oauth2_authorize_path(): string;
    static get oauth2_authorized_path(): string;
    static get authorize_uri(): string;
    static get token_endpoint(): string;
    static get client_endpoint(): string;
    static get clientDescriptor(): (client_id: string) => Promise<ClientDescriptor>;
    static get Login(): typeof Login;
    protected static get logoutHandler(): PageHandler;
    static get oauth2_redirect_uri(): string;
    /**************************************************************************
     * Cookie-based properties
     */
    private static readonly COOKIE_STATE;
    private static readonly COOKIE_ACCESS_TOKEN;
    private static readonly COOKIE_REFRESH_TOKEN;
    private static readonly COOKIE_BOOKMARK;
    private static get access_token();
    private static get refresh_token();
    private static get oauth_state();
    private static set oauth_state(value);
    private static get bookmark();
    private static set bookmark(value);
    static init(config?: Partial<AuthenticationConfig>): void;
    static requireAuthentication(): void;
    protected static displaySpinner(): void;
    static userLogin: PageHandler;
    static userLogout: PageHandler;
    private static handleOAuth2Redirect;
    private static handleAuthorization;
    private static handleAuthorized;
    static getAccessToken(): Promise<string | undefined>;
    private static requestAuthorizationCodeGrant;
    private static requestRefreshTokenGrant;
    private static storeToken;
}
export {};
