import OAuth2 from './OAuth2';

export default abstract class AbstractGrantRequest {
    public abstract grant_type: string;
    public client_id = OAuth2.client_id;
    public client_secret?: string;
}
