type User = {};

type Task = {};

export const useUser = () => {
  const router = useRouter();
  const tasks = ref<Array<Task> | null>(null);
  const user = ref<User | null>(null);
  const errors = ref({});

  return {};
};
