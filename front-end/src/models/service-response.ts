import ServiceResponseStatus from "./service-response-status";

export default interface ServiceResponse<T> {
    status: ServiceResponseStatus,
    data?:T
}