import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersResolver } from './user.resolver';
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UsersResolver],
})
export class UserModule {}
