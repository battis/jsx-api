import path from 'path';
import { PageHandler } from '@battis/jsx-routing';
import Identifier from '@battis/identifier';
import JSXFactory, { render } from '@battis/jsx-factory';
import { Cookie, Query } from '@battis/jsx-lib';
import API, { APIError } from './API';
import AuthorizationRequest, { Authorization, AuthorizationCodeGrantRequest } from './OAuth2/AuthorizationRequest';
import OAuth2 from './OAuth2/OAuth2';
import RefreshTokenGrantRequest from './OAuth2/RefreshTokenGrantRequest';
import Token from './OAuth2/Token';
import Routing from '@battis/jsx-routing';
import RequireInitialization from '@battis/require-init';

type AuthenticationConfig = {
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
    logoutHandler: PageHandler; // TODO uncruft this approach and dispatch a real event
};

type ClientDescriptor = {
    client_id: string;
    display_name: string;
    description?: string;
};

type LoginConfig = {
    client: ClientDescriptor;
    request: AuthorizationRequest;
    authorize_uri: string;
} & object;

export class Login {
    protected readonly client: ClientDescriptor;
    protected readonly request: AuthorizationRequest;
    protected readonly authorize_uri: string;

    constructor({ client, request, authorize_uri, ...rest }: LoginConfig) {
        this.client = client;
        this.request = request;
        this.authorize_uri = authorize_uri;
    }

    public render() {
        return (
                <form method='post' action={this.authorize_uri}>
                    <h1>{this.client.display_name}</h1>
                    <p>$this.client.description</p>
                    {Object.getOwnPropertyNames(this.request).map(key => (
                        <input
                            name={key}
                            type='hidden'
                            value={this.request[key]}
                        />
                    ))}
                    <div class='form-controls'>
                        <label>username</label>
                        <input name='username' type='text' />
                        <label>password</label>
                        <input name='password' type='password' />
                    </div>
                    <div class='buttons'>
                        <button class='default' type='submit' name='authorized' value='yes'>Login</button>
                        <button type='button' onclick={() => Routing.redirectTo('/')}>Cancel</button>
                    </div>
                </form>
        );
    }
}

export default class Authentication extends RequireInitialization {

    /***************************************************************************
     * Configurable properties
     */

    private static config: AuthenticationConfig = {
        login_path: '/oauth2/login',
        logout_path: '/oauth2/logout',
        oauth2_redirect_path: '/oauth2/redirect',
        oauth2_authorize_path: '/oauth2/authorize',
        oauth2_authorized_path: '/oauth2/authorized',
        authorize_endpoint: '/oauth2/authorize',
        token_endpoint: '/oauth2/token',
        client_endpoint: '/oauth2/client',
        clientDescriptor: async (client_id) =>
            await API.get(
                { endpoint: path.join(Authentication.client_endpoint, client_id) },
                false
            ),
        loginComponent: Login,
        logoutHandler: () =>
            Routing.navigateTo(Authentication.config.login_path)
    };

    private static _client;

    public static get login_path() {
        return Authentication.config.login_path;
    }

    public static get logout_path() {
        return Authentication.config.logout_path;
    }

    public static get oauth2_redirect_path() {
        return Authentication.config.oauth2_redirect_path;
    }

    public static get oauth2_authorize_path() {
        return Authentication.config.oauth2_authorize_path;
    }

    public static get oauth2_authorized_path() {
        return Authentication.config.oauth2_authorized_path;
    }

    public static get authorize_uri() {
        return API.buildUrl(Authentication.config.authorize_endpoint);
    }

    public static get token_endpoint() {
        return Authentication.config.token_endpoint;
    }

    public static get client_endpoint() {
        return Authentication.config.client_endpoint;
    }

    public static get clientDescriptor() {
        return Authentication.config.clientDescriptor;
    }

    public static get Login() {
        return Authentication.config.loginComponent;
    }

    protected static get logoutHandler() {
        return Authentication.config.logoutHandler;
    }

    public static get oauth2_redirect_uri(): string {
        return `${location.protocol}//${path.join(
            `${location.hostname}${location.port ? `:${location.port}` : ''}`,
            Routing.root,
            Authentication.oauth2_redirect_path
        )}`;
    }

    /**************************************************************************
     * Cookie-based properties
     */

        // cookie names
    private static readonly COOKIE_STATE = 'oauth2_state';
    private static readonly COOKIE_ACCESS_TOKEN = 'access_token';
    private static readonly COOKIE_REFRESH_TOKEN = 'refresh_token';
    private static readonly COOKIE_BOOKMARK = 'bookmark';

    private static get access_token() {
        return Cookie.get(Authentication.COOKIE_ACCESS_TOKEN);
    }

    private static get refresh_token() {
        return Cookie.get(Authentication.COOKIE_REFRESH_TOKEN);
    }

    private static get oauth_state(): string {
        return Cookie.get(Authentication.COOKIE_STATE) as string;
    }

    private static set oauth_state(state: string) {
        Cookie.set({ name: Authentication.COOKIE_STATE, value: state });
    }

    private static get bookmark(): string {
        const bookmark = Cookie.get(Authentication.COOKIE_BOOKMARK) || '/';
        Cookie.delete(this.COOKIE_BOOKMARK);
        return bookmark;
    }

