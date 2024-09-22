<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import EmailUtils from '@/utils/email.utils';
import PhoneUtils from '@/utils/phone.utils';

const router = useRouter()

const notify = () => {
  useNuxtApp().$toast.info('toastify success');
  // or
  // toast.info('toastify success');
};

const isMobile = ref(false);

watch(() => window.innerWidth, (width) => {
  if(width < 768) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
});

const isMobileCheck = (catId: number) => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
  }

  handleAdoptCatGetById(catId)
};

const navigateAuth = () => {
    router.push('/login')
}

const isAdoptingCat = ref(false);
const cats = ref<Cat[]>([]);

const newGuardianData = ref<Guardian>({
  fullName: '',
  email: '',
  telephone: '',
  description: ''
})

export interface Cat {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    adopted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Guardian {
  fullName: string;
  email: string;
  telephone: string;
  description: string;
}

const fetchCats = async () => {
  try {
    const response = await fetch('/api/cats', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (response.ok) {
      cats.value = result.body;
    } else {
      console.error('Erro ao buscar gatos:', result.error);
    }
  } catch (error) {
    console.error('Erro ao buscar gatos:', error);
  }
};

onMounted(() => {
  fetchCats();
});

const handleNewGuardian = () => {
  newGuardianData.value = {
    fullName: '',
    email: '',
    telephone: '',
    description: ''
  }
  isAdoptingCat.value = true;
}

const rulesGuardianName = [
    (value: string) => !!value || 'You must enter your name.',
]

const rulesGuardianDescription = [
    (value: string) => !!value || 'You have to explain why you would like to adopt this cat.',
]

const rulesGuardianEmail = [
  (value: string) => !!value || 'You must enter your email.',
  (value: string) => EmailUtils.isValid(value) || 'You must enter a valid email address.',
]

const rulesGuardianPhone = [
  (value: string) => !!value || 'You must enter your telephone.',
  (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    return (/^(\d{2})(9\d{4})(\d{4})$/).test(cleanedValue) || '(XX)-9XXXX-XXXX';
  },
]

const isNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const originalValue = input.value.replace(/\D/g, '');
  const formattedValue = formatPhoneNumber(originalValue);
  input.value = formattedValue;
  newGuardianData.value.telephone = formattedValue;
};

const formatPhoneNumber = (value: string) => {
  const numericValue = value.replace(/\D/g, '');
  const limitedValue = numericValue.slice(0, 11);
  const match = limitedValue.match(/^(\d{2})(\d{5})(\d{0,4})$/);
  if (match) {
    const formattedNumber = `(${match[1]}) ${match[2]}`;
    if (match[3]) {
      return `${formattedNumber}-${match[3]}`;
    }
    return formattedNumber;
  }

  return limitedValue;
};

const catIdToAdopt = ref(0);

const handleAdoptCatGetById = (catId: number) => {
  catIdToAdopt.value = catId;
  handleNewGuardian();
}

const sendAdoptionForm = async (catId: number) => {

  const cleanedTelephone = newGuardianData.value.telephone.replace(/\D/g, '');

  const formattedGuardianData = {
    ...newGuardianData.value,
    phone: cleanedTelephone,
    telephone: undefined
  };

  try {
    const response = await fetch(`/api/adoptions/${catId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedGuardianData),
    });

    const result = await response.json();
    if (response.ok) {
      isAdoptingCat.value = false;
      await fetchCats();
    } else {
      console.error('Erro ao enviar formulário de adoção:', result.error);
    }
  } catch (error) {
    console.error('Erro ao enviar formulário de adoção:', error);
  }
};

</script>

<template>
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
            <div v-for="cat in cats" :key="cat.id">
              <v-card
              max-width="300"
              max-height="400"
              height="400"
              width="300"
              >
              <div class="rounded-3xl p-5">
                <v-img
                height="180px"
                :src="cat.imageUrl"
                cover
                class="rounded-lg"
                ></v-img>
              </div>
              <v-card-title>
                <span class="font-semibold">
                {{ cat.name }}
                </span>
              </v-card-title>
              <v-card-text class="text-limited">
                <p>
                {{ cat.description }}
                </p>
              </v-card-text>
              <v-card-actions>
                <div class="px-1 w-full">
                <v-btn
                  color="main"
                  variant="flat"
                  text="Adopt"
                  @click="isMobileCheck(cat.id)"
                  block
                ></v-btn>
                </div>
              </v-card-actions>
              </v-card>
            </div>
          </div>
        </div>
        <v-dialog
          v-model="isAdoptingCat"
          max-width="400"
          width="400"
          :fullscreen="isMobile"
        >
          <v-card>
            <v-card-title>
                <div class="flex flex-row justify-between items-center" >
                    <span class="font-semibold">
                      Adoption Form
                    </span>
                    <div class="rounded-lg h-8 w-8 bg-[#b2f2e055] hover:bg-stroke flex justify-center items-center">
                        <Icon name="mdi:heart" class="text-success text-2xl" />
                    </div>
                </div>
            </v-card-title>

            <v-divider
                :thickness="2"
                class="border-opacity-50"
            ></v-divider>
            
            <div class="p-4" >
                <v-form @submit.prevent>

                    <span class="text-main font-semibold" >Name</span>
                    <v-text-field
                        v-model="newGuardianData.fullName"
                        :rules="rulesGuardianName"
                        placeholder="Enter your name"
                        variant="outlined"
                        class="mt-2 mb-1"
                        :hint="newGuardianData.fullName.length + '/30'"
                        maxlength="30"
                        persistent-hint
                    ></v-text-field>

                    <span class="text-main font-semibold" >Email</span>
                    <v-text-field
                        v-model="newGuardianData.email"
                        :rules="rulesGuardianEmail"
                        placeholder="Enter your email"
                        variant="outlined"
                        class="mt-2 mb-1"
                        :hint="'Must be like @domain.com'"
                        maxlength="50"
                        persistent-hint
                    ></v-text-field>

                    <span class="text-main font-semibold" >Telephone</span>
                    <v-text-field
                        v-model="newGuardianData.telephone"
                        :rules="rulesGuardianPhone"
                        placeholder="Enter your telephone"
                        @input="isNumber"
                        variant="outlined"
                        class="mt-2 mb-1"
                        :hint="'Type only numbers'"
                        persistent-hint
                    ></v-text-field>

                    <span class="text-main font-semibold" >Why do you want to adopt this cat?</span>
                    <v-textarea
                        v-model="newGuardianData.description"
                        placeholder="Write here..."
                        row-height="25"
                        rows="3"
                        no-resize
                        bg-color="white"
                        variant="outlined"
                        :hint="newGuardianData.description.length + '/100'"
                        maxlength="100"
                        persistent-hint
                        :rules="rulesGuardianDescription"
                        class="mt-2 mb-1"
                    ></v-textarea>
                </v-form>
            </div>
            

            <template v-slot:actions>
              <div class="flex gap-4 px-2 mb-2" >
                <v-btn
                    text="Cancel"
                    @click="isAdoptingCat = false"
                    color="stroke"
                    variant="flat"
                    width="100"
                ></v-btn>
                <v-btn
                    text="Submit"
                    @click="sendAdoptionForm(catIdToAdopt)"
                    color="main"
                    variant="flat"
                    width="100"
                ></v-btn>
              </div>
            </template>
          </v-card>
        </v-dialog>
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