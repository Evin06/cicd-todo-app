<script setup lang="ts">
import * as Yup from 'yup';
import { Form } from 'vee-validate';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useUser } from '@/shared/stores';
import type { LoginForm } from '@/shared/interfaces';
import FormInput from '@/components/forms/FormInput.vue';

const router = useRouter();
const userStore = useUser();
const loading = ref(false);
const errorMsg = ref('');

// form validation rules
const schema = Yup.object().shape({
  email: Yup.string().email('Format email incorrect').required('Vous devez renseigner ce champ'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit faire au moins 8 caractères')
    .required('Vous devez renseigner ce champ'),
  confirmation: Yup.string()
    .required('Vous devez renseigner ce champ')
    .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas')
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = async (formValues: Record<string, any>) => {
  loading.value = true;
  delete formValues.confirmation;
  try {
    await userStore.createUser(formValues as LoginForm).then(() => {
      errorMsg.value = '';
      loading.value = false;
      router.push('/login');
    });
  } catch (e) {
    errorMsg.value = e as string;
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
      >
        Créez votre compte
      </h1>
      <p v-if="errorMsg">
        <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
          <span class="inline w-3 h-3 me-3 bg-red-500 rounded-full"></span>
          {{ errorMsg }}</span
        >
      </p>
      <Form @submit="onSubmit" :validation-schema="schema" class="space-y-4 md:space-y-6">
        <div>
          <FormInput name="email" type="email" label="Votre email" />
        </div>
        <div>
          <FormInput name="password" type="password" label="Mot de passe" />
        </div>
        <div>
          <FormInput name="confirmation" type="password" label="Confirmer votre mot de passe" />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Créer un compte
        </button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          Avez-vous déjà un compte?
          <a
            href="/login"
            class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >Connectez-vous</a
          >
        </p>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
