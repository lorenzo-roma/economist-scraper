import User from "../../src/model/user";
import { userMock } from "./user-mock";

export default class RequestMock {

    headers: any;
    user: User;

    constructor(){this.headers = {}}

    addHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    addMockAuth(): void {
        this.addHeader("authorization", "Bearer abcdefg");
    }

    addMockUser(): void {
        this.user = userMock;
    }

    getRequest(): any {
        return {
            headers: this.headers,
            ...{user: this.user}
        };
    }

}