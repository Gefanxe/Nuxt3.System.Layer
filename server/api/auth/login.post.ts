import jwt from 'jsonwebtoken';
import User from '../../models/User';
import { hashString } from '../../utils/tools';

export default eventHandler(async (event) => {
  const { Account, Password } = await readBody(event);
  const { secret } = useRuntimeConfig(event);

  if (!secret || secret === '' || secret.length < 32) {
    // throw createError({ status: 403, message: 'secret未設置或長度小於32', data: { code: 'E0' } });
    return { code: 'E0' };
  }

  // console.log('Account', Account);
  // console.log('Password', Password);

  const user = await User.query().findOne({
    account: Account,
  }) as User;

  // 用戶不存在
  if (!user) {
    return { code: 'E1' };
  }

  const hashInputPwd = hashString(Password, user.salt);

  // 密碼不正確
  if (user.password !== hashInputPwd) {
    // throw createError({ status: 403, message: '密碼不正確', data: { code: 'E2' } });
    return { code: 'E2' };
  }

  const expiresIn = 60 * 60 * 8; // 8小時

  const { id, account, name, email } = user.$toJson();
  const signUser = { id, account, name, email };

  const accessToken = jwt.sign(signUser, secret, { expiresIn });

  setCookie(event, 'auth_token', accessToken, {
    httpOnly: true,
    path: '/',
    maxAge: expiresIn,
    secure: false, // process.env.NODE_ENV === 'production', // 生产环境使用 secure
    sameSite: 'strict',
  });

  return { code: '' };
});
