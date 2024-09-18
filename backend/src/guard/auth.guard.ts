import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import AuthService from "src/auth/auth.service";

@Injectable()
// Caso o guard retorne falso ele não passa para o methodo de rota, apenas se passar true.
export default class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();
        
        const {authorization} = request.headers;

        try {

            const data = this.authService.checkToken((authorization ?? '').split(" ")[1]);

            request.token = data;

            return true

        } catch {

            return false;

        }
    }
}