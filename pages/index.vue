<script setup lang="ts">

import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const notify = () => {
  useNuxtApp().$toast.info('toastify success');
  // or
  // toast.info('toastify success');
};

const navigateAuth = () => {
    router.push('/login')
}

</script>

<template>
  <!-- <div>
    <h1>Bem-vindo à Página Inicial</h1>
    <Icon name="🚀" />
    <v-btn @click="notify">
      Button
    </v-btn>
  </div> -->

  <div class="flex flex-col h-screen">
    <!-- Barra de navegación superior -->
        <div class="bg-white text-white  w-full p-2 flex items-center justify-between">
            <div class="flex items-center">
                <div class="flex items-center gap-2 px-4"> <!-- Mostrado en todos los dispositivos -->
                    <Icon name="ph:cat-fill" class="text-main text-5xl" />
                    <h2 class="text-main font-semibold">Cat Adoption Platform</h2>
                </div>
            </div>
            <!-- Ícono de Notificación y Perfil -->
            <div class="space-x-5">
                <div class=" flex items-center"> <!-- Se muestra solo en dispositivos pequeños -->
                    <v-btn class="mt-2 bg-main" type="submit" color="main" @click="navigateAuth()">
                        <p class="hidden md:block">Admin</p>
                        <div class="block md:hidden">
                            <Icon name="material-symbols:admin-panel-settings-rounded" class="text-white text-2xl" />
                        </div>
                    </v-btn>
                </div>
            </div>
        </div>

        <v-divider
            :thickness="3"
            class="border-opacity-50 mt-2"
        ></v-divider>

        <!-- Contenido principal -->
        <div>
          <div class="mt-9 mb-6 pl-6">
            <h2 class="text-main text-3xl font-semibold" >Cats for adoption</h2>
            <p class="hidden md:inline" >Explore our list of lovable cats looking for their forever homes.</p>
          </div>

          <div class="mx-0 w-screen justify-items-center justify-between gap-y-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10" >
            <v-card
              max-width="300"
              max-height="400"
              height="400"
              width="300"
            >
              <div class="rounded-3xl p-5">
                <v-img
                  height="180px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                  class="rounded-lg"
                ></v-img>
              </div>
              <v-card-title>
                <span class="font-semibold">
                  Top western road trips
                </span>
              </v-card-title>
              <v-card-text class="text-limited" >
                <p>
                  Lorem ipsum dolor sit amet
                </p>
              </v-card-text>
              <v-card-actions>
                <div class="px-1 w-full" >
                  <v-btn
                  color="main"
                  variant="flat"
                  text="Adopt"
                  block
                  ></v-btn>
                </div>
              </v-card-actions>
            </v-card>

            <v-card
              max-width="300"
              max-height="400"
              height="400"
              width="300"
            >
              <div class="rounded-3xl p-5">
                <v-img
                  height="180px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                  class="rounded-lg"
                ></v-img>
              </div>
              <v-card-title>
                <span class="font-semibold">
                  Top western road trips
                </span>
              </v-card-title>
              <v-card-text class="text-limited">
                <p>
                  Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet,
                </p>
              </v-card-text>
              <v-card-actions>
                <div class="px-1 w-full" >
                  <v-btn
                  color="main"
                  variant="flat"
                  text="Adopt"
                  block
                ></v-btn>
                </div>
              </v-card-actions>
            </v-card>

            <v-card
              max-width="300"
              max-height="400"
              height="400"
              width="300"
            >
              <div class="rounded-3xl p-5">
                <v-img
                  height="180px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                  class="rounded-lg"
                ></v-img>
              </div>
              <v-card-title>
                <span class="font-semibold">
                  Top western road trips
                </span>
              </v-card-title>
              <v-card-text class="text-limited" >
                <p>
                  Lorem ipsum dolor sit amet
                </p>
              </v-card-text>
              <v-card-actions>
                <div class="px-1 w-full" >
                  <v-btn
                  color="main"
                  variant="flat"
                  text="Adopt"
                  block
                  ></v-btn>
                </div>
              </v-card-actions>
            </v-card>

            <v-card
              max-width="300"
              max-height="400"
              height="400"
              width="300"
            >
              <div class="rounded-3xl p-5">
                <v-img
                  height="180px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                  class="rounded-lg"
                ></v-img>
              </div>
              <v-card-title>
                <span class="font-semibold">
                  Top western road trips
                </span>
              </v-card-title>
              <v-card-text class="text-limited" >
                <p>
                  Lorem ipsum dolor sit amet
                </p>
              </v-card-text>
              <v-card-actions>
                <div class="px-1 w-full" >
                  <v-btn
                  color="main"
                  variant="flat"
                  text="Adopt"
                  block
                  ></v-btn>
                </div>
              </v-card-actions>
            </v-card>

            <v-card
              max-width="300"
              max-height="400"
              height="400"
              width="300"
            >
              <div class="rounded-3xl p-5">
                <v-img
                  height="180px"
                  src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                  cover
                  class="rounded-lg"
                ></v-img>
              </div>
              <v-card-title>
                <span class="font-semibold">
                  Top western road trips
                </span>
              </v-card-title>
              <v-card-text class="text-limited" >
                <p>
                  Lorem ipsum dolor sit amet
                </p>
              </v-card-text>
              <v-card-actions>
                <div class="px-1 w-full" >
                  <v-btn
                  color="main"
                  variant="flat"
                  text="Adopt"
                  block
                  ></v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </div>
        </div>
    </div>
</template>

<style scoped>

.text-limited {
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  margin-bottom: 8px;
}

.text-limited::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(transparent, white);
}

</style>