
export interface APIResponse{
    status: APIResponseStatus,
    data: any
}

export enum APIResponseStatus {
    SUCCESS = "Success",
    ERROR = "Error",
    UNAUTHORIZED = "Unauthorized",
}

