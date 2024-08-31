<script setup>
import { ref } from 'vue'

const payload = ref({
    username: 'admin@admin.com',
    password: 'admin'
})

const rulesUsername = [
    value => !!value || 'You must enter a first name.',
    // Adicione mais regras aqui conforme necessário
]

const rulesPassword = [
    value => !!value || 'You must enter a password.',
    // Adicione mais regras aqui conforme necessário
]

const passwordVisible = ref(false)

const submitForm = () => {
    console.log("LOGIN")
}
</script>

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

        <div class="w-full h-full lg:w-1/2 flex flex-col justify-center items-center">
            <div class="w-full" >
                <div class="flex gap-2 justify-center items-center">
                    <Icon name="ph:cat-fill" class="text-main text-5xl" />
                    <p class="text-main font-semibold">Cat Adoption Platform</p>
                </div>
                <div class="flex justify-center items-center my-4" >
                    <v-divider
                        :thickness="2"
                        class="border-opacity-25 max-w-96"
                        color="error"
                    ></v-divider>
                </div>
                <v-sheet class="mx-auto"  maxWidth="400">
                    <v-form @submit.prevent>
                        <h3 class="text-black font-semibold text-2xl mb-4" >Login</h3>

                        <span class="text-main font-semibold" >Username</span>
                        <v-text-field
                            v-model="payload.username"
                            :rules="rulesUsername"
                            placeholder="Enter your username"
                            variant="outlined"
                            class="mt-2"
                        ></v-text-field>

                        <span class="text-main font-semibold" >Password</span>
                        <v-text-field
                            v-model="payload.password"
                            :rules="rulesPassword"
                            :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="passwordVisible ? 'text' : 'password'"
                            placeholder="Enter your password"
                            variant="outlined"
                            class="mt-2"
                            @click:append-inner="passwordVisible = !passwordVisible"
                        ></v-text-field>
                        
                        <v-btn class="mt-2 bg-main" size="large" type="submit" block color="main">Login</v-btn>
                    </v-form>
                </v-sheet>
            </div>
        </div>
    </div>
</template>