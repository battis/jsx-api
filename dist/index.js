(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@battis/jsx-factory"), require("@battis/jsx-lib"), require("@battis/jsx-routing"), require("@battis/require-init"), require("path-browserify"), require("uuid"));
	else if(typeof define === 'function' && define.amd)
		define(["@battis/jsx-factory", "@battis/jsx-lib", "@battis/jsx-routing", "@battis/require-init", "path-browserify", "uuid"], factory);
	else if(typeof exports === 'object')
		exports["BattisJsxApi"] = factory(require("@battis/jsx-factory"), require("@battis/jsx-lib"), require("@battis/jsx-routing"), require("@battis/require-init"), require("path-browserify"), require("uuid"));
	else
		root["BattisJsxApi"] = factory(root["@battis/jsx-factory"], root["@battis/jsx-lib"], root["@battis/jsx-routing"], root["@battis/require-init"], root["path-browserify"], root["uuid"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__battis_jsx_factory__, __WEBPACK_EXTERNAL_MODULE__battis_jsx_lib__, __WEBPACK_EXTERNAL_MODULE__battis_jsx_routing__, __WEBPACK_EXTERNAL_MODULE__battis_require_init__, __WEBPACK_EXTERNAL_MODULE_path_browserify__, __WEBPACK_EXTERNAL_MODULE_uuid__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OAuth2 = exports.APIError = exports.API = exports.Authentication = void 0;
const API_1 = __importStar(__webpack_require__(/*! ./src/API */ "./src/API.ts"));
exports.API = API_1.default;
Object.defineProperty(exports, "APIError", ({ enumerable: true, get: function () { return API_1.APIError; } }));
const Authentication_1 = __importDefault(__webpack_require__(/*! ./src/Authentication */ "./src/Authentication.tsx"));
exports.Authentication = Authentication_1.default;
const OAuth2_1 = __importDefault(__webpack_require__(/*! ./src/OAuth2/OAuth2 */ "./src/OAuth2/OAuth2.ts"));
exports.OAuth2 = OAuth2_1.default;


/***/ }),

/***/ "./src/API.ts":
/*!********************!*\
  !*** ./src/API.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APIError = void 0;
const path_browserify_1 = __importDefault(__webpack_require__(/*! path-browserify */ "path-browserify"));
const Authentication_1 = __importDefault(__webpack_require__(/*! ./Authentication */ "./src/Authentication.tsx"));
const require_init_1 = __importDefault(__webpack_require__(/*! @battis/require-init */ "@battis/require-init"));
class APIError extends Error {
    constructor(response) {
        super(`API Status ${response.status} (${response.statusText})`);
        this.response = response;
    }
    static isAPIError(error) {
        return "response" in error;
    }
}
exports.APIError = APIError;
/**
 * Server API interactions
 */
class API extends require_init_1.default {
    static get url() {
        return this._url;
    }
    static init(_a) {
        var { url } = _a, config = __rest(_a, ["url"]);
        API.config = Object.assign({ url }, config);
        API._url = new URL(API.config.url);
        API.markInitialized();
    }
    static call(request, requireAuthentication = true, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                API.requireInitialization();
            }
            catch (e) {
                throw e;
            }
            if (!request.endpoint) {
                throw new Error("Request endpoint required");
            }
            if (requireAuthentication) {
                headers = Object.assign(Object.assign({}, headers), { Authorization: `Bearer ${yield Authentication_1.default.getAccessToken()}` });
            }
            const fetchInit = {
                method: request.method,
                headers,
            };
            if (request.method !== "GET" && "body" in request) {
                if (typeof request.body === "string" ||
                    request.body instanceof FormData) {
                    fetchInit["body"] = request.body;
                }
                else {
                    fetchInit.headers = Object.assign(Object.assign({}, fetchInit.headers), { "Content-Type": "application/json" });
                    fetchInit["body"] = JSON.stringify(request.body);
                }
            }
            // TODO handle network errors? Worker thread?
            const response = yield fetch(API.buildUrl(request.endpoint), fetchInit);
            if (response.status !== 200) {
                if (response.status === 401) {
                    Authentication_1.default.userLogin();
                }
                else {
                    throw new APIError(response);
                }
            }
            else {
                return yield response.json();
            }
        });
    }
    static get(_a, requireAuthentication, headers) {
        var { endpoint } = _a, request = __rest(_a, ["endpoint"]);
        if (requireAuthentication === void 0) { requireAuthentication = true; }
        return API.call(Object.assign({ method: "GET", endpoint }, request), requireAuthentication, headers);
    }
    static post(_a, requireAuthentication, headers) {
        var { endpoint } = _a, request = __rest(_a, ["endpoint"]);
        if (requireAuthentication === void 0) { requireAuthentication = true; }
        return API.call(Object.assign({ method: "POST", endpoint }, request), requireAuthentication, headers);
    }
    static put(_a, requireAuthentication, headers) {
        var { endpoint } = _a, request = __rest(_a, ["endpoint"]);
        if (requireAuthentication === void 0) { requireAuthentication = true; }
        return API.call(Object.assign({ method: "PUT", endpoint, body: "" }, request), requireAuthentication, headers);
    }
    static delete(_a, requireAuthentication, headers) {
        var { endpoint } = _a, request = __rest(_a, ["endpoint"]);
        if (requireAuthentication === void 0) { requireAuthentication = true; }
        return API.call(Object.assign({ method: "DELETE", endpoint }, request), requireAuthentication, headers);
    }
    static buildUrl(...parts) {
        return new URL(path_browserify_1.default.join(API._url.pathname, ...parts), API._url).href;
    }
}
exports["default"] = API;


/***/ }),

