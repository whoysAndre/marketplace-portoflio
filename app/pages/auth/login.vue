<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'


const isPosting = ref(false);
const toast = useToast()
const cookieLoginEmail = useCookie<string | null>('login_email', {
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30, // 30 días
});

const { login } = useAuthentication();

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'Ingresa tu correo electrónico',
    required: true,
    defaultValue: cookieLoginEmail.value || '',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    required: true,
  },
  {
    name: 'remember',
    label: 'Recuerdame',
    type: 'checkbox',
    defaultValue: Boolean(cookieLoginEmail.value),
  }
]



const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'La contraseña tiene que ser mayor de 8 caracteres'),
  remember: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {

  const { email, password, remember } = payload.data;
  isPosting.value = true;


  if (remember) {
    cookieLoginEmail.value = email;
  } else {
    cookieLoginEmail.value = null;
  }

  const isSuccessful = await login(email, password);

  if (!isSuccessful) {
    toast.add({
      title: 'Login failed',
      description: 'Credenciales no son válidas',
    });
    isPosting.value = false;
  }

}

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm :schema="schema" title="Iniciar sesión"
        description="Ingresa tus credenciales para acceder a tu cuenta." icon="i-lucide-user" :fields="fields"
         :loading="isPosting" :disabled="isPosting" @submit="onSubmit" :ui="{
          leadingIcon: 'text-5xl',
        }" />

      <NuxtLink to="/auth/register" class="text-primary text-sm text-center">
        ¿No tienes cuenta? Registrate
      </NuxtLink>
    </UPageCard>

  </div>
</template>
