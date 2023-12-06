import { JwtService } from "@nestjs/jwt";
import { AdminService } from "src/admin/admin.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,

    private jwtService: JwtService
  ) {}
  async login(role, email, pass) {
    var user = null;
    if (role === "Admin") {
      user = await this.adminService.findOneByEmail(email);
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, email: user.email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signup(role, email, pass, body) {
    var user = null;
    if (!pass || !email) {
      return { msg: "unvalid data" };
    }
    if (role === "Admin") {
      user = await this.adminService.findOneByEmail(email);
    }
    if (user) {
      return { msg: "email already exist" };
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    var newUser = null;
    if (role === "Admin") {
      newUser = await this.adminService.create({
        ...body,
        email,
        password: hash,
      });
    }
    const payload = { sub: newUser._id, email: newUser.email, role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: newUser,
    };
  }

  decode(token: any) {
    return this.jwtService.verifyAsync(token);
  }
}
