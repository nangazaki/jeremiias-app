<script setup lang="ts">
const form = reactive({
  email: "",
  password: "",
});
const res = ref("");

async function submit(e) {
  e.preventDefault();

  const data = await $fetch("http://localhost:6000/api/auth/login", {
    method: "post",
    body: {
      email: form.email,
      password: form.password,
    },
  });

  console.log(data.value);
}
</script>

<template>
  <div>
    <form
      class="w-full h-screen flex flex-col justify-center items-center"
      @submit="submit"
    >
      <input v-model="form.email" type="text" class="border" />
      <input v-model="form.password" type="password" class="border" />
      <button class="bg-blue-300 px-6 py-3">Logar</button>
      <pre>
        {{ res }}
      </pre>
    </form>
  </div>
</template>
