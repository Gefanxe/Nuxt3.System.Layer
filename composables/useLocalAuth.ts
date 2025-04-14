import type { AuthData, MayBe } from '~/types/interface.dto';

export function useLocalAuth() {
  const { myFetch } = useHttp();
  const router = useRouter();

  const data = useState<MayBe<AuthData>>('AuthData', () => null);

  const error = ref();

  async function signIn(credentials: { Account: string, Password: string }): Promise<void> {
    const res = await myFetch('/api/auth/login', { method: 'POST', body: credentials });
    if (res.code !== '') {
      error.value = res;
    } else {
      error.value = null;
      data.value = await getSession();
    }
  }

  const signOut = async ({ callbackUrl }: { callbackUrl?: string } = {}) => {
    const res = await myFetch('/api/auth/logout', { method: 'POST' });
    if (res.result) {
      clearNuxtState();
      router.push({ path: callbackUrl || '/login' });
    }
  };

  async function getSession() {
    try {
      // const res = await myFetch('/api/auth/session');
      const res = await $fetch('/api/auth/session');
      error.value = null;
      return res.user;
    }
    catch (err) {
      error.value = err;
      return null;
    }
  }

  async function getUserData() {
    if (!data.value) {
      data.value = await getSession();
      console.log('getUserData: ', data.value);
    }
  }

  function setUserData(userData: AuthData) {
    data.value = userData;
  }

  return {
    getUserData,
    setUserData,
    getSession,
    signIn,
    signOut,
    data,
    error
  };
}
