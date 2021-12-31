import { rest } from 'msw';
import path from 'path';
import { server } from '../tests/server/server';

type MockConfig = {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    url?;
    endpoint?;
    body?;
    requireAuthentication?;
    resolver?;
    expectation;
};

rest.get('/foo', (request, response, context) => {
    request.headers;
});

export default class Fixture {
    static init = { url: 'https://example/com' };

    static AuthenticationToken = 'foo';

    static verifyAuthentication(headers: Headers) {
        expect(headers.get('Authorization')).toEqual(
            `Bearer ${this.AuthenticationToken}`
        );
    }

    private static genericResolver(
        requireAuthentication,
        expectation,
        request,
        response,
        context
    ) {
        requireAuthentication && this.verifyAuthentication(request.headers);
        return response(context.json(expectation));
    }

    static mock(config: MockConfig) {
        let mask: string|RegExp = '/foo';
        if (config.endpoint instanceof RegExp) {
            mask = config.endpoint;
        } else if (config.endpoint) {
            if (config.url) {
                mask = path.join(config.url, config.endpoint);
            } else {
                mask = path.join(this.init.url, config.endpoint);
            }
        } else if (config.url) {
            mask = config.url;
        }

        server.use(
            rest[config.method.toLowerCase()](
                mask,
                config.resolver ||
                    this.genericResolver.bind(
                        this,
                        config.requireAuthentication === false ? false : true,
                        config.expectation
                    )
            )
        );
    }

    static test: MockConfig[] = [
        {
            method: 'GET',
            url: '/foo',
            requireAuthentication: false,
            expectation: { foo: 'bar' }
        }
    ];
}
