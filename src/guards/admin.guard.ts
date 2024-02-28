import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const data = this.jwtService.decode(token);
        if (!data.userId || !data.isAdmin) return false;
        request.isAdmin = data?.isAdmin;
        request.userId = data.userId;
        return true;
      } catch (error) {}
    }
    return false;
  }
}
