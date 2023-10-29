import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "../../environments/environment.prod";

interface UserPhoto {
  filepath: string;
  webviewPath: any;
  blob: Blob;
  imageUrl: string;
}

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  public url: any;
  public photo =
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  // Other methods...

  public onFileSelected(event, index: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type });
        const webviewPath = URL.createObjectURL(blob);
        this.photos[index] = {
          filepath: "soon...", // filepath can be updated later
          webviewPath,
          blob,
          imageUrl: "",
        };
      };

      reader.readAsArrayBuffer(file);
    }
  }

  public async upload(index: any) {
    const formData = new FormData();
    formData.append("file", this.photos[index].blob, "upload.jpeg");

    try {
      const res: any = await this.http
        .post(environment.baseUrl + "/uploads", formData)
        .toPromise();

      this.photos[index].imageUrl = res["imageUrl"];
      this.url = res["imageUrl"];
      if (this.photos[index].imageUrl) {
        this.toastr.success("Successfully uploaded");
      }
    } catch (e) {
      this.toastr.error(e);
    }
  }

  public removeImage(index: any) {
    delete this.photos[index];
  }
}
