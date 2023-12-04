import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';
import { AgentService } from 'src/agent/agent.service';
import { SiegeService } from 'src/siege/siege.service';
import { ExpertService } from 'src/expert/expert.service';
import { AgencyService } from 'src/agency/agency.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private agentService: AgentService,
    private siegeService: SiegeService,
    private expertService: ExpertService,
    private agencyService: AgencyService,
    private jwtService: JwtService,
  ) {}
  async login(role, email, pass) {
    var user = null;
    if (role === 'Admin') {
      user = await this.adminService.findOneByEmail(email);
    } else if (role === 'User') {
      user = await this.userService.findOneByEmail(email);
    } else if (role === 'Agent') {
      user = await this.agentService.findOneByEmail(email);
    } else if (role === 'Expert') {
      user = await this.expertService.findOneByEmail(email);
    } else if (role === 'Siege') {
      user = await this.siegeService.findOneByEmail(email);
    } else if (role === 'Agency') {
      user = await this.agencyService.findOneByEmail(email);
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

  async firstTimeSiege(email, pass, body) {
    var user = null;
    if (!pass || !email) {
      return { msg: 'unvalid data' };
    }
    user = await this.siegeService.findOneByEmail(email);
    if (!user) {
      return { msg: 'unvalid email' };
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    var newUser = null;
    newUser = await this.siegeService.update(body._id, {
      password: hash,
      first: false,
    });
    const payload = { sub: user._id, email, role: 'Siege' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async firstTimeAgency(email, pass, body) {
    var user = null;
    if (!pass || !email) {
      return { msg: 'unvalid data' };
    }
    user = await this.agencyService.findOneByEmail(email);
    if (!user) {
      return { msg: 'unvalid email' };
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    var newUser = null;
    newUser = await this.agencyService.update(body._id, {
      password: hash,
      first: false,
    });
    const payload = { sub: user._id, email, role: 'Agency' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async signup(role, email, pass, body) {
    var user = null;
    if (!pass || !email) {
      return { msg: 'unvalid data' };
    }
    if (role === 'Admin') {
      user = await this.adminService.findOneByEmail(email);
    } else if (role === 'User') {
      user = await this.userService.findOneByEmail(email);
    } else if (role === 'Agent') {
      user = await this.agentService.findOneByEmail(email);
    } else if (role === 'Expert') {
      user = await this.expertService.findOneByEmail(email);
    } else if (role === 'Siege') {
      user = await this.siegeService.findOneByEmail(email);
    } else if (role === 'Agency') {
      user = await this.agencyService.findOneByEmail(email);
    }
    if (user) {
      return { msg: 'email already exist' };
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    var newUser = null;
    if (role === 'Admin') {
      newUser = await this.adminService.create({
        ...body,
        email,
        password: hash,
      });
    } else if (role === 'User') {
      newUser = await this.userService.create({
        ...body,
        email,
        password: hash,
      });
    } else if (role === 'Agent') {
      newUser = await this.agentService.create({
        ...body,
        email,
        password: hash,
      });
    } else if (role === 'Expert') {
      newUser = await this.expertService.create({
        ...body,
        email,
        password: hash,
      });
    } else if (role === 'Siege') {
      newUser = await this.siegeService.create({
        ...body,
        email,
        password: hash,
      });
    } else if (role === 'Agency') {
      newUser = await this.agencyService.create({
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
