import path from "path-browserify";
import Authentication from "./Authentication";
import ServiceRequiringInitialization from "@battis/require-init";

export type APIConfiguration = { url: string };

export type RestfulGetRequest = {
  method: "GET";
  endpoint: string;
};

export type RestfulPostRequest = {
  method: "POST";
  endpoint: string;
  body?: string | object;
};
export type RestfulPutRequest = {
  method: "PUT";
  endpoint: string;
  body: string | object;
};
export type RestfulDeleteRequest = {
  method: "DELETE";
  endpoint: string;
  body?: string | object;
};
export type RestfulRequest =
  | RestfulGetRequest
  | RestfulPostRequest
  | RestfulPutRequest
  | RestfulDeleteRequest;

export class APIError extends Error {
  public readonly response: Response;

  public constructor(response: Response) {
    super(`API Status ${response.status} (${response.statusText})`);
    this.response = response;
  }

  public static isAPIError(error: Error) {
    return "response" in error;
  }
}

/**
 * Server API interactions
 */
export default class API extends ServiceRequiringInitialization {
  protected static config: APIConfiguration;

  private static _url: URL;

  public static get url() {
    return this._url;
  }

  public static init({ url, ...config }) {
    API.config = {
      url,
      ...config,
    };
    API._url = new URL(API.config.url);
    API.markInitialized();
  }

  public static async call(
    request: RestfulRequest,
    requireAuthentication = true,
    headers?: HeadersInit
  ) {
    try {
      API.requireInitialization();
    } catch (e) {
      throw e;
    }
    if (!request.endpoint) {
      throw new Error("Request endpoint required");
    }
    if (requireAuthentication) {
      headers = {
        ...headers,
        Authorization: `Bearer ${await Authentication.getAccessToken()}`,
      };
    }
    const fetchInit = {
      method: request.method,
      headers,
    };
    if (request.method !== "GET" && "body" in request) {
      if (
        typeof request.body === "string" ||
        request.body instanceof FormData
      ) {
        fetchInit["body"] = request.body;
      } else {
        fetchInit.headers = {
          ...fetchInit.headers,
          "Content-Type": "application/json",
        };
        fetchInit["body"] = JSON.stringify(request.body);
      }
    }
    // TODO handle network errors? Worker thread?
    const response = await fetch(API.buildUrl(request.endpoint), fetchInit);
    if (response.status !== 200) {
      if (response.status === 401) {
        Authentication.userLogin();
      } else {
        throw new APIError(response);
      }
    } else {
      return await response.json();
    }
  }

  public static get(
    { endpoint, ...request },
    requireAuthentication = true,
    headers?: HeadersInit
  ) {
    return API.call(
      {
        method: "GET",
        endpoint,
        ...request,
      },
      requireAuthentication,
      headers
    );
  }

  public static post(
    { endpoint, ...request },
    requireAuthentication = true,
    headers?: HeadersInit
  ) {
    return API.call(
      {
        method: "POST",
        endpoint,
        ...request,
      },
      requireAuthentication,
      headers
    );
  }

  public static put(
    { endpoint, ...request },
    requireAuthentication = true,
    headers?: HeadersInit
  ) {
    return API.call(
      {
        method: "PUT",
        endpoint,
        body: "",
        ...request,
      },
      requireAuthentication,
      headers
    );
  }

  public static delete(
    { endpoint, ...request },
    requireAuthentication = true,
    headers?: HeadersInit
  ) {
    return API.call(
      {
        method: "DELETE",
        endpoint,
        ...request,
      },
      requireAuthentication,
      headers
    );
  }

  public static buildUrl(...parts: string[]): string {
    return new URL(path.join(API._url.pathname, ...parts), API._url).href;
  }
}
