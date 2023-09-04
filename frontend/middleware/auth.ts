import { useUserStore } from "~/store/useUserStore";

type User = {};

export default defineNuxtRouteMiddleware(async () => {
  const store = useUserStore();

  try {
    const response = await fetch("/me", {
      method: "GET",
    });

    store.storeUser(response.data);
  } catch (e) {
    store.logout();
    authCookie.deleteToken();

    return navigateTo("/auth/login", { replace: true });
  }
});
