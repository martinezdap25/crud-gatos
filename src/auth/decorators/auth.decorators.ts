import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "src/enums/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function auth(role: Role){
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    );
}