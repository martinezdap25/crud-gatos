import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import ActiveUserInterface from "../interface/user-active-interface";

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: ActiveUserInterface }>();
    return request.user;
  }
);