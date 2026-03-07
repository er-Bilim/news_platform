import { QueryResult, ResultSetHeader } from 'mysql2';
import mysqlDb from '../config/mysqlDb';
import { error } from 'node:console';
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

  async deleteItem(id: string): Promise<boolean> {
    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      `DELETE FROM ?? WHERE ID = ?`,
      [this.tableName, id],
    );
    const resultHeader: QueryResult = result as ResultSetHeader;

    return resultHeader.affectedRows > 0;
  }
}
