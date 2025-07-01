import { Request, Response } from 'express';
import { IUser, Pagination } from '@schemas';
import ExcelJS from 'exceljs';
import { GetUsers } from '@types';
import { exportPdf, jsonToCsvBuffer } from '@utils';
import UserDao from '../../dao/UserDao';

class UserService {
    async create(req: Request, res: Response) {
        const { user } = req.body;

        const data: IUser = { ...user };

        if (!user) return res.badRequest(null, 'User data is required');

        const userData = await UserDao.create(data);

        return res.success(userData, 'User created successfully');
    }

    async getAll(req: Request, res: Response) {
        const user = req.user;
        const { search, page, perPage, sort } = req.query as unknown as GetUsers & Pagination;

        const [count, users] = await Promise.all([
            UserDao.countAll({
                search,
                id: user._id,
            }),
            UserDao.getAll({
                page,
                perPage,
                search,
                id: user._id,
                sort,
            }),
        ]);

        return res.success(
            {
                count,
                users,
            },
            'Users fetched successfully'
        );
    }

    async exportSampleExcel(req: Request, res: Response) {
        const user = req.user;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'First Name', key: 'firstName', width: 20 },
            { header: 'Last Name', key: 'lastName', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Country Code', key: 'countryCode', width: 15 },
            { header: 'Phone', key: 'phone', width: 20 },
        ];

        worksheet.addRow({
            firstName: 'vaghela',
            lastName: 'digvijaysinh',
            email: 'vagheladigvijaysinh@yopmail.com',
            countryCode: '+91',
            phone: '1234567890',
        });

        for (let i = 0; i < 100; i++) {
            worksheet.addRow({
                otherRequirements: '',
            });
        }

        const buffer = await workbook.xlsx.writeBuffer();
        res.setHeader('Content-Disposition', 'attachment; filename=sample_users.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(buffer);
    }

    async exportCsv(req: Request, res: Response) {
        const user = req.user;
        const { search, page, perPage, sort } = req.query as unknown as GetUsers & Pagination;

        const users = await UserDao.getAll({
            page,
            perPage,
            search,
            id: user._id,
            sort,
        });

        if (!users) {
            return res.notFound(null, 'Users not found');
        }

        const filteredUsers = users.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
            countryCode: user.countryCode,
            phone: user.phone,
        }));

        const csv = jsonToCsvBuffer(filteredUsers, {
            excelBOM: true,
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('users.csv');
        return res.send(csv);
    }

    async exportPdf(req: Request, res: Response) {
        const user = req.user;
        const { search, page, perPage, sort } = req.query as unknown as GetUsers & Pagination;

        const users = await UserDao.getAll({
            page,
            perPage,
            search,
            id: user._id,
            sort,
        });

        if (!users) {
            return res.notFound(null, 'Users not found');
        }

        const pdfBuffer = await exportPdf('export-users.ejs', users);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="users.pdf"');
        return res.send(pdfBuffer);
    }
}

export default new UserService();
