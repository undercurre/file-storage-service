// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtStrategy } from './guard/jwt/jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class AuthModule {}
