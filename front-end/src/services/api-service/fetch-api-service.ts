import APIResponse from "../../models/api-response";
import APIService from "./api-service-inteface";


export default class FetchAPIService implements APIService {

    async makeRequest(url: string, method: string = "GET", body: any): Promise<APIResponse> {

        try{
            const response = await fetch(url, {method:method, body: JSON.stringify(body),
                headers:{
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