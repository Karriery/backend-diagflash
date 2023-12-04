import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/guard';

@Global()
@Module({
  imports: [
    AdminModule,
    JwtModule.register({ global: true, secret: 'sa7fa lableby' }),
  ],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
