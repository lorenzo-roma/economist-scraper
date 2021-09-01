
export default class RequestMock {

    headers: any;

    constructor(){this.headers = {}}

    addHeader(key: string, value: string): void {
        this.headers[key] = value;
    }

    addMockAuth(): void {

        this.addHeader("authorization", "Bearer abcdefg");

    }

    getRequest(): any {
        return {
            headers: this.headers
        };
    }

}