import express from "express";
import AppendUser from "../../src/middleware/auth-middleware";
import ServiceProvider from "../../src/service/service-provider";
import RequestMock from "../mocks/request-mock";
import { userMock } from "../mocks/user-mock";

let requestMock: RequestMock;

beforeEach(()=>{
    requestMock = new RequestMock();
});

afterEach(()=>jest.resetAllMocks());

describe("Test append of user data to request if authenticated", ()=>{

    test("With correct auth, user data should be appended", ()=>{
        ServiceProvider.getAuthService().verifyToken = jest.fn(()=>userMock)
        requestMock.addMockAuth();
        const req = requestMock.getRequest() as express.Request;
        const res = {} as express.Response;
        const next = jest.fn();
        AppendUser(req, res, next);
        expect(req["user"]).toBe(userMock)
        expect(next).toBeCalled();
    });

    test("With wrong auth, no user data should not be appended", ()=>{
        requestMock.addMockAuth();
        const req = requestMock.getRequest() as express.Request;
        const res = {} as express.Response;
        const next = jest.fn();
        AppendUser(req, res, next);
        expect(req["user"]).toBeUndefined();
        expect(next).toBeCalled();
    });

    test("Without auth, no user data should be appended", ()=>{
        const req = requestMock.getRequest() as express.Request;
        const res = {} as express.Response;
        const next = jest.fn();
        AppendUser(req, res, next);
        expect(req["user"]).toBeUndefined();
        expect(next).toBeCalled();
    });


});

