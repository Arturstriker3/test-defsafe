<template>
    <div class="flex h-screen overflow-hidden gap-8">
        <div class="hidden lg:flex lg:w-1/2 items-center justify-center relative py-6">
            <div class="bg-main bg-cover bg-center max-w-2xl h-full flex items-center justify-center rounded-3xl relative overflow-hidden">
                <v-img
                    cover
                    src="../assets/Elements/Background.png"
                    class="absolute inset-0 w-full h-full"
                >
                    <div class="flex flex-col items-center justify-between w-full h-full p-8">
                        <p class="text-center text-white text-5xl font-medium mt-28">Welcome to the Cat Adoption Panel</p>
                        <v-img
                            :width="550"
                            aspect-ratio="4/3"
                            cover
                            src="../assets/Elements/Cat.png"
                            class="flex items-center justify-center"
                        ></v-img>
                    </div>
                </v-img>
            </div>
        </div>

        <div class="w-full lg:w-1/2 bg-blue-500 flex items-center justify-center">
            <p class="text-white">Login Page</p>
        </div>
    </div>
</template>