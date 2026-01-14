export default defineNuxtRouteMiddleware((to, from) => {

  const { isLoggedIn } = useAuthentication();

  if (!isLoggedIn.value) {
    return navigateTo('/auth/login');
  }
})