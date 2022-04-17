export default class Token {
    [key: string]: string | number | undefined;
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope?: string;
    token_type?: string;
    constructor({ access_token, expires_in, ...data }: {
        [x: string]: any;
        access_token: any;
        expires_in: any;
    });
}