    private static set bookmark(currentPath: string) {
        switch (path.join('/', currentPath)) {
            case Authentication.login_path:
            case Authentication.oauth2_redirect_path:
                Cookie.delete(Authentication.COOKIE_BOOKMARK);
                break;
            default:
                Cookie.set({
                    name: Authentication.COOKIE_BOOKMARK,
                    value: currentPath
                });
        }
    }

    public static init(config: Partial<AuthenticationConfig> = {}) {
        Authentication.config = { ...Authentication.config, ...config };
        Routing
            .add(Authentication.login_path, Authentication.userLogin)
            .add(Authentication.logout_path, Authentication.userLogout)
            .add(Authentication.oauth2_authorize_path, Authentication.handleAuthorization)
            .add(Authentication.oauth2_redirect_path, Authentication.handleOAuth2Redirect)
            .add(Authentication.oauth2_authorized_path, Authentication.handleAuthorized)
        Authentication.markInitialized();
    }

    public static requireAuthentication() {
        if (!Authentication.access_token) {
            Authentication.userLogin();
        }
    }

    protected static displaySpinner() {}

    public static userLogin: PageHandler = () => {
        if (!Authentication.access_token) {
            this.displaySpinner();
            Authentication.oauth_state = Identifier.identifier();
            Authentication.bookmark = `${Routing.currentPath}${location.search}`;
            Authentication.clientDescriptor(OAuth2.client_id).then(client => {
                render(
                    <Authentication.Login
                        client={client}
                        request={
                            new AuthorizationRequest(Authentication.oauth_state)
                        }
                        authorize_uri={Authentication.authorize_uri}
                    />
                );
            });
        } else {
            Routing.navigateTo('/');
        }
    };

    public static userLogout: PageHandler = () => {
        Cookie.delete(Authentication.COOKIE_ACCESS_TOKEN);
        Cookie.delete(Authentication.COOKIE_REFRESH_TOKEN);
        Authentication.logoutHandler();
    };

    private static async handleOAuth2Redirect() {
        const params = Query.parseGetParameters();
        if (!params.error) {
            await Authentication.requestAuthorizationCodeGrant();
        } else {
            render(
                <div>
                    <h1>{params.error}</h1>
                    <p>{params.error_description}</p>
                    <p>
                        <a href='/' onclick={e => {
                            e.preventDefault();
                            Routing.navigateTo('/');
                        }}>Go home</a>
                    </p>
                </div>
            );
        }
    }

    private static async handleAuthorization() {
        this.displaySpinner();
        Authentication.oauth_state = Identifier.identifier();
        const request = {
            ...new AuthorizationRequest(Authentication.oauth_state),
            ...Query.parseGetParameters()
        };
        Authentication._client = await Authentication.clientDescriptor(request.client_id);
        render(<Authentication.Login
            client={Authentication._client}
            request={request}
            authorize_uri={Authentication.authorize_uri}
        />);
    }

    private static handleAuthorized() {
        render(
            <div>
                <h1>{`${Authentication._client?.display_name || 'Application'} Authorized`} closeable={false}</h1>
                <p>You may close this window.</p>
            </div>
        );
        Authentication._client = undefined;
    }

    public static async getAccessToken(): Promise<string | undefined> {
        if (Authentication.access_token) {
            return Authentication.access_token;
        } else if (Authentication.refresh_token) {
            return await Authentication.requestRefreshTokenGrant();
        } else {
            Authentication.userLogin();
            return undefined;
        }
    }

    private static async requestAuthorizationCodeGrant() {
        const authorization = Query.parseGetParameters() as Authorization;
        if (Authentication.oauth_state === authorization.state) {
            Cookie.delete(Authentication.COOKIE_STATE);
            try {
                Authentication.storeToken(
                    new Token(
                        await API.post(
                            {
                                endpoint: Authentication.token_endpoint,
                                body: new AuthorizationCodeGrantRequest(
                                    authorization
                                )
                            },
                            false
                        )
                    )
                );
            } catch (error) {
                if (APIError.isAPIError(error as Error)) {
                    Authentication.userLogin();
                } else {
                    throw error;
                }
            }
            Routing.navigateTo(Authentication.bookmark);
        } else {
            Authentication.userLogin();
        }
    }

    private static async requestRefreshTokenGrant(): Promise<string | undefined> {
        try {
            if (Authentication.refresh_token) {
                Authentication.storeToken(
                    new Token(
                        await API.post(
                            {
                                endpoint: Authentication.token_endpoint,
                                body: new RefreshTokenGrantRequest(
                                    Authentication.refresh_token
                                )
                            },
                            false
                        )
                    )
                );
                return Authentication.access_token;
            }
        } catch (error) {
            if (APIError.isAPIError(error as Error)) {
                Authentication.userLogin();
                return undefined;
            } else {
                throw error;
            }
        }
        throw new Error('called without a valid refresh token');
    }

    private static storeToken(token) {
        Cookie.set({
            name: Authentication.COOKIE_ACCESS_TOKEN,
            value: token.access_token,
            expires: {
                expires_in: token.expires_in,
                unit: 'seconds'
            }
        });
        Cookie.set({
            name: Authentication.COOKIE_REFRESH_TOKEN,
            value: token.refresh_token,
            expires: {
                expires_in: 24, // TODO this seems... arbitrary?
                unit: 'weeks'
            }
        });
    }
}
