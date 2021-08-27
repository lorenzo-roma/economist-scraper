import APIResponse from "../models/api-response";


export default interface APIService {
    makeRequest(url: string, method?: string, body?: any): Promise<APIResponse>
}