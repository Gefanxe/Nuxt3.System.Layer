import { Model } from 'objection';
import { knexObj } from '../config/knexfile';

Model.knex(knexObj);

export default class BaseModel extends Model {
  // 可以在這裡添加共用的方法和屬性
}
