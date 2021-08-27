import APIResponse from "../../models/api-response";
import ServiceProvider from "../service-provider";
import APIService from "./api-service-inteface";


export default class FetchAPIService implements APIService {

    async makeRequest(url: string, method: string = "GET", body: any): Promise<APIResponse> {


        try{
            const service = ServiceProvider.getAuthService();
            const token = service.getToken();
            const auth = token ? {"Authorization":"Bearer "+token} : null;
            const response = await fetch(url, {method:method, body: JSON.stringify(body),
                headers:{
                ...auth,
                "Content-Type": "application/json",
            },});
            const json = await response.json();
            const apiResponse: APIResponse =  {status: json.status, code: response.status, data: json.data}
            return apiResponse;
        } catch (e){
            throw new Error("Error fetching data.")
        }
            
    }

}