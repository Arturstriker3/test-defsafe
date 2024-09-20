<script setup lang="ts">

const notify = () => {
  useNuxtApp().$toast.info('toastify success');
  // or
  // toast.info('toastify success');
};

</script>

<template>
  <div>
    <h1>Bem-vindo à Página Inicial</h1>
    <Icon name="🚀" />
    <v-btn @click="notify">
      Button
    </v-btn>
  </div>
</template>
