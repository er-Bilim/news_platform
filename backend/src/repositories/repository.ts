import { QueryResult, ResultSetHeader } from 'mysql2';
import mysqlDb from '../config/mysqlDb';
import fs from 'fs/promises';
import path from 'path';
import config from '../config';
export class Repository<T> {
  constructor(
    private tableName: string,
    private typeField: string | string[] | null,
  ) {}

  async getAll(): Promise<T[]> {
    const connection = await mysqlDb.getConnection();
    const type = Array.isArray(this.typeField)
      ? this.typeField.join(',')
      : this.typeField;

    const [result] = await connection.query(`SELECT ${type} FROM ??`, [
      this.tableName,
    ]);
    return result as T[];
  }

  async getById(id: string): Promise<T | { error: string }> {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      `SELECT ${this.typeField} FROM ?? WHERE ID = ?`,
      [this.tableName, id],
    );
    const items = result as T[];

    return items.length > 0
      ? items[0]
      : {
          error: 'Not found',
        };
  }

  async getByField(fieldName: string, value: string): Promise<T[]> {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      `SELECT ${this.typeField} FROM ?? WHERE ${fieldName} = ?`,
      [this.tableName, value],
    );

    return result as T[];
  }

  async deleteItem(id: string): Promise<boolean> {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(`DELETE FROM ?? WHERE ID = ?`, [
      this.tableName,
      id,
    ]);
    const resultHeader: QueryResult = result as ResultSetHeader;

    return resultHeader.affectedRows > 0;
  }

  async deleteImage(item: T & { image: string | null }): Promise<void> {
    if (item.image) {
      try {
        await fs.unlink(path.join(config.publicPath, item.image));
      } catch (error) {
        console.error(error);
      }
    }
  }
}
