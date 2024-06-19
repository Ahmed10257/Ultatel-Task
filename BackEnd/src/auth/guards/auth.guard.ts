import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Extract the request object from the context
        const request = context.switchToHttp().getRequest();
        // Extract the token from the request
        const token = this.extractTokenFromHeader(request);
        // If the token does not exist, throw an UnauthorizedException
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // Verify the token and set the user object in the request
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
    // a helper method to extract the token from the request header
    private extractTokenFromHeader(request: Request): string | undefined {
        // Extract the authorization header from the request
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        // If the type is Bearer, return the token, otherwise return undefined
        return type === 'Bearer' ? token : undefined;
    }
}