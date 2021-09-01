import express from "express";
import CheckAuth from "../../src/middleware/check-auth-middleware";
import UnauthorizedError from "../../src/model/unauthorized-error";
import RequestMock from "../mocks/request-mock";

let requestMock: RequestMock;

beforeEach(()=>{
    requestMock = new RequestMock();
});

afterEach(()=>jest.resetAllMocks());

describe("Test check auth validation", ()=>{

    test("With user data, request can be processed", ()=>{
        requestMock.addMockUser()
        const req = requestMock.getRequest() as express.Request;
        const res = {} as express.Response;
        const next = jest.fn();
        CheckAuth(req, res, next);
        expect(next).toBeCalled();
    });

    test("Without user data, error has to be thrown", ()=>{
        const req = requestMock.getRequest() as express.Request;
        const res = {} as express.Response;
        const next = jest.fn();
        expect(()=>CheckAuth(req, res, next)).toThrowError();
        expect(next).not.toBeCalled();
    });

});

