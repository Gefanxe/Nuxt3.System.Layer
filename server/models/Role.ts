import BaseModel from './BaseModel';

export default class Role extends BaseModel {
  id!: number;
  role!: string;
  name!: string;
  created_at!: string;
  updated_at!: string;

  static get tableName() {
    return 'roles';
  }

  static get idColumn() {
    return 'id'; // 定義主鍵
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['role', 'name'],
      properties: {
        id: { type: 'integer' },
        role: { type: 'string', minLength: 1, maxLength: 60 },
        name: { type: 'string', minLength: 1, maxLength: 40 },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }
}
