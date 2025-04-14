import { checkJwtValid } from '../utils/tools';

export default eventHandler(async (event) => {
  if (event.method === 'GET')
    return; // GET 請求不處理 auth 驗證

  const withoutAuthList = [
    '/api/test',
    '/api/auth',
  ];

  const noAuth = withoutAuthList.some((url) => {
    return event.path.includes(url);
  });

  if (noAuth)
    return;

  const result = await checkJwtValid(event);

  const cases: { [key: string]: () => void } = {
    E1: () => { throw createError({ status: 403, message: '無 token!' }); },
    E2: () => { throw createError({ status: 403, message: 'token 過期' }); },
  };

  if (result !== '') {
    cases[result]();
  }
});
