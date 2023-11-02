export default defineNuxtRouteMiddleware(() => {
  const token = authCookie.getToken();
  if (token) return navigateTo("/dashboard", { replace: true });
});
