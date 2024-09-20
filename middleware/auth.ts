export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    if (!user.value && to.path !== '/login') {
        return '/login';
    }

    if (user.value && to.path === '/login') {
        return '/dashboard';
    }
});