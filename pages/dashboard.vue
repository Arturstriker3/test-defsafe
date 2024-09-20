
<script setup  lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router';
const client = useSupabaseClient()
const router = useRouter()

const menuBtn = ref(false)

const toggleMenu = () => {
    menuBtn.value = !menuBtn.value
}

const logout = async () => {
    try {
        const { error } = await client.auth.signOut()
        if(error) throw error
        router.push('/login')
    } catch (error) {
        console.log(error)
    }
}

const navigateHome = () => {
    router.push('/')
}

</script>

<template>
    <div class="flex flex-col h-screen bg-stroke">
    <!-- Barra de navegación superior -->
        <div class="bg-white text-white shadow w-full p-2 flex items-center justify-between">
            <div class="flex items-center">
                <div class="flex items-center gap-2 px-4"> <!-- Mostrado en todos los dispositivos -->
                    <Icon name="ph:cat-fill" class="text-main text-5xl" />
                    <h2 class="text-main font-semibold">Cat Adoption Platform</h2>
                </div>
            </div>
            <!-- Ícono de Notificación y Perfil -->
            <div class="space-x-5">
                <div class="md:hidden flex items-center"> <!-- Se muestra solo en dispositivos pequeños -->
                    <button id="menuBtn" @click="toggleMenu">
                        <Icon name="material-symbols:menu" class="icon text-black text-4xl mr-2" />
                    </button>
                </div>
            </div>
        </div>

        <!-- Contenido principal -->
        <div class="flex-1 flex flex-wrap">
            <!-- Barra lateral de navegação -->
            <div
                class="p-2 bg-white w-full md:w-60 md:flex flex-col fixed md:relative"
                :class="{ 'hidden': !menuBtn, 'flex': menuBtn, 'md:flex': true }"
                id="sideNav"
                style="z-index: 9999; height: 100%; top: 0; left: 0;"
            >
                <nav class="flex-1">
                    <div class="flex flex-row items-center justify-between px-2" >
                        <span class="text-placeholder py-2.5 px-4 my-4">Main Menu</span>
                        <Icon v-show="menuBtn" @click="toggleMenu()" name="material-symbols:close" class="icon text-black text-4xl mr-2 cursor-pointer" />
                    </div>
                    <a class="menu-item block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                        <Icon name="solar:cat-bold" class="icon text-4xl mr-2" />
                        <span>Cat List</span>
                    </a>
                    <a @click.prevent="navigateHome" class="menu-item block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                        <Icon name="mdi:test-tube" class="icon text-4xl mr-2" />
                        <span>Test</span>
                    </a>
                </nav>
                <!-- Ítem de Cerrar Sesión -->
                <a
                    :class="{'mt-auto': !menuBtn, 'mt-0': menuBtn}"
                    class="block font-semibold hover:text-white hover:font-medium py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main"
                    href="#"
                    @click="logout()"
                >
                    <Icon name="material-symbols:logout" class="icon text-3xl mr-2" />
                    <span>Logout</span>
                </a>
                <!-- Señalador de ubicación -->
                <v-divider
                    :thickness="3"
                    class="border-opacity-25 max-w-96"
                ></v-divider>
                <!-- Copyright al final de la navegación lateral -->
                <p class="mb-1 py-3 text-left text-xs text-main">Copyright CAP@2024</p>
            </div>

            <!-- Área de contenido principal -->
            <div class="flex-1 p-4 w-full md:w-1/2 bg-[#fafbfc]">
                <!-- Campo de búsqueda -->
                <div class="relative max-w-md w-full">
                    <input class="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-placeholder border rounded-full focus:shadow-outline" type="search" placeholder="Search...">
                </div>
                <div class="mt-8">
                    <div class="flex flex-row items-center justify-between" >
                        <div class="flex flex-row items-center gap-4">
                            <div class="rounded-lg h-16 w-16 bg-[#f1f6fc] flex justify-center items-center">
                                <Icon name="solar:cat-bold" class="text-main text-4xl" />
                            </div>
                            <h2 class="text-black text-xl font-semibold">Cat List</h2>
                        </div>
                        <v-btn class="mt-2 bg-main" type="submit" color="main">
                            <p class="hidden md:block">New Cat</p>
                            <div class="block md:hidden">
                                <Icon name="mdi-add" class="text-white text-2xl" />
                            </div>
                        </v-btn>
                    </div>
                    <div class="my-10" >
                        <div class="md:hidden flex flex-row gap-2 items-center" >
                            <Icon name="material-symbols:help" class="text-stroke text-2xl" />
                            <span class="text-xs text-placeholder font-light">To edit a cat click the image</span>
                        </div>
                    </div>
                    <v-table class="w-full table-auto text-sm bg-white rounded-2xl">
                        <thead>
                            <tr class="text-sm leading-normal text-main">
                                <th class="py-2 px-4 text-base border-b border-grey-light">Image</th>
                                <th class="py-2 px-4 text-base border-b border-grey-light">Name</th>
                                <th class="py-2 px-4 text-base border-b border-grey-light">Description</th>
                                <th class="py-2 px-4 text-base border-b border-grey-light hidden md:table-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Añade más filas aquí como la anterior para cada autorización pendiente -->
                            <tr>
                                <td class="py-2 px-4 border-b border-grey-light">
                                    <div class="image-container">
                                        <img src="https://via.placeholder.com/48" alt="Cat Picture" class="rounded-full h-12 w-12">
                                        <div class="icon flex justify-center items-center h-12 w-12 rounded-full bg-[#f1f6fc] hover:bg-stroke cursor-pointer">
                                            <Icon name="mdi-pencil" class="text-main text-2xl" />
                                        </div>
                                    </div>
                                </td>
                                <td class="py-2 px-4 border-b border-grey-light">María Gómez</td>
                                <td class="py-2 px-4 border-b border-grey-light">Usuario</td>
                                <td class="py-2 px-4 border-b border-grey-light hidden md:table-cell">
                                    <div class="flex gap-2" >
                                        <div class="rounded-lg h-8 w-8 bg-[#f1f6fc] hover:bg-stroke flex justify-center items-center cursor-pointer">
                                            <Icon name="mdi-pencil" class="text-main text-2xl" />
                                        </div>
                                        <div class="rounded-lg h-8 w-8 bg-[#fff5f5] hover:bg-stroke flex justify-center items-center cursor-pointer">
                                            <Icon name="mdi-delete" class="text-danger text-2xl" />
                                        </div>
                                    </div>
                                </td>
                                <td class="border-y border-grey-light table-cell md:hidden">
                                    <div class="rounded-lg h-8 w-8 bg-[#fff5f5] hover:bg-stroke flex justify-center items-center cursor-pointer">
                                        <Icon name="mdi-delete" class="text-danger text-2xl" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-container {
    position: relative;
    display: inline-block;
}

.image-container img {
    display: block;
    transition: opacity 0.3s ease;
}

.image-container .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-container:hover .icon {
    opacity: 1;
}

.image-container:hover img {
    opacity: 0;
}
</style>