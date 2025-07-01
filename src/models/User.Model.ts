import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { ObjectId, type IUserDoc, type IUserModel } from '@schemas';
import { logger } from '../utils';

const UserSchema = new Schema<IUserDoc>(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        countryCode: {
            type: String,
            trim: true,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        id: false,
        timestamps: true,
        toJSON: {
            getters: true,
        },
        toObject: {
            getters: true,
        },
    }
);

UserSchema.pre<IUserDoc>('save', async function (next) {
    try {
        if (this.isModified('firstName') || this.isModified('lastName')) {
            const getLastName = (lastName: string | undefined): string => (lastName ? ` ${lastName}` : '');
            this.fullName = `${this.firstName}${getLastName(this.lastName)}`;
        }

        if (this.password && this.isModified('password')) {
            const saltRounds = Number(process.env.BCRYPT_ITERATIONS || 10);
            this.password = await hash(this.password, saltRounds);
        }

        next();
    } catch (e) {
        console.error('User model error in pre-save hook', e);
        next();
    }
});

UserSchema.method('comparePassword', async function comparePassword(password: string) {
    try {
        if (!this.password) {
            return false;
        }
        return await compare(password, this.password);
    } catch (e) {
        logger.error('Error while comparing user password', e);
        return false;
    }
});

export const User = model<IUserDoc, IUserModel>('User', UserSchema, 'users');
