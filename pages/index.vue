<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router';
import EmailUtils from '@/utils/email.utils';

const router = useRouter()

const isMobile = ref(false);
const isLoadingView = ref(false);

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
const isAdoptingCatModal = ref(false);
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
  isLoadingView.value = true;
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
      useNuxtApp().$toast.error('Error loading cats');
    }
  } catch (error) {
    console.error('Erro ao buscar gatos:', error);
  } finally {
    isLoadingView.value = false;
  }
};

onMounted(() => {
  isLoadingView.value = true;
  fetchCats();
});

const handleNewGuardian = () => {
  newGuardianData.value = {
    fullName: '',
    email: '',
    telephone: '',
    description: ''
  }
  isAdoptingCatModal.value = true;
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

  isAdoptingCat.value = true;

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
      isAdoptingCatModal.value = false;
      useNuxtApp().$toast.success('Adoption form sent successfully');
      adoptionConfirmModal.value = true;
      await fetchCats();
    } else {
      console.error('Erro ao enviar formulário de adoção:', result.error);
      useNuxtApp().$toast.error('Error sending adoption form')
    }
  } catch (error) {
    console.error('Erro ao enviar formulário de adoção:', error);
  } finally {
    isAdoptingCat.value = false;
  }
};

const adoptionConfirmModal = ref(false);


</script>

<template>
  <div class="flex flex-col h-screen">
        <div class="bg-white text-white  w-full p-2 flex items-center justify-between">
            <div class="flex items-center">
                <div class="flex items-center gap-2 px-4">
                    <Icon name="ph:cat-fill" class="text-main text-5xl" />
                    <h2 class="text-main font-semibold">Cat Adoption Platform</h2>
                </div>
            </div>
            <div class="space-x-5">
                <div class=" flex items-center">
                    <v-btn :disabled="isLoadingView || isAdoptingCat" class="mt-2 bg-main" type="submit" color="main" @click="navigateAuth()">
                        <p class="hidden md:block">Admin</p>
                        <div class="block md:hidden">
                            <Icon name="mdi:user" class="text-white text-2xl" />
                        </div>
                    </v-btn>
                </div>
            </div>
        </div>

        <v-divider
            :thickness="3"
            class="border-opacity-50 mt-2"
        ></v-divider>

        <div>
          <div class="mt-9 mb-6 pl-6">
            <h2 class="text-main text-3xl font-semibold" >Cats for adoption</h2>
            <p class="hidden md:inline" >Explore our list of lovable cats looking for their forever homes.</p>
          </div>

          <div v-if="!isLoadingView" class="mx-0 w-screen justify-items-center justify-between gap-y-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10" >
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
                  :disabled="isLoadingView || isAdoptingCat"
                ></v-btn>
                </div>
              </v-card-actions>
              </v-card>
            </div>
          </div>

          <div class="flex justify-center items-center h-full" v-else>
            <v-progress-circular
              :size="200"
              color="main"
              indeterminate
              class="mt-6"
            ></v-progress-circular>
          </div>

        </div>
        <v-dialog
          v-model="isAdoptingCatModal"
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
                        :disabled="isLoadingView || isAdoptingCat"
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
                        :disabled="isLoadingView || isAdoptingCat"
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
                        :disabled="isLoadingView || isAdoptingCat"
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
                        :disabled="isLoadingView || isAdoptingCat"
                    ></v-textarea>
                </v-form>
            </div>
            

            <template v-slot:actions>
              <div class="flex gap-4 px-2 mb-2" >
                <v-btn
                    text="Cancel"
                    @click="isAdoptingCatModal = false"
                    color="stroke"
                    variant="flat"
                    width="100"
                    :disabled="isLoadingView || isAdoptingCat"
                ></v-btn>
                <v-btn
                    text="Submit"
                    @click="sendAdoptionForm(catIdToAdopt)"
                    color="main"
                    width="100"
                    variant="flat"
                    :disabled="isLoadingView || isAdoptingCat"
                ></v-btn>
              </div>
            </template>
          </v-card>
        </v-dialog>
        <v-dialog
      v-model="adoptionConfirmModal"
      max-width="400"
    width="400"
    >
      <v-card>
        <v-card-title>
            <div class="flex flex-row justify-between items-center" >
                <span class="font-semibold">
                  Application Submitted!
                </span>
                <div class="rounded-lg h-8 w-8 bg-[#b2f2e055] hover:bg-stroke flex justify-center items-center">
                    <Icon name="mdi-check" class="text-success text-2xl" />
                </div>
            </div>
        </v-card-title>

        <v-divider
            :thickness="2"
            class="border-opacity-50"
        ></v-divider>
        <v-card-text>
            <span class="">Thank you for submitting your adoption application! Our team will review your application and get back to you shortly.</span>
        </v-card-text>
        <template v-slot:actions>
            <v-btn
                text="Close"
                @click="adoptionConfirmModal = false"
                color="main"
                block
                variant="flat"
                :disabled="isLoadingView || isAdoptingCat"
            ></v-btn>
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