import BaseModel from './BaseModel';
import Role from './Role';

export default class User extends BaseModel {
  id!: number;
  role_id!: number;
  account!: string;
  password!: string;
  salt!: string;
  name!: string;
  email!: string;
  created_at!: string;
  updated_at!: string;

  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id'; // 定義主鍵
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['account', 'password', 'email'],
      properties: {
        id: { type: 'integer' },
        role_id: { type: 'integer' },
        account: { type: 'string', minLength: 1, maxLength: 20, uniqueItems: true },
        password: { type: 'string', minLength: 64, maxLength: 64 },
        salt: { type: 'string', minLength: 8, maxLength: 8 },
        name: { type: 'string', minLength: 1, maxLength: 40 },
        email: { type: 'string', minLength: 1, maxLength: 255, uniqueItems: true },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
      },
    };
  }

  static get relationMappings() {
    return {
      role: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
    };
  }
}
