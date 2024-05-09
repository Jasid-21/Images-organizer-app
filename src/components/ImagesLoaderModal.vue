<template>
  <Transition>
    <dialog class="images-loader-modal" v-if="fls.length">
      <div class="header">
        <span class="title">Uploaded Images</span>
      </div>

      <div class="images-carousel">
        <span class="count" v-if="fls.length">
          {{ chosen_index + 1 }}/{{ fls.length }}
        </span>
        <img :src="chosen.Blob_url" alt="Loaded image" v-if="chosen">
        <span class="left-arrow" @click="toLeft"
          :class="{ disabled: !chosen_index }">
          <fai icon="fa-solid fa-chevron-left"></fai>
        </span>
        <span class="right-arrow" @click="toRight"
          :class="{ disabled: chosen_index >= imagesModels.length - 1 }">
          <fai icon="fa-solid fa-chevron-right"></fai>
        </span>
      </div>
      <div class="description-container">
        <textarea placeholder="Type something (optional)" v-model="chosen.Description">
        </textarea>
      </div>
      <div class="buttons-container">
        <button class="done-btn" @click="saveImages">Done</button>
        <button class="cancel-btn" @click="emit('clearFiles')">Cancel</button>
      </div>
    </dialog>
  </Transition>
</template>

<script setup lang="ts">
import ImageModel from '@/Models/Image.class';
import { useImagesStore } from '@/stores/images';
import { computed, ref, watch } from 'vue';

const emit = defineEmits<{ (e: 'clearFiles'): void }>();
const props = defineProps<{ files: File[] }>();
const images = useImagesStore();

const chosen_index = ref<number>(0);
const fls = computed(() => props.files);
const imagesModels = computed((): ImageModel[] => {
  if (!fls.value.length) return [];
  const url_creator = window.URL || window.webkitURL;
  return fls.value.map(f => {
    const blob: Blob = f;
    const url = url_creator.createObjectURL(f);
    const name = f.name;
    return new ImageModel(blob, url, name, '', false, []);
  });
});
const chosen = computed(() => imagesModels.value[chosen_index.value]);

const toRight = () => {
  if (chosen_index.value >= fls.value.length - 1) return;
  chosen_index.value++;
}

const toLeft = () => {
  if (chosen_index.value <= 0) return;
  chosen_index.value--;
}

const saveImages = () => {
  if (!imagesModels.value.length) return;
  const done = images.uploadImages(imagesModels.value);
  if (!done) return;
  emit('clearFiles');
}

</script>

<style scoped lang="scss">
@import '@/sass/variables';

.images-loader-modal {
  width: 400px;
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid $primary;
  border-radius: 10px;
  box-shadow: 0 0 10px $primary;

  display: grid;
  grid-template-rows: 30px 250px 60px 26px;
  row-gap: 0.3rem;

  & > div {
    text-align: center;
  }

  .images-carousel {
    position: relative;
    height: 100%;
    background-color: #202020;
    border-radius: 8px;

    span.count {
      position: absolute;
      padding: 0.1rem 0.3rem;
      background-color: #727272;
      color: #fff;
      top: 10px; left: 50%;
      translate: -50% 0;
      border-radius: 8px;
    }

    img {
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    span.left-arrow, span.right-arrow {
      padding: 0.4rem 0.65rem;
      background-color: #959595;
      color: #fff;
      border-radius: 50%;

      position: absolute;
      top: 50%;
      translate: 0 -50%;
      transition-property: background-color, color;
      transition-duration: 180ms;

      &.disabled {
        color: #ededed;
        background-color: #b9b9b9;
      }

      &:hover:not(.disabled) {
        background-color: #727272;
      }
    }

    span.left-arrow {
      left: -5px;
    }

    span.right-arrow {
      right: -5px;
    }
  }

  .description-container {
    textarea {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    column-gap: 0.3rem;

    button {
      width: 60px;
      height: 100%;
      text-align: center;
      font-weight: 700;

      border-radius: 4px;
      border: 2px solid $accent;
      color: $accent;
      background-color: transparent;
      transition-property: background-color, color;
      transition-duration: 180ms;

      &:hover {
        background-color: $accent;
        color: #fff;
      }
    }

    button.cancel-btn {
      border-color: $reject;
      color: $reject;

      &:hover {
        color: #fff;
        background-color: $reject;
      }
    }
  }
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 1.5;
}

.v-enter-active,
.v-leave-active {
  transition: all 180ms ease;
}
</style>
