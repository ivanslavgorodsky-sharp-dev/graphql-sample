import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { GqlModuleAsyncOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { UserService } from './user.service';
import { UsersResolver } from './user.resolver';
import { User } from './user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        GraphQLModule.forRootAsync({
            useFactory: () => {
                return {
                    context: ({req}) => ({req}),
                    playground: true, // Allow playground in production
                    introspection: true, // Allow introspection in production
                    autoSchemaFile: true,
                };
            },
        } as GqlModuleAsyncOptions),
    ],
    providers: [
        UserService,
        UsersResolver,
    ],
})
export class UserModule {}
