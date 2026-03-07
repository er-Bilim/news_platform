import type { Response } from 'express';
import { ResultSetHeader } from 'mysql2';

interface IValidateData {
  [key: string]: any;
}

const validateDb = {
  validateDataId(result: ResultSetHeader, res: Response, entityName: string) {
    if (result.affectedRows === 0) {
      res.status(404).json({ error: `${entityName} not found` });
      return false;
    }

    return true;
  },

  validateCreateData(reqData: IValidateData, keys: string[]): boolean {
    if (typeof reqData !== 'object' || reqData === null) {
      return false;
    }

    for (const key of keys) {
      if (!Object.hasOwn(reqData, key)) {
        return false;
      }

      const value: string = reqData[key];
      if (typeof value !== 'string' || value.trim().length === 0) {
        return false;
      }
    }
    return true;
  },
};

export default validateDb;