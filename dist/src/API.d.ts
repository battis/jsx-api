import ServiceRequiringInitialization from "@battis/require-init";
export declare type APIConfiguration = {
    url: string;
};
export declare type RestfulGetRequest = {
    method: "GET";
    endpoint: string;
};
export declare type RestfulPostRequest = {
    method: "POST";
    endpoint: string;
    body?: string | object;
};
export declare type RestfulPutRequest = {
    method: "PUT";
    endpoint: string;
    body: string | object;
};
export declare type RestfulDeleteRequest = {
    method: "DELETE";
    endpoint: string;
    body?: string | object;
};
export declare type RestfulRequest = RestfulGetRequest | RestfulPostRequest | RestfulPutRequest | RestfulDeleteRequest;
export declare class APIError extends Error {
    readonly response: Response;
    constructor(response: Response);
    static isAPIError(error: Error): boolean;
}
/**
 * Server API interactions
 */
export default class API extends ServiceRequiringInitialization {
    protected static config: APIConfiguration;
    private static _url;
    static get url(): URL;
    static init({ url, ...config }: {
        [x: string]: any;
        url: any;
    }): void;
    static call(request: RestfulRequest, requireAuthentication?: boolean, headers?: HeadersInit): Promise<any>;
    static get({ endpoint, ...request }: {
        [x: string]: any;
        endpoint: any;
    }, requireAuthentication?: boolean, headers?: HeadersInit): Promise<any>;
    static post({ endpoint, ...request }: {
        [x: string]: any;
        endpoint: any;
    }, requireAuthentication?: boolean, headers?: HeadersInit): Promise<any>;
    static put({ endpoint, ...request }: {
        [x: string]: any;
        endpoint: any;
    }, requireAuthentication?: boolean, headers?: HeadersInit): Promise<any>;
    static delete({ endpoint, ...request }: {
        [x: string]: any;
        endpoint: any;
    }, requireAuthentication?: boolean, headers?: HeadersInit): Promise<any>;
    static buildUrl(...parts: string[]): string;
}
