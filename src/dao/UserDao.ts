import mongoose from 'mongoose';
import { User } from '@models';
import { IUser, IUserDoc, Pagination, UserId } from '@schemas';
import { GetUserByEmailAndPhone, GetUsers } from '@types';
import { getSearchRegex } from '@utils';

type FilterQueryIUser = mongoose.FilterQuery<IUser>;

class UserDao {
    async create(user: IUser): Promise<IUserDoc> {
        return User.create(user);
    }

    async getUserByEmailOrPhone({ email, countryCode, phone }: GetUserByEmailAndPhone): Promise<IUserDoc | null> {
        const matchCriteria: FilterQueryIUser = {};

        if (email) {
            matchCriteria.email = email;
        }

        if (countryCode && phone) {
            matchCriteria.countryCode = countryCode;
            matchCriteria.phone = phone;
        }

        return User.findOne(matchCriteria);
    }

    async getAll({ search, page, perPage, sort = '{"_id": -1}' }: GetUsers & Pagination): Promise<IUserDoc[]> {
        const matchCriteria: FilterQueryIUser = {};

        if (search) {
            const searchRegex = getSearchRegex(search);
            matchCriteria.$or = [
                { fullName: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
            ];
        }

        return User.find(matchCriteria)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort(JSON.parse(sort));
    }

    async countAll({ search, id }: GetUsers): Promise<number> {
        const matchCriteria: FilterQueryIUser = {};

        if (search) {
            const searchRegex = getSearchRegex(search);
            matchCriteria.$or = [
                { fullName: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
            ];
        }

        return User.countDocuments(matchCriteria);
    }

    async getUserById({ user }: UserId): Promise<IUserDoc | null> {
        return User.findOne({
            _id: user,
        });
    }
}

export default new UserDao();
