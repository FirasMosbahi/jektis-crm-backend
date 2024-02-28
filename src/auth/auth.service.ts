import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../schemas/auth.schema';
import { LoginDto, SignUpDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService extends CommonRepository<Auth> {
  protected readonly modelName: string = Auth.name;

  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super(authModel);
  }

  private async generatePasswordAndHash(password: string): Promise<string> {
    const passwordSalt = await bcrypt.genSalt(
      this.configService.get('BCRYPT_ROUNDS'),
    );
    return await bcrypt.hash(password, passwordSalt);
  }

  private generateAccessToken(
    userId: Types.ObjectId,
    isAdmin: boolean,
  ): string {
    return this.jwtService.sign(
      { userId, isAdmin },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      },
    );
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: any }> {
    const user: Auth = await this.findOne({ email: loginDto.email });
    if (!user) {
      throw new NotFoundException(`No agent with this email`);
    }
    const isValid: boolean = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (isValid) {
      const token = this.generateAccessToken(user._id, user.isAdmin);
      return {
        token,
        user,
      };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async signup(signUpDto: SignUpDto): Promise<Auth> {
    const user: Auth = await this.findOne({
      email: signUpDto.email,
    });
    if (user) {
      throw new ConflictException('Email already used');
    }
    const hashedPassword: string = await this.generatePasswordAndHash(
      signUpDto.password,
    );
    return await this.create({
      email: signUpDto.email,
      password: hashedPassword,
      name: signUpDto.name,
      isAdmin: signUpDto.isAdmin,
    });
  }
}
