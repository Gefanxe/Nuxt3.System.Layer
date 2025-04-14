export default eventHandler((event) => {
  deleteCookie(event, 'auth_token');
  return { result: true };
});
