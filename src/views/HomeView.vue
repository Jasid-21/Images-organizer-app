<template>
  <div class="home">
    <input type="file" accept="image/*" multiple @change="changed">
    <Teleport to="#modals">
      <ImagesLoaderModal :files="files" @clear-files="clearFiles">
      </ImagesLoaderModal>
    </Teleport>

    <img :src="i.Blob_url" :alt="i.Name" v-for="i of loaded_images">
  </div>
</template>

<script lang="ts" setup>
import { useImagesStore } from '@/stores/images';
import ImagesLoaderModal from '@/components/ImagesLoaderModal.vue';
import { computed, ref } from 'vue';

const images = useImagesStore();
const loaded_images = computed(() => images.images);

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
.home {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: 70px auto;
}
</style>
