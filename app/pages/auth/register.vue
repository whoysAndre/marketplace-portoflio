<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

const toast = useToast()
const { register } = useAuthentication();

const isPosting = ref(false);


const fields: AuthFormField[] = [
  {
    name: 'firstname',
    type: 'text',
    label: 'Nombre',
    placeholder: 'Nombre completo del usuario',
    required: true,
  },
  {
    name: 'lastname',
    type: 'text',
    label: 'Apellidos',
    placeholder: 'Apellidos completo del usuario',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true,
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    required: true,
  },

]



const schema = z.object({
  email: z
    .string()
    .toLowerCase()
    .trim()
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Email is not valid',
    }),
  password: z.string('Password is required').min(8, 'La contraseña tiene que ser mayor de 8 caracteres'),
  firstname: z.string('Firstname is required').min(1, 'El nombre tiene que ser mayor de 1 caracteres'),
  lastname: z.string('Lastname is required').min(1, 'El apellido tiene que ser mayor de 1 caracteres'),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {

  const { email, password, lastname, firstname } = payload.data;
  console.log(payload.data);

  isPosting.value = true;

  const isSuccessful = await register(firstname, lastname, email, password);

  if (!isSuccessful) {
    toast.add({
      title: 'Register Failed',
      description: 'Error',
    });
    isPosting.value = false;
  }


  toast.add({
    title: 'Registro Exitoso',
    description: 'Usuario creado correctamente',
  });
  isPosting.value = false;


  navigateTo('/auth/login');

}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" title="Crear una cuenta" :loading="isPosting"
        description="Ingresa tu informacion para crear tu cuenta." icon="i-lucide-user" :fields="fields"
        @submit="onSubmit" :ui="{
          leadingIcon: 'text-5xl',
        }" />

      <NuxtLink to="/auth/login" class="text-primary text-sm text-center">
        ¿Ya tienes cuenta?
      </NuxtLink>
    </UPageCard>

  </div>
</template>