/***/ "./src/Authentication.tsx":
/*!********************************!*\
  !*** ./src/Authentication.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Login = void 0;
const jsx_factory_1 = __importStar(__webpack_require__(/*! @battis/jsx-factory */ "@battis/jsx-factory"));
const jsx_routing_1 = __importDefault(__webpack_require__(/*! @battis/jsx-routing */ "@battis/jsx-routing"));
const jsx_lib_1 = __webpack_require__(/*! @battis/jsx-lib */ "@battis/jsx-lib");
const require_init_1 = __importDefault(__webpack_require__(/*! @battis/require-init */ "@battis/require-init"));
const path_browserify_1 = __importDefault(__webpack_require__(/*! path-browserify */ "path-browserify"));
const uuid_1 = __webpack_require__(/*! uuid */ "uuid");
const API_1 = __importStar(__webpack_require__(/*! ./API */ "./src/API.ts"));
const OAuth2_1 = __importStar(__webpack_require__(/*! ./OAuth2 */ "./src/OAuth2/index.ts"));
class Login {
    constructor(_b) {
        var { client, request, authorize_uri } = _b, rest = __rest(_b, ["client", "request", "authorize_uri"]);
        this.client = client;
        this.request = request;
        this.authorize_uri = authorize_uri;
    }
    render() {
        return (jsx_factory_1.default.createElement("form", { method: "post", action: this.authorize_uri },
            jsx_factory_1.default.createElement("h1", null, this.client.display_name),
            jsx_factory_1.default.createElement("p", null, this.client.description),
            Object.getOwnPropertyNames(this.request).map((key) => (jsx_factory_1.default.createElement("input", { name: key, type: "hidden", value: this.request[key] }))),
            jsx_factory_1.default.createElement("div", { class: "form-controls" },
                jsx_factory_1.default.createElement("label", null, "username"),
                jsx_factory_1.default.createElement("input", { name: "username", type: "text" }),
                jsx_factory_1.default.createElement("label", null, "password"),
                jsx_factory_1.default.createElement("input", { name: "password", type: "password" })),
            jsx_factory_1.default.createElement("div", { class: "buttons" },
                jsx_factory_1.default.createElement("button", { class: "default", type: "submit", name: "authorized", value: "yes" }, "Login"),
                jsx_factory_1.default.createElement("button", { type: "button", onclick: () => jsx_routing_1.default.redirectTo("/") }, "Cancel"))));
    }
}
exports.Login = Login;
class Authentication extends require_init_1.default {
    static get login_path() {
        return Authentication.config.login_path;
    }
    static get logout_path() {
        return Authentication.config.logout_path;
    }
    static get oauth2_redirect_path() {
        return Authentication.config.oauth2_redirect_path;
    }
    static get oauth2_authorize_path() {
        return Authentication.config.oauth2_authorize_path;
    }
    static get oauth2_authorized_path() {
        return Authentication.config.oauth2_authorized_path;
    }
    static get authorize_uri() {
        return API_1.default.buildUrl(Authentication.config.authorize_endpoint);
    }
    static get token_endpoint() {
        return Authentication.config.token_endpoint;
    }
    static get client_endpoint() {
        return Authentication.config.client_endpoint;
    }
    static get clientDescriptor() {
        return Authentication.config.clientDescriptor;
    }
    static get Login() {
        return Authentication.config.loginComponent;
    }
    static get logoutHandler() {
        return Authentication.config.logoutHandler;
    }
    static get oauth2_redirect_uri() {
        return `${location.protocol}//${path_browserify_1.default.join(`${location.hostname}${location.port ? `:${location.port}` : ""}`, jsx_routing_1.default.root, Authentication.oauth2_redirect_path)}`;
    }
    static get access_token() {
        return jsx_lib_1.Cookie.get(Authentication.COOKIE_ACCESS_TOKEN);
    }
    static get refresh_token() {
        return jsx_lib_1.Cookie.get(Authentication.COOKIE_REFRESH_TOKEN);
    }
    static get oauth_state() {
        return jsx_lib_1.Cookie.get(Authentication.COOKIE_STATE);
    }
    static set oauth_state(state) {
        jsx_lib_1.Cookie.set({ name: Authentication.COOKIE_STATE, value: state });
    }
    static get bookmark() {
        const bookmark = jsx_lib_1.Cookie.get(Authentication.COOKIE_BOOKMARK) || "/";
        jsx_lib_1.Cookie.delete(this.COOKIE_BOOKMARK);
        return bookmark;
    }
    static set bookmark(currentPath) {
        switch (path_browserify_1.default.join("/", currentPath)) {
            case Authentication.login_path:
            case Authentication.oauth2_redirect_path:
                jsx_lib_1.Cookie.delete(Authentication.COOKIE_BOOKMARK);
                break;
            default:
                jsx_lib_1.Cookie.set({
                    name: Authentication.COOKIE_BOOKMARK,
                    value: currentPath,
                });
        }
    }
    static init(config = {}) {
        Authentication.config = Object.assign(Object.assign({}, Authentication.config), config);
        jsx_routing_1.default.add(Authentication.login_path, Authentication.userLogin)
            .add(Authentication.logout_path, Authentication.userLogout)
            .add(Authentication.oauth2_authorize_path, Authentication.handleAuthorization)
            .add(Authentication.oauth2_redirect_path, Authentication.handleOAuth2Redirect)
            .add(Authentication.oauth2_authorized_path, Authentication.handleAuthorized);
        Authentication.markInitialized();
    }
    static requireAuthentication() {
        if (!Authentication.access_token) {
            Authentication.userLogin();
        }
    }
    static displaySpinner() { }
    static handleOAuth2Redirect() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = jsx_lib_1.Query.parseGetParameters();
            if (!params.error) {
                yield Authentication.requestAuthorizationCodeGrant();
            }
            else {
                (0, jsx_factory_1.render)(jsx_factory_1.default.createElement("div", null,
                    jsx_factory_1.default.createElement("h1", null, params.error),
                    jsx_factory_1.default.createElement("p", null, params.error_description),
                    jsx_factory_1.default.createElement("p", null,
                        jsx_factory_1.default.createElement("a", { href: "/", onclick: (e) => {
                                e.preventDefault();
                                jsx_routing_1.default.navigateTo("/");
                            } }, "Go home"))));
            }
        });
    }
    static handleAuthorization() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displaySpinner();
            Authentication.oauth_state = (0, uuid_1.v4)();
            const request = Object.assign(Object.assign({}, new OAuth2_1.AuthorizationRequest(Authentication.oauth_state)), jsx_lib_1.Query.parseGetParameters());
            Authentication._client = yield Authentication.clientDescriptor(request.client_id);
            (0, jsx_factory_1.render)(jsx_factory_1.default.createElement(Authentication.Login, { client: Authentication._client, request: request, authorize_uri: Authentication.authorize_uri }));
        });
    }
    static handleAuthorized() {
        var _b;
        (0, jsx_factory_1.render)(jsx_factory_1.default.createElement("div", null,
            jsx_factory_1.default.createElement("h1", null,
                `${((_b = Authentication._client) === null || _b === void 0 ? void 0 : _b.display_name) || "Application"} Authorized`,
                " ",
                "closeable=",
                false),
            jsx_factory_1.default.createElement("p", null, "You may close this window.")));
        Authentication._client = undefined;
    }
    static getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Authentication.access_token) {
                return Authentication.access_token;
            }
            else if (Authentication.refresh_token) {
                return yield Authentication.requestRefreshTokenGrant();
            }
            else {
                Authentication.userLogin();
                return undefined;
            }
        });
    }
    static requestAuthorizationCodeGrant() {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = jsx_lib_1.Query.parseGetParameters();
            if (Authentication.oauth_state === authorization.state) {
                jsx_lib_1.Cookie.delete(Authentication.COOKIE_STATE);
                try {
                    Authentication.storeToken(new OAuth2_1.Token(yield API_1.default.post({
                        endpoint: Authentication.token_endpoint,
                        body: new OAuth2_1.AuthorizationCodeGrantRequest(authorization),
                    }, false)));
                }
                catch (error) {
                    if (API_1.APIError.isAPIError(error)) {
                        Authentication.userLogin();
                    }
                    else {
                        throw error;
                    }
                }
                jsx_routing_1.default.navigateTo(Authentication.bookmark);
            }
            else {
                Authentication.userLogin();
            }
        });
    }
    static requestRefreshTokenGrant() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Authentication.refresh_token) {
                    Authentication.storeToken(new OAuth2_1.Token(yield API_1.default.post({
                        endpoint: Authentication.token_endpoint,
                        body: new OAuth2_1.RefreshTokenGrantRequest(Authentication.refresh_token),
                    }, false)));
                    return Authentication.access_token;
                }
            }
            catch (error) {
                if (API_1.APIError.isAPIError(error)) {
                    Authentication.userLogin();
                    return undefined;
                }
                else {
                    throw error;
                }
            }
            throw new Error("called without a valid refresh token");
        });
    }
    static storeToken(token) {
        jsx_lib_1.Cookie.set({
            name: Authentication.COOKIE_ACCESS_TOKEN,
            value: token.access_token,
            expires: {
                expires_in: token.expires_in,
                unit: "seconds",
            },
        });
        jsx_lib_1.Cookie.set({
            name: Authentication.COOKIE_REFRESH_TOKEN,
            value: token.refresh_token,
            expires: {
                expires_in: 24,
                unit: "weeks",
            },
        });
    }
}
exports["default"] = Authentication;
_a = Authentication;
/***************************************************************************
 * Configurable properties
 */
Authentication.config = {
    login_path: "/oauth2/login",
    logout_path: "/oauth2/logout",
    oauth2_redirect_path: "/oauth2/redirect",
    oauth2_authorize_path: "/oauth2/authorize",
    oauth2_authorized_path: "/oauth2/authorized",
    authorize_endpoint: "/oauth2/authorize",
    token_endpoint: "/oauth2/token",
    client_endpoint: "/oauth2/client",
    clientDescriptor: (client_id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield API_1.default.get({ endpoint: path_browserify_1.default.join(Authentication.client_endpoint, client_id) }, false);
    }),
    loginComponent: Login,
    logoutHandler: () => jsx_routing_1.default.navigateTo(Authentication.config.login_path),
};
/**************************************************************************
 * Cookie-based properties
 */
// cookie names
Authentication.COOKIE_STATE = "oauth2_state";
Authentication.COOKIE_ACCESS_TOKEN = "access_token";
Authentication.COOKIE_REFRESH_TOKEN = "refresh_token";
Authentication.COOKIE_BOOKMARK = "bookmark";
Authentication.userLogin = () => {
    if (!Authentication.access_token) {
        _a.displaySpinner();
        Authentication.oauth_state = (0, uuid_1.v4)();
        Authentication.bookmark = `${jsx_routing_1.default.currentPath}${location.search}`;
        Authentication.clientDescriptor(OAuth2_1.default.client_id).then((client) => {
            (0, jsx_factory_1.render)(jsx_factory_1.default.createElement(Authentication.Login, { client: client, request: new OAuth2_1.AuthorizationRequest(Authentication.oauth_state), authorize_uri: Authentication.authorize_uri }));
        });
    }
    else {
        jsx_routing_1.default.navigateTo("/");
    }
};
Authentication.userLogout = () => {
    jsx_lib_1.Cookie.delete(Authentication.COOKIE_ACCESS_TOKEN);
    jsx_lib_1.Cookie.delete(Authentication.COOKIE_REFRESH_TOKEN);
    Authentication.logoutHandler();
};


