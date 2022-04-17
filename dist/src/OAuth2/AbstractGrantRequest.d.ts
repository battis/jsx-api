export default abstract class AbstractGrantRequest {
    abstract grant_type: string;
    client_id: string;
    client_secret?: string;
}
