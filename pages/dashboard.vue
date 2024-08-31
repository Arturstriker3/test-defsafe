<template>
    <div class="flex flex-col h-screen bg-gray-100">

<!-- Barra de navegación superior -->
<div class="bg-white text-white shadow w-full p-2 flex items-center justify-between">
    <div class="flex items-center">
        <div class="flex items-center"> <!-- Mostrado en todos los dispositivos -->
            <img src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png" alt="Logo" class="w-28 h-18 mr-2">
            <h2 class="font-bold text-xl">Nombre de la Aplicación</h2>
        </div>
        <div class="md:hidden flex items-center"> <!-- Se muestra solo en dispositivos pequeños -->
            <button id="menuBtn">
                <i class="fas fa-bars text-gray-500 text-lg"></i> <!-- Ícono de menú -->
            </button>
        </div>
    </div>

    <!-- Ícono de Notificación y Perfil -->
    <div class="space-x-5">
        <button>
            <i class="fas fa-bell text-gray-500 text-lg"></i>
        </button>
        <!-- Botón de Perfil -->
        <button>
            <i class="fas fa-user text-gray-500 text-lg"></i>
        </button>
    </div>
</div>

<!-- Contenido principal -->
<div class="flex-1 flex flex-wrap">
    <!-- Barra lateral de navegación (oculta en dispositivos pequeños) -->
    <div class="p-2 bg-white w-full md:w-60 flex flex-col md:flex hidden" id="sideNav">
        <nav>
            <span class="text-black py-2.5 px-4 my-4" >Main Menu</span>
            <a class="block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                <i class="fas fa-home mr-2"></i>Inicio
            </a>
            <a class="block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                <i class="fas fa-file-alt mr-2"></i>Autorizaciones
            </a>
            <a class="block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                <i class="fas fa-users mr-2"></i>Usuarios
            </a>
            <a class="block hover:text-white font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                <i class="fas fa-store mr-2"></i>Comercios
            </a>
            <a class="block hover:text-white !important font-medium py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-gradient-to-r hover:from-main hover:to-main" href="#">
                <i class="fas fa-exchange-alt mr-2"></i>Transacciones
            </a>
        </nav>

        <!-- Ítem de Cerrar Sesión -->
        <a class="block text-black font-semibold py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-placeholder hover:to-placeholder mt-auto" href="#">
            <i class="fas fa-sign-out-alt mr-2"></i>Cerrar sesión
        </a>

        <!-- Señalador de ubicación -->
        <v-divider
            :thickness="3"
            class="border-opacity-25 max-w-96"
        ></v-divider>

        <!-- Copyright al final de la navegación lateral -->
        <p class="mb-1 px-5 py-3 text-left text-xs text-main">Copyright CAP@2024</p>

    </div>

    <!-- Área de contenido principal -->
    <div class="flex-1 p-4 w-full md:w-1/2 bg-[#fafbfc]">
        <!-- Campo de búsqueda -->
        <div class="relative max-w-md w-full">
            <div class="absolute top-1 left-2 inline-flex items-center p-2">
                <i class="fas fa-search text-gray-400"></i>
            </div>
            <input class="w-full h-10 pl-10 pr-4 py-1 text-base placeholder-gray-500 border rounded-full focus:shadow-outline" type="search" placeholder="Buscar...">
        </div>
        <div class="mt-8 p-4">
            <div class="flex flex-row items-center gap-4" >
                <div class="rounded-lg h-16 w-16 bg-[#f1f6fc] flex justify-center items-center">
                    <Icon name="solar:cat-bold" class="text-main text-4xl" />
                </div>
                <h2 class="text-black text-xl font-semibold">Cat List</h2>
            </div>
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