/***/ }),

/***/ "./src/OAuth2/AbstractGrantRequest.ts":
/*!********************************************!*\
  !*** ./src/OAuth2/AbstractGrantRequest.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const OAuth2_1 = __importDefault(__webpack_require__(/*! ./OAuth2 */ "./src/OAuth2/OAuth2.ts"));
class AbstractGrantRequest {
    constructor() {
        this.client_id = OAuth2_1.default.client_id;
    }
}
exports["default"] = AbstractGrantRequest;


/***/ }),

/***/ "./src/OAuth2/AuthorizationRequest.ts":
/*!********************************************!*\
  !*** ./src/OAuth2/AuthorizationRequest.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizationCodeGrantRequest = void 0;
const Authentication_1 = __importDefault(__webpack_require__(/*! ../Authentication */ "./src/Authentication.tsx"));
const AbstractGrantRequest_1 = __importDefault(__webpack_require__(/*! ./AbstractGrantRequest */ "./src/OAuth2/AbstractGrantRequest.ts"));
const jsx_lib_1 = __webpack_require__(/*! @battis/jsx-lib */ "@battis/jsx-lib");
const OAuth2_1 = __importDefault(__webpack_require__(/*! ./OAuth2 */ "./src/OAuth2/OAuth2.ts"));
class AuthorizationRequest extends jsx_lib_1.GetRequestParameters {
    constructor(state) {
        super();
        this.response_type = 'code';
        this.redirect_uri = Authentication_1.default.oauth2_redirect_uri;
        this.state = state;
        this.client_id = OAuth2_1.default.client_id;
    }
}
exports["default"] = AuthorizationRequest;
class AuthorizationCodeGrantRequest extends AbstractGrantRequest_1.default {
    constructor(authorization) {
        super();
        this.grant_type = 'authorization_code';
        this.redirect_uri = Authentication_1.default.oauth2_redirect_uri;
        this.code = authorization.code;
    }
}
exports.AuthorizationCodeGrantRequest = AuthorizationCodeGrantRequest;


/***/ }),

/***/ "./src/OAuth2/OAuth2.ts":
/*!******************************!*\
  !*** ./src/OAuth2/OAuth2.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const require_init_1 = __importDefault(__webpack_require__(/*! @battis/require-init */ "@battis/require-init"));
class OAuth2 extends require_init_1.default {
    static get client_id() {
        this.requireInitialization();
        return this._client_id;
    }
    static init(config) {
        this._client_id = config.client_id;
        this.markInitialized();
    }
}
exports["default"] = OAuth2;


/***/ }),

/***/ "./src/OAuth2/RefreshTokenGrantRequest.ts":
/*!************************************************!*\
  !*** ./src/OAuth2/RefreshTokenGrantRequest.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const AbstractGrantRequest_1 = __importDefault(__webpack_require__(/*! ./AbstractGrantRequest */ "./src/OAuth2/AbstractGrantRequest.ts"));
class RefreshTokenGrantRequest extends AbstractGrantRequest_1.default {
    constructor(refresh_token) {
        super();
        this.grant_type = 'refresh_token';
        this.refresh_token = refresh_token;
    }
}
exports["default"] = RefreshTokenGrantRequest;


/***/ }),

/***/ "./src/OAuth2/Token.ts":
/*!*****************************!*\
  !*** ./src/OAuth2/Token.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
class Token {
    constructor(_a) {
        var { access_token, expires_in } = _a, data = __rest(_a, ["access_token", "expires_in"]);
        this.access_token = access_token;
        this.expires_in = expires_in;
        for (const prop of Object.getOwnPropertyNames(data)) {
            this[prop] = data[prop];
        }
    }
}
exports["default"] = Token;


/***/ }),

/***/ "./src/OAuth2/index.ts":
/*!*****************************!*\
  !*** ./src/OAuth2/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Token = exports.RefreshTokenGrantRequest = exports.AuthorizationCodeGrantRequest = exports.AuthorizationRequest = void 0;
const OAuth2_1 = __importDefault(__webpack_require__(/*! ./OAuth2 */ "./src/OAuth2/OAuth2.ts"));
const AuthorizationRequest_1 = __importStar(__webpack_require__(/*! ./AuthorizationRequest */ "./src/OAuth2/AuthorizationRequest.ts"));
exports.AuthorizationRequest = AuthorizationRequest_1.default;
Object.defineProperty(exports, "AuthorizationCodeGrantRequest", ({ enumerable: true, get: function () { return AuthorizationRequest_1.AuthorizationCodeGrantRequest; } }));
const RefreshTokenGrantRequest_1 = __importDefault(__webpack_require__(/*! ./RefreshTokenGrantRequest */ "./src/OAuth2/RefreshTokenGrantRequest.ts"));
exports.RefreshTokenGrantRequest = RefreshTokenGrantRequest_1.default;
const Token_1 = __importDefault(__webpack_require__(/*! ./Token */ "./src/OAuth2/Token.ts"));
exports.Token = Token_1.default;
exports["default"] = OAuth2_1.default;


/***/ }),

/***/ "@battis/jsx-factory":
/*!**************************************!*\
  !*** external "@battis/jsx-factory" ***!
  \**************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_jsx_factory__;

/***/ }),

/***/ "@battis/jsx-lib":
/*!**********************************!*\
  !*** external "@battis/jsx-lib" ***!
  \**********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_jsx_lib__;

/***/ }),

/***/ "@battis/jsx-routing":
/*!**************************************!*\
  !*** external "@battis/jsx-routing" ***!
  \**************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_jsx_routing__;

/***/ }),

/***/ "@battis/require-init":
/*!***************************************!*\
  !*** external "@battis/require-init" ***!
  \***************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_require_init__;

/***/ }),

