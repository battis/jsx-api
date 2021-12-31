export default class Token {
    [key: string]: string | number | undefined;

    public access_token: string;
    public expires_in: number;
    public refresh_token?: string;
    public scope?: string;
    public token_type?: string;

    constructor({ access_token, expires_in, ...data }) {
        this.access_token = access_token;
        this.expires_in = expires_in;
        for (const prop of Object.getOwnPropertyNames(data)) {
            this[prop] = data[prop];
        }
    }
}
