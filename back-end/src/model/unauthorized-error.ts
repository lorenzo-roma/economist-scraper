import ErrorType from "./error-type";

export default class UnauthorizedError extends Error {

    errorType: ErrorType = ErrorType.UNAUTHORIZED;

    constructor(message?: string) {
        super(message);
    }
}