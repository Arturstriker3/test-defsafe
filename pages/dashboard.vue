
<script setup >

import { ref } from 'vue'

const menuBtn = ref(false)

const toggleMenu = () => {
    menuBtn.value = !menuBtn.value
    console.log("click")
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
            <!-- Barra lateral de navegación (oculta en dispositivos pequeños) -->
            <div class="p-2 bg-white w-full md:w-60 hidden flex-col md:flex" id="sideNav">
                <nav>
                    <span class="text-placeholder py-2.5 px-4 my-4">Main Menu</span>
                    <a class="menu-item block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                        <Icon name="solar:cat-bold" class="icon text-4xl mr-2" />
                        <span>Cat List</span>
                    </a>
                    <a class="menu-item block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                        <Icon name="mdi:test-tube" class="icon text-4xl mr-2" />
                        <span>Test</span>
                    </a>
                </nav>

                <!-- Ítem de Cerrar Sesión -->
                <a class="block font-semibold hover:text-white hover:font-medium py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main mt-auto" href="#">
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
                <div class="mt-8 p-4">
                    <div class="flex flex-row items-center gap-4" >
                        <div class="rounded-lg h-16 w-16 bg-[#f1f6fc] flex justify-center items-center">
                            <Icon name="solar:cat-bold" class="text-main text-4xl" />
                        </div>
                        <h2 class="text-black text-xl font-semibold">Cat List</h2>
                    </div>
                    <div class="my-10" ></div>
                    <table class="w-full table-auto text-sm bg-white rounded-2xl">
                        <thead>
                            <tr class="text-sm leading-normal">
                                <th class="py-2 px-4 bg-grey-lightest font-bold text-sm text-grey-light border-b border-grey-light">Image</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold text-sm text-grey-light border-b border-grey-light">Name</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold text-sm text-grey-light border-b border-grey-light">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-grey-lighter">
                                <td class="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" class="rounded-full h-10 w-10"></td>
                                <td class="py-2 px-4 border-b border-grey-light">Juan Pérez</td>
                                <td class="py-2 px-4 border-b border-grey-light">Comercio</td>
                            </tr>
                            <!-- Añade más filas aquí como la anterior para cada autorización pendiente -->
                            <tr class="hover:bg-grey-lighter">
                                <td class="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" class="rounded-full h-10 w-10"></td>
                                <td class="py-2 px-4 border-b border-grey-light">María Gómez</td>
                                <td class="py-2 px-4 border-b border-grey-light">Usuario</td>
                            </tr>
                            <tr class="hover:bg-grey-lighter">
                                <td class="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" class="rounded-full h-10 w-10"></td>
                                <td class="py-2 px-4 border-b border-grey-light">Carlos López</td>
                                <td class="py-2 px-4 border-b border-grey-light">Usuario</td>
                            </tr>
                            <tr class="hover:bg-grey-lighter">
                                <td class="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" class="rounded-full h-10 w-10"></td>
                                <td class="py-2 px-4 border-b border-grey-light">Laura Torres</td>
                                <td class="py-2 px-4 border-b border-grey-light">Comercio</td>
                            </tr>
                            <tr class="hover:bg-grey-lighter">
                                <td class="py-2 px-4 border-b border-grey-light"><img src="https://via.placeholder.com/40" alt="Foto Perfil" class="rounded-full h-10 w-10"></td>
                                <td class="py-2 px-4 border-b border-grey-light">Ana Ramírez</td>
                                <td class="py-2 px-4 border-b border-grey-light">Usuario</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Botón "Ver más" para la tabla de Autorizaciones Pendientes -->
                    <div class="text-right mt-4">
                        <button class="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>