import GetCurrentDate from "@/services/GetCurrentDate.service";
import GetRandomCode from "@/services/GetRandomCode.service";
import Swal from "sweetalert2";

export default class ImageModel {
  Id: string;
	Name: string;
	Content: Blob;
  Blob_url: string;
	Description: string;
	Visible: boolean;
	Tags: string[];
	Date: string;

  constructor(
    content: Blob, url: string, name?: string,
    description?: string, visible = false,
    tags: string[] = []
  ) {
      this.Id = GetRandomCode();
      this.Content = content;
      this.Blob_url = url;
      this.Name = name || '';
      this.Description = description || '';
      this.Visible = visible;
      this.Tags = tags;
      this.Date = GetCurrentDate();
  }

  toggleVisibility(force?: boolean) {
    if (typeof force === 'boolean') {
      this.Visible = force;
      return;
    }

    this.Visible = !this.Visible;
  }

  addTags(tags: string[]) {
    if (!tags.some(t => typeof t != 'string')) return;
    this.Tags.push(...tags);
  }

  async removeTags(tags: string[] = []) {
    if (!tags.some(t => typeof t != 'string')) return;
    if (!tags.length) {
      const pass = await Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to remove all tags from this image?',
        showDenyButton: true,
      });
      if (pass.isDismissed) return;

      this.Tags = [];
      return;
    }

    this.Tags = this.Tags.filter(t => !tags.includes(t));
  }
}
