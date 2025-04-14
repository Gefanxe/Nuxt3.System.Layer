/* eslint-disable unused-imports/no-unused-vars */
import type { UseFetchOptions } from 'nuxt/app';
import type { FetchError, FetchRequest, FetchResponse, ResolvedFetchOptions } from 'ofetch';

// useHttp 封裝
export function useHttp() {
  const myFetch = $fetch.create({
    onRequest({ options }: { options: ResolvedFetchOptions }) {

    },
    onRequestError({ error }) {
      console.error('error: 請確認網路連線是否正常 ;', error);
    },
    onResponse({ request, response, options }) {
      // console.log('onResponse request: ', request);
      // console.log('onResponse response: ', response);
      // console.log('onResponse options: ', options);
    },
    onResponseError({ request, response }: { request: FetchRequest, response: FetchResponse<any> }) {
      const cases = {
        302: '接口重定向了！',
        400: '參數不正確！',
        401: '尚未登入，或者登入已超時，請重新登入！',
        403: '您沒有權限操作！',
        404: `路徑不存在: ${request}`,
        408: '請求超時！',
        409: '系統已存在相同數據！',
        500: '伺服器錯誤！',
        501: '服務未實現！',
        502: '網路錯誤！',
        503: '服務無法使用！',
        504: '閘道逾時！',
        505: 'HTTP版本不受支持！',
      } as { [key: number]: string };

      const msg = cases[response.status] || '異常問題，請聯繫管理員！';

      console.error('onResponseError: ', msg);
    },
  });
  return {
    myFetch,
    get: <T>(url: string, params?: any) => myFetch<T>(url, { method: 'GET', params }),
    post: <T>(url: string, body?: any) => myFetch<T>(url, { method: 'POST', body }),
    put: <T>(url: string, body?: any) => myFetch<T>(url, { method: 'PUT', body }),
    delete: <T>(url: string, body?: any) => myFetch<T>(url, { method: 'delete', body }),
  };
}

async function Delay(seconds: number) {
  return new Promise((resolve) => {
    const _id = setTimeout(() => {
      resolve('');
      clearTimeout(_id);
    }, seconds * 1000);
  });
}
