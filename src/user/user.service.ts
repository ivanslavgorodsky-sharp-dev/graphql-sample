import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { User, UserSearchResult } from './user.entity';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { InjectRepository } from '@nestjs/typeorm';

export interface TUserCreate {
    name: string;
    dob?: Date | null;
    address?: string;
    description?: string;
    imageUrl?: string;
}
export interface TUserUpdate {
    name?: string;
    dob?: Date;
    address?: string;
    description?: string;
    imageUrl?: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) readonly userRepository: Repository<User>,
    ) {
    }

    async create(data: TUserCreate): Promise<User> {
        const user = this.userRepository.create(data);
        return this.userRepository.save(user);
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOne(id);
    }

    async findAll(searchText: string = '', take: number = 10, skip: number = 0): Promise<UserSearchResult> {

        const query = searchText ? {
            where: [
                {name: ILike(`%${searchText}%`)},
                // {address: ILike(`%${searchText}%`)},
                // {description: ILike(`%${searchText}%`)}
            ],
        } : {};

        const getQuery = {
            ...query,
            take,
            skip,
            order: {
                name: 'ASC',
            },
        };
        const [total, list] = await Promise.all([this.userRepository.count(query), this.userRepository.find(getQuery as FindManyOptions)]);
        return {
            total, list,
        } as UserSearchResult;
    }

    async updateById(id: number, data: TUserUpdate): Promise<User> {
        await this.userRepository.update({id}, data);
        return this.findById(id);
    }

    async deleteById(id: number): Promise<boolean> {
        return !!(await this.userRepository.delete({id}));
    }
}
