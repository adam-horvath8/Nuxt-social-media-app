export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  console.log("midle " + authStore.isAuth);
  console.log("midle " + authStore.currentUser);
  // If the user is not authenticated and trying to access a protected route
  if (!authStore.isAuth && to.path !== "/") {
    // Redirect them to the login page

    return navigateTo("/");
  }

  if (authStore.isAuth && to.path === "/") {
    // Redirect them to the home page (or some other page)
    return navigateTo("/home");
  }

  // In other cases, allow the navigation to proceed
});
