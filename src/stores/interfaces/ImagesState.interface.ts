import ImageModel from "@/Models/Image.class";

export default interface ImagesState {
  images: ImageModel[];
  tags: string[];
}
