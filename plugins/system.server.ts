import { ensureAuthFromCookie } from "~/server/utils/tools";

export default defineNuxtPlugin({
  name: 'test-plugin',
  async setup (nuxtApp) {
    const { setUserData } = useLocalAuth();

    const cookie = useCookie('auth_token');
    const user = ensureAuthFromCookie(cookie.value || '', nuxtApp.$config.secret);
    if (user) {
      setUserData(user);
    }
  }
})