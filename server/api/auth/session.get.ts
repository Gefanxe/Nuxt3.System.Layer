import type { H3Event } from 'h3';
import type User from '../../models/User';
// import { Model, newEnforcer } from 'casbin';
// import { KnexAdapter } from 'casbin-knex-adapter';
import jwt from 'jsonwebtoken';
// import { conf } from '~/server/config/casbin';
// import { knexObj } from '~/server/config/knexfile';

function ensureAuth(event: H3Event, secret: string) {
  const tokenFromCookie = getCookie(event, 'auth_token') as string;

  if (!tokenFromCookie || tokenFromCookie === '') {
    // throw createError({ status: 403, message: 'token 為空' });
    return null;
  }

  try {
    return jwt.verify(tokenFromCookie, secret) as User;
  }
  catch (error) {
    console.error('Login failed. Here\'s the raw error:', error);
    // throw createError({ status: 403, message: (error as Error).message });
    return null;
  }
}

// async function getRule(account: string) {
//   const _model = new Model();
//   _model.loadModelFromText(conf);

//   const adapter = await KnexAdapter.newAdapter(knexObj, { tableName: 'casbin_rule' });

//   const e = await newEnforcer(_model, adapter);

//   return await e.getPermissionsForUser(account);
// }

export default eventHandler(async (event) => {
  const { secret } = useRuntimeConfig(event);

  const user = ensureAuth(event, secret);

  // console.log('session get', user);
  // 取權限
  // const rule = await getRule(user.account);

  return {
    user,
  };
});
