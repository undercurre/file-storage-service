import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core/services';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
    ]);
    console.log(isPublic, context.getHandler());
    if (isPublic) {
      return true; // 如果有 isPublic 装饰器，跳过认证
    }
    return super.canActivate(context); // 否则继续执行 JWT 验证
  }
}
