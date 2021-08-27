import APIResponse from "../../models/api-response";
import ServiceResponse from "../../models/service-response";


export default interface APIService {
    makeRequest(url: string, method?: string, body?: any): Promise<APIResponse>;
}