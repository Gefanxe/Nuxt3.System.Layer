import type { H3Event } from 'h3';
import type { VerifyErrors } from 'jsonwebtoken';
import type User from '../models/User';
import * as crypto from 'node:crypto';
import * as jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

export function hashPassword(pwd: string): { salt: string, hashPwd: string } {
  const _salt = nanoid(8);
  const _hashPwd = hashString(pwd, _salt);
  return {
    salt: _salt,
    hashPwd: _hashPwd,
  };
}

export function hashString(str: string, salt: string): string {
  const hmac = crypto.createHmac('sha256', salt);
  const hashstr = hmac.update(str).digest('hex');
  return hashstr;
}

export function checkJwtValid(event: H3Event): Promise<string> {
  return new Promise((resolve) => {
    const { secret } = useRuntimeConfig(event);

    // const authHeaderValue = getRequestHeader(event, 'authorization') as string;

    const tokenFromCookie = getCookie(event, 'auth.token') as string;

    // console.log('tokenFromCookie: ', tokenFromCookie);

    if (typeof tokenFromCookie === 'undefined') {
      resolve('E1');
    }

    jwt.verify(tokenFromCookie, secret, (error: VerifyErrors | null) => {
      if (error) {
        resolve('E2');
      }
      else {
        resolve('');
      }
    });
  });
}

export function ensureAuthFromCookie(cookie: string, secret: string) {
  if (cookie === '') {
    // throw createError({ status: 403, message: 'token 為空' });
    return null;
  }

  try {
    return jwt.verify(cookie, secret) as User;
  }
  catch (error) {
    console.error('error:', error);
    return null;
  }
}
