import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'users' })
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ nullable: false })
    @Field({ nullable: false })
    name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    dob: Date;

    @Column({ nullable: true })
    @Field({ nullable: true })
    address: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    description: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    @Field({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn()
    @Field({ nullable: true })
    updatedAt: Date;
}

@ObjectType()
export class UserSearchResult {
    @Field(type => Int)
    total: number;

    @Field(type => [User])
    list: User[];
}
