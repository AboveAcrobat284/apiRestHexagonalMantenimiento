// src/adapters/repositories/mysqlAdminRepository.ts
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';
import Admin from '../../domain/models/admin';
import connectMySQL from '../../infrastructure/database/mysqlConnection';
import { RowDataPacket, OkPacket, FieldPacket } from 'mysql2';

class MySQLAdminRepository implements IAdminRepository {
    async save(admin: Admin): Promise<Admin> {
        const connection = await connectMySQL();
        const [result]: [OkPacket, FieldPacket[]] = await connection.execute(
            'INSERT INTO admins (email, password) VALUES (?, ?)',
            [admin.email, admin.password]
        );
        admin.id = result.insertId.toString();
        return admin;
    }

    async findById(id: string): Promise<Admin | null> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
            'SELECT * FROM admins WHERE id = ?',
            [id]
        );
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Admin(row.id.toString(), row.email, row.password);
    }

    async findAll(): Promise<Admin[]> {
        const connection = await connectMySQL();
        const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute('SELECT * FROM admins');
        return rows.map(row => new Admin(row.id.toString(), row.email, row.password));
    }

    async update(admin: Admin): Promise<Admin> {
        const connection = await connectMySQL();
        await connection.execute(
            'UPDATE admins SET email = ?, password = ? WHERE id = ?',
            [admin.email, admin.password, admin.id]
        );
        return admin;
    }

    async deleteById(id: string): Promise<void> {
        const connection = await connectMySQL();
        await connection.execute('DELETE FROM admins WHERE id = ?', [id]);
    }
}

export default MySQLAdminRepository;
