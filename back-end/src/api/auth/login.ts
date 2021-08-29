import express from "express";
import AuthResult from "../../model/auth-result";
import User from "../../model/user";
import ServiceProvider from "../../service/service-provider";
import Config from "../../config/config";
import { APIResponse, APIResponseStatus } from "../../model/api-response";
import UnauthorizedError from "../../model/unauthorized-error";

export default async function performLogin(
  req: express.Request
): Promise<APIResponse> {
    const username = req.body.username;
    const password = req.body.password;
    const service = await ServiceProvider.getAuthService();
    const user: User = { username, password };
    const authResult = await service.login(user);
    switch (authResult) {
      case AuthResult.SUCCESS:
        const token = service.getToken(user);
        return { status: APIResponseStatus.SUCCESS, data: { token } };
        break;
      case AuthResult.ERROR:
        return { status: APIResponseStatus.ERROR, data: AuthResult.ERROR };
        break;
      default:
        throw new UnauthorizedError();
    }
}
