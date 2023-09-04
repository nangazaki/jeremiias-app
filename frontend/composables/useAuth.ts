import { useUserStore } from "~/store/useUserStore";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

type AccessToken = {
  access_token: string;
};

export const useAuth = () => {
  const router = useRouter();
  const errors = ref({});
  const store = useUserStore();

  async function login(payload: LoginPayload) {
    try {
      errors.value = {};
      const response = await fetch("/login", {
        method: "POST",
        body: payload,
      });

      authCookie.setToken(response.data.access_token);

      await router.push("/app");
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = errorFormat(error.response._data.errors);
      } else if (error.response?.status === 404) {
        errors.value = { general: error.response._data.message };
      }
    }
  }

  async function register(payload: RegisterPayload) {
    try {
      errors.value = {};
      const response = await fetch("/register", {
        method: "POST",
        body: payload,
      });

      authCookie.setToken(response.access_token);

      await router.push("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = errorFormat(error.response._data.errors);
      } else if (error.response.status === 401) {
        errors.value = { general: error.response._data.message };
      }
    }
  }

  async function logout() {
    try {
      await fetch("/logout", {
        method: "POST",
      });

      store.logout();
      authCookie.deleteToken();
      await router.push("/auth/login");
    } catch (e) {
      console.log("Internal error", e);
    }
  }

  return {
    errors,
    login,
    register,
    logout,
  };
};
