import express from "express";
import { APIResponse, APIResponseStatus } from "../../model/api-response";
import AuthResult from "../../model/auth-result";
import User from "../../model/user";
import ServiceProvider from "../../service/service-provider";

export default async function performSignup(
  req: express.Request
): Promise<APIResponse> {
    const username = req.body.username;
    const password = req.body.password;
    const service = await ServiceProvider.getAuthService();
    const user: User = { username, password };
    const authResult = await service.signUp(user);
    switch (authResult) {
      case AuthResult.SUCCESS:
        const token = service.getToken(user);
        return { status: APIResponseStatus.SUCCESS, data: { token } };
        break;
      default:
        return { status: APIResponseStatus.UNAUTHORIZED, data: {} };
    }

}
