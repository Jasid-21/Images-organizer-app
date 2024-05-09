import { defineStore } from "pinia";
import ImagesState from "./interfaces/ImagesState.interface";
import ImageModel from "@/Models/Image.class";
import GetRandomCode from "@/services/GetRandomCode.service";
import FireAlert from "@/services/FireAlert.service";

export const useImagesStore = defineStore('images', {
  state: (): ImagesState => ({
    images: [],
    tags:[],
  }),

  actions: {
    async requestImages() {

    },

    saveImages() {
      const str = JSON.stringify(this.images);
      const json = JSON.parse(str);
      console.log(json);
      localStorage.setItem('images_list', json);
    },

    uploadImages(imgs: ImageModel[]): boolean {
      if (imgs.some(i => !(i instanceof ImageModel))) {
        FireAlert('Some images not meet the erquirements', 'error');
        return false;
      }
      this.images.push(...imgs);
      return true;
    }
  }
});
