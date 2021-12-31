import API, { RestfulGetRequest } from './API';
import Fixture from './API.fixture';
import Authentication from './Authentication';

jest.mock('./Authentication');

describe('API', () => {
    beforeAll(() => {
        (Authentication.getAccessToken as jest.Mock).mockReturnValue(
            Fixture.AuthenticationToken
        );
    });

    test('init()', async () => {
        const endpoint = '/foo';
        const expectation = { foo: 'bar' };
        Fixture.mock({
            method: 'GET',
            endpoint,
            requireAuthentication: false,
            expectation
        });
        await expect(API.get({ endpoint }, false)).rejects.toThrowError(
            'initialized'
        );
        API.init(Fixture.init);
        await expect(API.get({ endpoint }, false)).resolves.toEqual(
            expectation
        );
    });

    describe('after init()', () => {
        beforeEach(() => {
            API.init(Fixture.init);
        });

        test('call(RestfulRequest, boolean, HeadersInit)', async () => {
            for (const test of Fixture.test) {
                Fixture.mock(test);
                await expect(
                    API.call({
                        endpoint: test.url,
                        method: test.method
                    } as RestfulGetRequest)
                ).resolves.toEqual(test.expectation);
            }
        });

        test('get(request)', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });

        test('post(request)', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });

        test('put(request)', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });

        test('delete(request)', () => {
            // FIXME replace stub
            expect(false).toBeTruthy();
        });
    });
});