/***/ "path-browserify":
/*!**********************************!*\
  !*** external "path-browserify" ***!
  \**********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_path_browserify__;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_uuid__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxnRUFBZ0UsRUFBQztBQUN4SyxtREFBbUQsbUJBQU8sQ0FBQyw0RUFBNEI7QUFDdkYsZ0NBQWdDO0FBQ2hDLGdDQUFnQyxtQkFBTyxDQUFDLHNDQUFTO0FBQ2pELGFBQWE7QUFDYixrQkFBZTs7Ozs7Ozs7Ozs7QUNyQ2Y7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQmF0dGlzSnN4QXBpL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvLi9pbmRleC50cyIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvLi9zcmMvQVBJLnRzIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS8uL3NyYy9BdXRoZW50aWNhdGlvbi50c3giLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4QXBpLy4vc3JjL09BdXRoMi9BYnN0cmFjdEdyYW50UmVxdWVzdC50cyIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvLi9zcmMvT0F1dGgyL0F1dGhvcml6YXRpb25SZXF1ZXN0LnRzIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS8uL3NyYy9PQXV0aDIvT0F1dGgyLnRzIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS8uL3NyYy9PQXV0aDIvUmVmcmVzaFRva2VuR3JhbnRSZXF1ZXN0LnRzIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS8uL3NyYy9PQXV0aDIvVG9rZW4udHMiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4QXBpLy4vc3JjL09BdXRoMi9pbmRleC50cyIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvZXh0ZXJuYWwgdW1kIFwiQGJhdHRpcy9qc3gtZmFjdG9yeVwiIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS9leHRlcm5hbCB1bWQgXCJAYmF0dGlzL2pzeC1saWJcIiIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvZXh0ZXJuYWwgdW1kIFwiQGJhdHRpcy9qc3gtcm91dGluZ1wiIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS9leHRlcm5hbCB1bWQgXCJAYmF0dGlzL3JlcXVpcmUtaW5pdFwiIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS9leHRlcm5hbCB1bWQgXCJwYXRoLWJyb3dzZXJpZnlcIiIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvZXh0ZXJuYWwgdW1kIFwidXVpZFwiIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9CYXR0aXNKc3hBcGkvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL0JhdHRpc0pzeEFwaS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQGJhdHRpcy9qc3gtZmFjdG9yeVwiKSwgcmVxdWlyZShcIkBiYXR0aXMvanN4LWxpYlwiKSwgcmVxdWlyZShcIkBiYXR0aXMvanN4LXJvdXRpbmdcIiksIHJlcXVpcmUoXCJAYmF0dGlzL3JlcXVpcmUtaW5pdFwiKSwgcmVxdWlyZShcInBhdGgtYnJvd3NlcmlmeVwiKSwgcmVxdWlyZShcInV1aWRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiQGJhdHRpcy9qc3gtZmFjdG9yeVwiLCBcIkBiYXR0aXMvanN4LWxpYlwiLCBcIkBiYXR0aXMvanN4LXJvdXRpbmdcIiwgXCJAYmF0dGlzL3JlcXVpcmUtaW5pdFwiLCBcInBhdGgtYnJvd3NlcmlmeVwiLCBcInV1aWRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQmF0dGlzSnN4QXBpXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiQGJhdHRpcy9qc3gtZmFjdG9yeVwiKSwgcmVxdWlyZShcIkBiYXR0aXMvanN4LWxpYlwiKSwgcmVxdWlyZShcIkBiYXR0aXMvanN4LXJvdXRpbmdcIiksIHJlcXVpcmUoXCJAYmF0dGlzL3JlcXVpcmUtaW5pdFwiKSwgcmVxdWlyZShcInBhdGgtYnJvd3NlcmlmeVwiKSwgcmVxdWlyZShcInV1aWRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJhdHRpc0pzeEFwaVwiXSA9IGZhY3Rvcnkocm9vdFtcIkBiYXR0aXMvanN4LWZhY3RvcnlcIl0sIHJvb3RbXCJAYmF0dGlzL2pzeC1saWJcIl0sIHJvb3RbXCJAYmF0dGlzL2pzeC1yb3V0aW5nXCJdLCByb290W1wiQGJhdHRpcy9yZXF1aXJlLWluaXRcIl0sIHJvb3RbXCJwYXRoLWJyb3dzZXJpZnlcIl0sIHJvb3RbXCJ1dWlkXCJdKTtcbn0pKHNlbGYsIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19iYXR0aXNfanN4X2ZhY3RvcnlfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX2pzeF9saWJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX2pzeF9yb3V0aW5nX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2JhdHRpc19yZXF1aXJlX2luaXRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9wYXRoX2Jyb3dzZXJpZnlfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91dWlkX18pID0+IHtcbnJldHVybiAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PQXV0aDIgPSBleHBvcnRzLkFQSUVycm9yID0gZXhwb3J0cy5BUEkgPSBleHBvcnRzLkF1dGhlbnRpY2F0aW9uID0gdm9pZCAwO1xuY29uc3QgQVBJXzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL0FQSVwiKSk7XG5leHBvcnRzLkFQSSA9IEFQSV8xLmRlZmF1bHQ7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBUElFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gQVBJXzEuQVBJRXJyb3I7IH0gfSk7XG5jb25zdCBBdXRoZW50aWNhdGlvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NyYy9BdXRoZW50aWNhdGlvblwiKSk7XG5leHBvcnRzLkF1dGhlbnRpY2F0aW9uID0gQXV0aGVudGljYXRpb25fMS5kZWZhdWx0O1xuY29uc3QgT0F1dGgyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3JjL09BdXRoMi9PQXV0aDJcIikpO1xuZXhwb3J0cy5PQXV0aDIgPSBPQXV0aDJfMS5kZWZhdWx0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX3Jlc3QgPSAodGhpcyAmJiB0aGlzLl9fcmVzdCkgfHwgZnVuY3Rpb24gKHMsIGUpIHtcbiAgICB2YXIgdCA9IHt9O1xuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgICB0W3BdID0gc1twXTtcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcbiAgICAgICAgfVxuICAgIHJldHVybiB0O1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQVBJRXJyb3IgPSB2b2lkIDA7XG5jb25zdCBwYXRoX2Jyb3dzZXJpZnlfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwicGF0aC1icm93c2VyaWZ5XCIpKTtcbmNvbnN0IEF1dGhlbnRpY2F0aW9uXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vQXV0aGVudGljYXRpb25cIikpO1xuY29uc3QgcmVxdWlyZV9pbml0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkBiYXR0aXMvcmVxdWlyZS1pbml0XCIpKTtcbmNsYXNzIEFQSUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlc3BvbnNlKSB7XG4gICAgICAgIHN1cGVyKGBBUEkgU3RhdHVzICR7cmVzcG9uc2Uuc3RhdHVzfSAoJHtyZXNwb25zZS5zdGF0dXNUZXh0fSlgKTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIH1cbiAgICBzdGF0aWMgaXNBUElFcnJvcihlcnJvcikge1xuICAgICAgICByZXR1cm4gXCJyZXNwb25zZVwiIGluIGVycm9yO1xuICAgIH1cbn1cbmV4cG9ydHMuQVBJRXJyb3IgPSBBUElFcnJvcjtcbi8qKlxuICogU2VydmVyIEFQSSBpbnRlcmFjdGlvbnNcbiAqL1xuY2xhc3MgQVBJIGV4dGVuZHMgcmVxdWlyZV9pbml0XzEuZGVmYXVsdCB7XG4gICAgc3RhdGljIGdldCB1cmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91cmw7XG4gICAgfVxuICAgIHN0YXRpYyBpbml0KF9hKSB7XG4gICAgICAgIHZhciB7IHVybCB9ID0gX2EsIGNvbmZpZyA9IF9fcmVzdChfYSwgW1widXJsXCJdKTtcbiAgICAgICAgQVBJLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyB1cmwgfSwgY29uZmlnKTtcbiAgICAgICAgQVBJLl91cmwgPSBuZXcgVVJMKEFQSS5jb25maWcudXJsKTtcbiAgICAgICAgQVBJLm1hcmtJbml0aWFsaXplZCgpO1xuICAgIH1cbiAgICBzdGF0aWMgY2FsbChyZXF1ZXN0LCByZXF1aXJlQXV0aGVudGljYXRpb24gPSB0cnVlLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIEFQSS5yZXF1aXJlSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcmVxdWVzdC5lbmRwb2ludCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlcXVlc3QgZW5kcG9pbnQgcmVxdWlyZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWlyZUF1dGhlbnRpY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgaGVhZGVycyksIHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3lpZWxkIEF1dGhlbnRpY2F0aW9uXzEuZGVmYXVsdC5nZXRBY2Nlc3NUb2tlbigpfWAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBmZXRjaEluaXQgPSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0Lm1ldGhvZCAhPT0gXCJHRVRcIiAmJiBcImJvZHlcIiBpbiByZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0LmJvZHkgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5ib2R5IGluc3RhbmNlb2YgRm9ybURhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2hJbml0W1wiYm9keVwiXSA9IHJlcXVlc3QuYm9keTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoSW5pdC5oZWFkZXJzID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBmZXRjaEluaXQuaGVhZGVycyksIHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSk7XG4gICAgICAgICAgICAgICAgICAgIGZldGNoSW5pdFtcImJvZHlcIl0gPSBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRPRE8gaGFuZGxlIG5ldHdvcmsgZXJyb3JzPyBXb3JrZXIgdGhyZWFkP1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaChBUEkuYnVpbGRVcmwocmVxdWVzdC5lbmRwb2ludCksIGZldGNoSW5pdCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb25fMS5kZWZhdWx0LnVzZXJMb2dpbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEFQSUVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geWllbGQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGdldChfYSwgcmVxdWlyZUF1dGhlbnRpY2F0aW9uLCBoZWFkZXJzKSB7XG4gICAgICAgIHZhciB7IGVuZHBvaW50IH0gPSBfYSwgcmVxdWVzdCA9IF9fcmVzdChfYSwgW1wiZW5kcG9pbnRcIl0pO1xuICAgICAgICBpZiAocmVxdWlyZUF1dGhlbnRpY2F0aW9uID09PSB2b2lkIDApIHsgcmVxdWlyZUF1dGhlbnRpY2F0aW9uID0gdHJ1ZTsgfVxuICAgICAgICByZXR1cm4gQVBJLmNhbGwoT2JqZWN0LmFzc2lnbih7IG1ldGhvZDogXCJHRVRcIiwgZW5kcG9pbnQgfSwgcmVxdWVzdCksIHJlcXVpcmVBdXRoZW50aWNhdGlvbiwgaGVhZGVycyk7XG4gICAgfVxuICAgIHN0YXRpYyBwb3N0KF9hLCByZXF1aXJlQXV0aGVudGljYXRpb24sIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIHsgZW5kcG9pbnQgfSA9IF9hLCByZXF1ZXN0ID0gX19yZXN0KF9hLCBbXCJlbmRwb2ludFwiXSk7XG4gICAgICAgIGlmIChyZXF1aXJlQXV0aGVudGljYXRpb24gPT09IHZvaWQgMCkgeyByZXF1aXJlQXV0aGVudGljYXRpb24gPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiBBUEkuY2FsbChPYmplY3QuYXNzaWduKHsgbWV0aG9kOiBcIlBPU1RcIiwgZW5kcG9pbnQgfSwgcmVxdWVzdCksIHJlcXVpcmVBdXRoZW50aWNhdGlvbiwgaGVhZGVycyk7XG4gICAgfVxuICAgIHN0YXRpYyBwdXQoX2EsIHJlcXVpcmVBdXRoZW50aWNhdGlvbiwgaGVhZGVycykge1xuICAgICAgICB2YXIgeyBlbmRwb2ludCB9ID0gX2EsIHJlcXVlc3QgPSBfX3Jlc3QoX2EsIFtcImVuZHBvaW50XCJdKTtcbiAgICAgICAgaWYgKHJlcXVpcmVBdXRoZW50aWNhdGlvbiA9PT0gdm9pZCAwKSB7IHJlcXVpcmVBdXRoZW50aWNhdGlvbiA9IHRydWU7IH1cbiAgICAgICAgcmV0dXJuIEFQSS5jYWxsKE9iamVjdC5hc3NpZ24oeyBtZXRob2Q6IFwiUFVUXCIsIGVuZHBvaW50LCBib2R5OiBcIlwiIH0sIHJlcXVlc3QpLCByZXF1aXJlQXV0aGVudGljYXRpb24sIGhlYWRlcnMpO1xuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlKF9hLCByZXF1aXJlQXV0aGVudGljYXRpb24sIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIHsgZW5kcG9pbnQgfSA9IF9hLCByZXF1ZXN0ID0gX19yZXN0KF9hLCBbXCJlbmRwb2ludFwiXSk7XG4gICAgICAgIGlmIChyZXF1aXJlQXV0aGVudGljYXRpb24gPT09IHZvaWQgMCkgeyByZXF1aXJlQXV0aGVudGljYXRpb24gPSB0cnVlOyB9XG4gICAgICAgIHJldHVybiBBUEkuY2FsbChPYmplY3QuYXNzaWduKHsgbWV0aG9kOiBcIkRFTEVURVwiLCBlbmRwb2ludCB9LCByZXF1ZXN0KSwgcmVxdWlyZUF1dGhlbnRpY2F0aW9uLCBoZWFkZXJzKTtcbiAgICB9XG4gICAgc3RhdGljIGJ1aWxkVXJsKC4uLnBhcnRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVVJMKHBhdGhfYnJvd3NlcmlmeV8xLmRlZmF1bHQuam9pbihBUEkuX3VybC5wYXRobmFtZSwgLi4ucGFydHMpLCBBUEkuX3VybCkuaHJlZjtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBBUEk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkxvZ2luID0gdm9pZCAwO1xuY29uc3QganN4X2ZhY3RvcnlfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGJhdHRpcy9qc3gtZmFjdG9yeVwiKSk7XG5jb25zdCBqc3hfcm91dGluZ18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAYmF0dGlzL2pzeC1yb3V0aW5nXCIpKTtcbmNvbnN0IGpzeF9saWJfMSA9IHJlcXVpcmUoXCJAYmF0dGlzL2pzeC1saWJcIik7XG5jb25zdCByZXF1aXJlX2luaXRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiQGJhdHRpcy9yZXF1aXJlLWluaXRcIikpO1xuY29uc3QgcGF0aF9icm93c2VyaWZ5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInBhdGgtYnJvd3NlcmlmeVwiKSk7XG5jb25zdCB1dWlkXzEgPSByZXF1aXJlKFwidXVpZFwiKTtcbmNvbnN0IEFQSV8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCIuL0FQSVwiKSk7XG5jb25zdCBPQXV0aDJfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9PQXV0aDJcIikpO1xuY2xhc3MgTG9naW4ge1xuICAgIGNvbnN0cnVjdG9yKF9iKSB7XG4gICAgICAgIHZhciB7IGNsaWVudCwgcmVxdWVzdCwgYXV0aG9yaXplX3VyaSB9ID0gX2IsIHJlc3QgPSBfX3Jlc3QoX2IsIFtcImNsaWVudFwiLCBcInJlcXVlc3RcIiwgXCJhdXRob3JpemVfdXJpXCJdKTtcbiAgICAgICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuYXV0aG9yaXplX3VyaSA9IGF1dGhvcml6ZV91cmk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImZvcm1cIiwgeyBtZXRob2Q6IFwicG9zdFwiLCBhY3Rpb246IHRoaXMuYXV0aG9yaXplX3VyaSB9LFxuICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCB0aGlzLmNsaWVudC5kaXNwbGF5X25hbWUpLFxuICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIHRoaXMuY2xpZW50LmRlc2NyaXB0aW9uKSxcbiAgICAgICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMucmVxdWVzdCkubWFwKChrZXkpID0+IChqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgbmFtZToga2V5LCB0eXBlOiBcImhpZGRlblwiLCB2YWx1ZTogdGhpcy5yZXF1ZXN0W2tleV0gfSkpKSxcbiAgICAgICAgICAgIGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3M6IFwiZm9ybS1jb250cm9sc1wiIH0sXG4gICAgICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiLCBudWxsLCBcInVzZXJuYW1lXCIpLFxuICAgICAgICAgICAgICAgIGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBuYW1lOiBcInVzZXJuYW1lXCIsIHR5cGU6IFwidGV4dFwiIH0pLFxuICAgICAgICAgICAgICAgIGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIiwgbnVsbCwgXCJwYXNzd29yZFwiKSxcbiAgICAgICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgbmFtZTogXCJwYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSkpLFxuICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJidXR0b25zXCIgfSxcbiAgICAgICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IGNsYXNzOiBcImRlZmF1bHRcIiwgdHlwZTogXCJzdWJtaXRcIiwgbmFtZTogXCJhdXRob3JpemVkXCIsIHZhbHVlOiBcInllc1wiIH0sIFwiTG9naW5cIiksXG4gICAgICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyB0eXBlOiBcImJ1dHRvblwiLCBvbmNsaWNrOiAoKSA9PiBqc3hfcm91dGluZ18xLmRlZmF1bHQucmVkaXJlY3RUbyhcIi9cIikgfSwgXCJDYW5jZWxcIikpKSk7XG4gICAgfVxufVxuZXhwb3J0cy5Mb2dpbiA9IExvZ2luO1xuY2xhc3MgQXV0aGVudGljYXRpb24gZXh0ZW5kcyByZXF1aXJlX2luaXRfMS5kZWZhdWx0IHtcbiAgICBzdGF0aWMgZ2V0IGxvZ2luX3BhdGgoKSB7XG4gICAgICAgIHJldHVybiBBdXRoZW50aWNhdGlvbi5jb25maWcubG9naW5fcGF0aDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBsb2dvdXRfcGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uLmNvbmZpZy5sb2dvdXRfcGF0aDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBvYXV0aDJfcmVkaXJlY3RfcGF0aCgpIHtcbiAgICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uLmNvbmZpZy5vYXV0aDJfcmVkaXJlY3RfcGF0aDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBvYXV0aDJfYXV0aG9yaXplX3BhdGgoKSB7XG4gICAgICAgIHJldHVybiBBdXRoZW50aWNhdGlvbi5jb25maWcub2F1dGgyX2F1dGhvcml6ZV9wYXRoO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IG9hdXRoMl9hdXRob3JpemVkX3BhdGgoKSB7XG4gICAgICAgIHJldHVybiBBdXRoZW50aWNhdGlvbi5jb25maWcub2F1dGgyX2F1dGhvcml6ZWRfcGF0aDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBhdXRob3JpemVfdXJpKCkge1xuICAgICAgICByZXR1cm4gQVBJXzEuZGVmYXVsdC5idWlsZFVybChBdXRoZW50aWNhdGlvbi5jb25maWcuYXV0aG9yaXplX2VuZHBvaW50KTtcbiAgICB9XG4gICAgc3RhdGljIGdldCB0b2tlbl9lbmRwb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uLmNvbmZpZy50b2tlbl9lbmRwb2ludDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBjbGllbnRfZW5kcG9pbnQoKSB7XG4gICAgICAgIHJldHVybiBBdXRoZW50aWNhdGlvbi5jb25maWcuY2xpZW50X2VuZHBvaW50O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGNsaWVudERlc2NyaXB0b3IoKSB7XG4gICAgICAgIHJldHVybiBBdXRoZW50aWNhdGlvbi5jb25maWcuY2xpZW50RGVzY3JpcHRvcjtcbiAgICB9XG4gICAgc3RhdGljIGdldCBMb2dpbigpIHtcbiAgICAgICAgcmV0dXJuIEF1dGhlbnRpY2F0aW9uLmNvbmZpZy5sb2dpbkNvbXBvbmVudDtcbiAgICB9XG4gICAgc3RhdGljIGdldCBsb2dvdXRIYW5kbGVyKCkge1xuICAgICAgICByZXR1cm4gQXV0aGVudGljYXRpb24uY29uZmlnLmxvZ291dEhhbmRsZXI7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgb2F1dGgyX3JlZGlyZWN0X3VyaSgpIHtcbiAgICAgICAgcmV0dXJuIGAke2xvY2F0aW9uLnByb3RvY29sfS8vJHtwYXRoX2Jyb3dzZXJpZnlfMS5kZWZhdWx0LmpvaW4oYCR7bG9jYXRpb24uaG9zdG5hbWV9JHtsb2NhdGlvbi5wb3J0ID8gYDoke2xvY2F0aW9uLnBvcnR9YCA6IFwiXCJ9YCwganN4X3JvdXRpbmdfMS5kZWZhdWx0LnJvb3QsIEF1dGhlbnRpY2F0aW9uLm9hdXRoMl9yZWRpcmVjdF9wYXRoKX1gO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGFjY2Vzc190b2tlbigpIHtcbiAgICAgICAgcmV0dXJuIGpzeF9saWJfMS5Db29raWUuZ2V0KEF1dGhlbnRpY2F0aW9uLkNPT0tJRV9BQ0NFU1NfVE9LRU4pO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IHJlZnJlc2hfdG9rZW4oKSB7XG4gICAgICAgIHJldHVybiBqc3hfbGliXzEuQ29va2llLmdldChBdXRoZW50aWNhdGlvbi5DT09LSUVfUkVGUkVTSF9UT0tFTik7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgb2F1dGhfc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBqc3hfbGliXzEuQ29va2llLmdldChBdXRoZW50aWNhdGlvbi5DT09LSUVfU1RBVEUpO1xuICAgIH1cbiAgICBzdGF0aWMgc2V0IG9hdXRoX3N0YXRlKHN0YXRlKSB7XG4gICAgICAgIGpzeF9saWJfMS5Db29raWUuc2V0KHsgbmFtZTogQXV0aGVudGljYXRpb24uQ09PS0lFX1NUQVRFLCB2YWx1ZTogc3RhdGUgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgYm9va21hcmsoKSB7XG4gICAgICAgIGNvbnN0IGJvb2ttYXJrID0ganN4X2xpYl8xLkNvb2tpZS5nZXQoQXV0aGVudGljYXRpb24uQ09PS0lFX0JPT0tNQVJLKSB8fCBcIi9cIjtcbiAgICAgICAganN4X2xpYl8xLkNvb2tpZS5kZWxldGUodGhpcy5DT09LSUVfQk9PS01BUkspO1xuICAgICAgICByZXR1cm4gYm9va21hcms7XG4gICAgfVxuICAgIHN0YXRpYyBzZXQgYm9va21hcmsoY3VycmVudFBhdGgpIHtcbiAgICAgICAgc3dpdGNoIChwYXRoX2Jyb3dzZXJpZnlfMS5kZWZhdWx0LmpvaW4oXCIvXCIsIGN1cnJlbnRQYXRoKSkge1xuICAgICAgICAgICAgY2FzZSBBdXRoZW50aWNhdGlvbi5sb2dpbl9wYXRoOlxuICAgICAgICAgICAgY2FzZSBBdXRoZW50aWNhdGlvbi5vYXV0aDJfcmVkaXJlY3RfcGF0aDpcbiAgICAgICAgICAgICAgICBqc3hfbGliXzEuQ29va2llLmRlbGV0ZShBdXRoZW50aWNhdGlvbi5DT09LSUVfQk9PS01BUkspO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBqc3hfbGliXzEuQ29va2llLnNldCh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEF1dGhlbnRpY2F0aW9uLkNPT0tJRV9CT09LTUFSSyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGN1cnJlbnRQYXRoLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpbml0KGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIEF1dGhlbnRpY2F0aW9uLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgQXV0aGVudGljYXRpb24uY29uZmlnKSwgY29uZmlnKTtcbiAgICAgICAganN4X3JvdXRpbmdfMS5kZWZhdWx0LmFkZChBdXRoZW50aWNhdGlvbi5sb2dpbl9wYXRoLCBBdXRoZW50aWNhdGlvbi51c2VyTG9naW4pXG4gICAgICAgICAgICAuYWRkKEF1dGhlbnRpY2F0aW9uLmxvZ291dF9wYXRoLCBBdXRoZW50aWNhdGlvbi51c2VyTG9nb3V0KVxuICAgICAgICAgICAgLmFkZChBdXRoZW50aWNhdGlvbi5vYXV0aDJfYXV0aG9yaXplX3BhdGgsIEF1dGhlbnRpY2F0aW9uLmhhbmRsZUF1dGhvcml6YXRpb24pXG4gICAgICAgICAgICAuYWRkKEF1dGhlbnRpY2F0aW9uLm9hdXRoMl9yZWRpcmVjdF9wYXRoLCBBdXRoZW50aWNhdGlvbi5oYW5kbGVPQXV0aDJSZWRpcmVjdClcbiAgICAgICAgICAgIC5hZGQoQXV0aGVudGljYXRpb24ub2F1dGgyX2F1dGhvcml6ZWRfcGF0aCwgQXV0aGVudGljYXRpb24uaGFuZGxlQXV0aG9yaXplZCk7XG4gICAgICAgIEF1dGhlbnRpY2F0aW9uLm1hcmtJbml0aWFsaXplZCgpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVxdWlyZUF1dGhlbnRpY2F0aW9uKCkge1xuICAgICAgICBpZiAoIUF1dGhlbnRpY2F0aW9uLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgQXV0aGVudGljYXRpb24udXNlckxvZ2luKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGRpc3BsYXlTcGlubmVyKCkgeyB9XG4gICAgc3RhdGljIGhhbmRsZU9BdXRoMlJlZGlyZWN0KCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ganN4X2xpYl8xLlF1ZXJ5LnBhcnNlR2V0UGFyYW1ldGVycygpO1xuICAgICAgICAgICAgaWYgKCFwYXJhbXMuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBBdXRoZW50aWNhdGlvbi5yZXF1ZXN0QXV0aG9yaXphdGlvbkNvZGVHcmFudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgKDAsIGpzeF9mYWN0b3J5XzEucmVuZGVyKShqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsIHBhcmFtcy5lcnJvciksXG4gICAgICAgICAgICAgICAgICAgIGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCBwYXJhbXMuZXJyb3JfZGVzY3JpcHRpb24pLFxuICAgICAgICAgICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCB7IGhyZWY6IFwiL1wiLCBvbmNsaWNrOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpzeF9yb3V0aW5nXzEuZGVmYXVsdC5uYXZpZ2F0ZVRvKFwiL1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IH0sIFwiR28gaG9tZVwiKSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBoYW5kbGVBdXRob3JpemF0aW9uKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5U3Bpbm5lcigpO1xuICAgICAgICAgICAgQXV0aGVudGljYXRpb24ub2F1dGhfc3RhdGUgPSAoMCwgdXVpZF8xLnY0KSgpO1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbmV3IE9BdXRoMl8xLkF1dGhvcml6YXRpb25SZXF1ZXN0KEF1dGhlbnRpY2F0aW9uLm9hdXRoX3N0YXRlKSksIGpzeF9saWJfMS5RdWVyeS5wYXJzZUdldFBhcmFtZXRlcnMoKSk7XG4gICAgICAgICAgICBBdXRoZW50aWNhdGlvbi5fY2xpZW50ID0geWllbGQgQXV0aGVudGljYXRpb24uY2xpZW50RGVzY3JpcHRvcihyZXF1ZXN0LmNsaWVudF9pZCk7XG4gICAgICAgICAgICAoMCwganN4X2ZhY3RvcnlfMS5yZW5kZXIpKGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEF1dGhlbnRpY2F0aW9uLkxvZ2luLCB7IGNsaWVudDogQXV0aGVudGljYXRpb24uX2NsaWVudCwgcmVxdWVzdDogcmVxdWVzdCwgYXV0aG9yaXplX3VyaTogQXV0aGVudGljYXRpb24uYXV0aG9yaXplX3VyaSB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgaGFuZGxlQXV0aG9yaXplZCgpIHtcbiAgICAgICAgdmFyIF9iO1xuICAgICAgICAoMCwganN4X2ZhY3RvcnlfMS5yZW5kZXIpKGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImgxXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgYCR7KChfYiA9IEF1dGhlbnRpY2F0aW9uLl9jbGllbnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kaXNwbGF5X25hbWUpIHx8IFwiQXBwbGljYXRpb25cIn0gQXV0aG9yaXplZGAsXG4gICAgICAgICAgICAgICAgXCIgXCIsXG4gICAgICAgICAgICAgICAgXCJjbG9zZWFibGU9XCIsXG4gICAgICAgICAgICAgICAgZmFsc2UpLFxuICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIFwiWW91IG1heSBjbG9zZSB0aGlzIHdpbmRvdy5cIikpKTtcbiAgICAgICAgQXV0aGVudGljYXRpb24uX2NsaWVudCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc3RhdGljIGdldEFjY2Vzc1Rva2VuKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKEF1dGhlbnRpY2F0aW9uLmFjY2Vzc190b2tlbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBBdXRoZW50aWNhdGlvbi5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChBdXRoZW50aWNhdGlvbi5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIEF1dGhlbnRpY2F0aW9uLnJlcXVlc3RSZWZyZXNoVG9rZW5HcmFudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb24udXNlckxvZ2luKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByZXF1ZXN0QXV0aG9yaXphdGlvbkNvZGVHcmFudCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGF1dGhvcml6YXRpb24gPSBqc3hfbGliXzEuUXVlcnkucGFyc2VHZXRQYXJhbWV0ZXJzKCk7XG4gICAgICAgICAgICBpZiAoQXV0aGVudGljYXRpb24ub2F1dGhfc3RhdGUgPT09IGF1dGhvcml6YXRpb24uc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBqc3hfbGliXzEuQ29va2llLmRlbGV0ZShBdXRoZW50aWNhdGlvbi5DT09LSUVfU1RBVEUpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uLnN0b3JlVG9rZW4obmV3IE9BdXRoMl8xLlRva2VuKHlpZWxkIEFQSV8xLmRlZmF1bHQucG9zdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRwb2ludDogQXV0aGVudGljYXRpb24udG9rZW5fZW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBuZXcgT0F1dGgyXzEuQXV0aG9yaXphdGlvbkNvZGVHcmFudFJlcXVlc3QoYXV0aG9yaXphdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFQSV8xLkFQSUVycm9yLmlzQVBJRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBdXRoZW50aWNhdGlvbi51c2VyTG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGpzeF9yb3V0aW5nXzEuZGVmYXVsdC5uYXZpZ2F0ZVRvKEF1dGhlbnRpY2F0aW9uLmJvb2ttYXJrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIEF1dGhlbnRpY2F0aW9uLnVzZXJMb2dpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJlcXVlc3RSZWZyZXNoVG9rZW5HcmFudCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKEF1dGhlbnRpY2F0aW9uLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgQXV0aGVudGljYXRpb24uc3RvcmVUb2tlbihuZXcgT0F1dGgyXzEuVG9rZW4oeWllbGQgQVBJXzEuZGVmYXVsdC5wb3N0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZHBvaW50OiBBdXRoZW50aWNhdGlvbi50b2tlbl9lbmRwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IG5ldyBPQXV0aDJfMS5SZWZyZXNoVG9rZW5HcmFudFJlcXVlc3QoQXV0aGVudGljYXRpb24ucmVmcmVzaF90b2tlbiksXG4gICAgICAgICAgICAgICAgICAgIH0sIGZhbHNlKSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXV0aGVudGljYXRpb24uYWNjZXNzX3Rva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGlmIChBUElfMS5BUElFcnJvci5pc0FQSUVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICBBdXRoZW50aWNhdGlvbi51c2VyTG9naW4oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxlZCB3aXRob3V0IGEgdmFsaWQgcmVmcmVzaCB0b2tlblwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBzdG9yZVRva2VuKHRva2VuKSB7XG4gICAgICAgIGpzeF9saWJfMS5Db29raWUuc2V0KHtcbiAgICAgICAgICAgIG5hbWU6IEF1dGhlbnRpY2F0aW9uLkNPT0tJRV9BQ0NFU1NfVE9LRU4sXG4gICAgICAgICAgICB2YWx1ZTogdG9rZW4uYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgZXhwaXJlczoge1xuICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IHRva2VuLmV4cGlyZXNfaW4sXG4gICAgICAgICAgICAgICAgdW5pdDogXCJzZWNvbmRzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAganN4X2xpYl8xLkNvb2tpZS5zZXQoe1xuICAgICAgICAgICAgbmFtZTogQXV0aGVudGljYXRpb24uQ09PS0lFX1JFRlJFU0hfVE9LRU4sXG4gICAgICAgICAgICB2YWx1ZTogdG9rZW4ucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgIGV4cGlyZXM6IHtcbiAgICAgICAgICAgICAgICBleHBpcmVzX2luOiAyNCxcbiAgICAgICAgICAgICAgICB1bml0OiBcIndlZWtzXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBBdXRoZW50aWNhdGlvbjtcbl9hID0gQXV0aGVudGljYXRpb247XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb25maWd1cmFibGUgcHJvcGVydGllc1xuICovXG5BdXRoZW50aWNhdGlvbi5jb25maWcgPSB7XG4gICAgbG9naW5fcGF0aDogXCIvb2F1dGgyL2xvZ2luXCIsXG4gICAgbG9nb3V0X3BhdGg6IFwiL29hdXRoMi9sb2dvdXRcIixcbiAgICBvYXV0aDJfcmVkaXJlY3RfcGF0aDogXCIvb2F1dGgyL3JlZGlyZWN0XCIsXG4gICAgb2F1dGgyX2F1dGhvcml6ZV9wYXRoOiBcIi9vYXV0aDIvYXV0aG9yaXplXCIsXG4gICAgb2F1dGgyX2F1dGhvcml6ZWRfcGF0aDogXCIvb2F1dGgyL2F1dGhvcml6ZWRcIixcbiAgICBhdXRob3JpemVfZW5kcG9pbnQ6IFwiL29hdXRoMi9hdXRob3JpemVcIixcbiAgICB0b2tlbl9lbmRwb2ludDogXCIvb2F1dGgyL3Rva2VuXCIsXG4gICAgY2xpZW50X2VuZHBvaW50OiBcIi9vYXV0aDIvY2xpZW50XCIsXG4gICAgY2xpZW50RGVzY3JpcHRvcjogKGNsaWVudF9pZCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHJldHVybiB5aWVsZCBBUElfMS5kZWZhdWx0LmdldCh7IGVuZHBvaW50OiBwYXRoX2Jyb3dzZXJpZnlfMS5kZWZhdWx0LmpvaW4oQXV0aGVudGljYXRpb24uY2xpZW50X2VuZHBvaW50LCBjbGllbnRfaWQpIH0sIGZhbHNlKTtcbiAgICB9KSxcbiAgICBsb2dpbkNvbXBvbmVudDogTG9naW4sXG4gICAgbG9nb3V0SGFuZGxlcjogKCkgPT4ganN4X3JvdXRpbmdfMS5kZWZhdWx0Lm5hdmlnYXRlVG8oQXV0aGVudGljYXRpb24uY29uZmlnLmxvZ2luX3BhdGgpLFxufTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQ29va2llLWJhc2VkIHByb3BlcnRpZXNcbiAqL1xuLy8gY29va2llIG5hbWVzXG5BdXRoZW50aWNhdGlvbi5DT09LSUVfU1RBVEUgPSBcIm9hdXRoMl9zdGF0ZVwiO1xuQXV0aGVudGljYXRpb24uQ09PS0lFX0FDQ0VTU19UT0tFTiA9IFwiYWNjZXNzX3Rva2VuXCI7XG5BdXRoZW50aWNhdGlvbi5DT09LSUVfUkVGUkVTSF9UT0tFTiA9IFwicmVmcmVzaF90b2tlblwiO1xuQXV0aGVudGljYXRpb24uQ09PS0lFX0JPT0tNQVJLID0gXCJib29rbWFya1wiO1xuQXV0aGVudGljYXRpb24udXNlckxvZ2luID0gKCkgPT4ge1xuICAgIGlmICghQXV0aGVudGljYXRpb24uYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgIF9hLmRpc3BsYXlTcGlubmVyKCk7XG4gICAgICAgIEF1dGhlbnRpY2F0aW9uLm9hdXRoX3N0YXRlID0gKDAsIHV1aWRfMS52NCkoKTtcbiAgICAgICAgQXV0aGVudGljYXRpb24uYm9va21hcmsgPSBgJHtqc3hfcm91dGluZ18xLmRlZmF1bHQuY3VycmVudFBhdGh9JHtsb2NhdGlvbi5zZWFyY2h9YDtcbiAgICAgICAgQXV0aGVudGljYXRpb24uY2xpZW50RGVzY3JpcHRvcihPQXV0aDJfMS5kZWZhdWx0LmNsaWVudF9pZCkudGhlbigoY2xpZW50KSA9PiB7XG4gICAgICAgICAgICAoMCwganN4X2ZhY3RvcnlfMS5yZW5kZXIpKGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KEF1dGhlbnRpY2F0aW9uLkxvZ2luLCB7IGNsaWVudDogY2xpZW50LCByZXF1ZXN0OiBuZXcgT0F1dGgyXzEuQXV0aG9yaXphdGlvblJlcXVlc3QoQXV0aGVudGljYXRpb24ub2F1dGhfc3RhdGUpLCBhdXRob3JpemVfdXJpOiBBdXRoZW50aWNhdGlvbi5hdXRob3JpemVfdXJpIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBqc3hfcm91dGluZ18xLmRlZmF1bHQubmF2aWdhdGVUbyhcIi9cIik7XG4gICAgfVxufTtcbkF1dGhlbnRpY2F0aW9uLnVzZXJMb2dvdXQgPSAoKSA9PiB7XG4gICAganN4X2xpYl8xLkNvb2tpZS5kZWxldGUoQXV0aGVudGljYXRpb24uQ09PS0lFX0FDQ0VTU19UT0tFTik7XG4gICAganN4X2xpYl8xLkNvb2tpZS5kZWxldGUoQXV0aGVudGljYXRpb24uQ09PS0lFX1JFRlJFU0hfVE9LRU4pO1xuICAgIEF1dGhlbnRpY2F0aW9uLmxvZ291dEhhbmRsZXIoKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IE9BdXRoMl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL09BdXRoMlwiKSk7XG5jbGFzcyBBYnN0cmFjdEdyYW50UmVxdWVzdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2xpZW50X2lkID0gT0F1dGgyXzEuZGVmYXVsdC5jbGllbnRfaWQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQWJzdHJhY3RHcmFudFJlcXVlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXV0aG9yaXphdGlvbkNvZGVHcmFudFJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBBdXRoZW50aWNhdGlvbl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuLi9BdXRoZW50aWNhdGlvblwiKSk7XG5jb25zdCBBYnN0cmFjdEdyYW50UmVxdWVzdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0Fic3RyYWN0R3JhbnRSZXF1ZXN0XCIpKTtcbmNvbnN0IGpzeF9saWJfMSA9IHJlcXVpcmUoXCJAYmF0dGlzL2pzeC1saWJcIik7XG5jb25zdCBPQXV0aDJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9PQXV0aDJcIikpO1xuY2xhc3MgQXV0aG9yaXphdGlvblJlcXVlc3QgZXh0ZW5kcyBqc3hfbGliXzEuR2V0UmVxdWVzdFBhcmFtZXRlcnMge1xuICAgIGNvbnN0cnVjdG9yKHN0YXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucmVzcG9uc2VfdHlwZSA9ICdjb2RlJztcbiAgICAgICAgdGhpcy5yZWRpcmVjdF91cmkgPSBBdXRoZW50aWNhdGlvbl8xLmRlZmF1bHQub2F1dGgyX3JlZGlyZWN0X3VyaTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICB0aGlzLmNsaWVudF9pZCA9IE9BdXRoMl8xLmRlZmF1bHQuY2xpZW50X2lkO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEF1dGhvcml6YXRpb25SZXF1ZXN0O1xuY2xhc3MgQXV0aG9yaXphdGlvbkNvZGVHcmFudFJlcXVlc3QgZXh0ZW5kcyBBYnN0cmFjdEdyYW50UmVxdWVzdF8xLmRlZmF1bHQge1xuICAgIGNvbnN0cnVjdG9yKGF1dGhvcml6YXRpb24pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ncmFudF90eXBlID0gJ2F1dGhvcml6YXRpb25fY29kZSc7XG4gICAgICAgIHRoaXMucmVkaXJlY3RfdXJpID0gQXV0aGVudGljYXRpb25fMS5kZWZhdWx0Lm9hdXRoMl9yZWRpcmVjdF91cmk7XG4gICAgICAgIHRoaXMuY29kZSA9IGF1dGhvcml6YXRpb24uY29kZTtcbiAgICB9XG59XG5leHBvcnRzLkF1dGhvcml6YXRpb25Db2RlR3JhbnRSZXF1ZXN0ID0gQXV0aG9yaXphdGlvbkNvZGVHcmFudFJlcXVlc3Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHJlcXVpcmVfaW5pdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJAYmF0dGlzL3JlcXVpcmUtaW5pdFwiKSk7XG5jbGFzcyBPQXV0aDIgZXh0ZW5kcyByZXF1aXJlX2luaXRfMS5kZWZhdWx0IHtcbiAgICBzdGF0aWMgZ2V0IGNsaWVudF9pZCgpIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlSW5pdGlhbGl6YXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaWVudF9pZDtcbiAgICB9XG4gICAgc3RhdGljIGluaXQoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuX2NsaWVudF9pZCA9IGNvbmZpZy5jbGllbnRfaWQ7XG4gICAgICAgIHRoaXMubWFya0luaXRpYWxpemVkKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gT0F1dGgyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBBYnN0cmFjdEdyYW50UmVxdWVzdF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0Fic3RyYWN0R3JhbnRSZXF1ZXN0XCIpKTtcbmNsYXNzIFJlZnJlc2hUb2tlbkdyYW50UmVxdWVzdCBleHRlbmRzIEFic3RyYWN0R3JhbnRSZXF1ZXN0XzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3IocmVmcmVzaF90b2tlbikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmdyYW50X3R5cGUgPSAncmVmcmVzaF90b2tlbic7XG4gICAgICAgIHRoaXMucmVmcmVzaF90b2tlbiA9IHJlZnJlc2hfdG9rZW47XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUmVmcmVzaFRva2VuR3JhbnRSZXF1ZXN0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBUb2tlbiB7XG4gICAgY29uc3RydWN0b3IoX2EpIHtcbiAgICAgICAgdmFyIHsgYWNjZXNzX3Rva2VuLCBleHBpcmVzX2luIH0gPSBfYSwgZGF0YSA9IF9fcmVzdChfYSwgW1wiYWNjZXNzX3Rva2VuXCIsIFwiZXhwaXJlc19pblwiXSk7XG4gICAgICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gYWNjZXNzX3Rva2VuO1xuICAgICAgICB0aGlzLmV4cGlyZXNfaW4gPSBleHBpcmVzX2luO1xuICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVG9rZW47XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Ub2tlbiA9IGV4cG9ydHMuUmVmcmVzaFRva2VuR3JhbnRSZXF1ZXN0ID0gZXhwb3J0cy5BdXRob3JpemF0aW9uQ29kZUdyYW50UmVxdWVzdCA9IGV4cG9ydHMuQXV0aG9yaXphdGlvblJlcXVlc3QgPSB2b2lkIDA7XG5jb25zdCBPQXV0aDJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9PQXV0aDJcIikpO1xuY29uc3QgQXV0aG9yaXphdGlvblJlcXVlc3RfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9BdXRob3JpemF0aW9uUmVxdWVzdFwiKSk7XG5leHBvcnRzLkF1dGhvcml6YXRpb25SZXF1ZXN0ID0gQXV0aG9yaXphdGlvblJlcXVlc3RfMS5kZWZhdWx0O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXV0aG9yaXphdGlvbkNvZGVHcmFudFJlcXVlc3RcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIEF1dGhvcml6YXRpb25SZXF1ZXN0XzEuQXV0aG9yaXphdGlvbkNvZGVHcmFudFJlcXVlc3Q7IH0gfSk7XG5jb25zdCBSZWZyZXNoVG9rZW5HcmFudFJlcXVlc3RfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9SZWZyZXNoVG9rZW5HcmFudFJlcXVlc3RcIikpO1xuZXhwb3J0cy5SZWZyZXNoVG9rZW5HcmFudFJlcXVlc3QgPSBSZWZyZXNoVG9rZW5HcmFudFJlcXVlc3RfMS5kZWZhdWx0O1xuY29uc3QgVG9rZW5fMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Ub2tlblwiKSk7XG5leHBvcnRzLlRva2VuID0gVG9rZW5fMS5kZWZhdWx0O1xuZXhwb3J0cy5kZWZhdWx0ID0gT0F1dGgyXzEuZGVmYXVsdDtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX2pzeF9mYWN0b3J5X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19iYXR0aXNfanN4X2xpYl9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX2pzeF9yb3V0aW5nX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19iYXR0aXNfcmVxdWlyZV9pbml0X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3BhdGhfYnJvd3NlcmlmeV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV91dWlkX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=