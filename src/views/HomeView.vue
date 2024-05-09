<template>
  <div class="home">
    <Navbar></Navbar>
    <input ref="input" class="images-input" type="file"
      accept="image/*" multiple @change="changed">
    <div class="images-input-facade" @click="startUploading">
      <fai icon="fa-solid fa-upload"></fai>
    </div>

    <img :src="i.Blob_url" :alt="i.Name" v-for="i of loaded_images">

    <Teleport to="#modals">
      <ImagesLoaderModal :files="files" @clear-files="clearFiles">
      </ImagesLoaderModal>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import ImagesLoaderModal from '@/components/ImagesLoaderModal.vue';
import Navbar from '@/components/Navbar.vue';
import { useImagesStore } from '@/stores/images';
import { computed, ref } from 'vue';

const images = useImagesStore();
const loaded_images = computed(() => images.images);

const input = ref<HTMLInputElement>();
const startUploading = () => {
  input.value?.click();
}

const files = ref<File[]>([]);
const changed = (ev: Event) => {
  const fls = (ev.target as HTMLInputElement).files;
  if (!fls) return;

  files.value = Array.from(fls);
}
const clearFiles = () => {
  files.value = [];
}
</script>

<style scoped lang="scss">
@import '@/sass/variables';

.home {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: 70px auto;

  $input-bottom: 50px;
  $input-right: 50px;

  .images-input {
    position: absolute;
    bottom: $input-bottom;
    right: $input-right;
    width: 0; height: 0;
  }

  .images-input-facade {
    position: absolute;
    bottom: $input-bottom;
    right: $input-right;

    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: $secondary;
    box-shadow: 0 0 10px #000;
    font-size: 1.3rem;
    color: $d_accent;
    transition-property: background-color, color;
    transition-duration: 180ms;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: #fff;
      background-color: $d_accent;
    }
  }
}
</style>
