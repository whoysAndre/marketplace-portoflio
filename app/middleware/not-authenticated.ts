export default defineNuxtRouteMiddleware((to, from) => {

  const { isLoggedIn } = useAuthentication();

  if (to.path.startsWith('/auth/login') && isLoggedIn.value) {
    return navigateTo('/');
  }

  if (to.path.startsWith('/auth/register') && isLoggedIn.value) {
    return navigateTo('/');
  }

})