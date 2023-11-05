import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotoService } from '../../services/photo.service';
import { environment } from '../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
interface Photo {
  filepath: string;
  webviewPath: string;
  blob: Blob;
  imageUrl: string;
}

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef;
  photos: Photo[] = [];

  stall:any;
  image:any;
  selectedFile:File;

  stallForm:FormGroup = new FormGroup({
    stallName: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required])

  })

  public copy: string;
   constructor(  private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder, private formModule: FormsModule,public photoService:PhotoService,private toastr: ToastrService) { }

  ngOnInit() {
    this.stallForm = this.formBuilder.group({
      stallName: new FormControl('',[Validators.required]),
      file: new FormControl('',[Validators.required])
    })
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
  
    if (this.stallForm.invalid) {
      this.toastr.error("Something went wrong");
      return;
    }

    if (!this.photoService.photos[0] || !this.photoService.photos[0].imageUrl) {
      this.toastr.error("please upload the image")
    }else{
      const data ={
        name : this.stall,
        image:this.photoService.photos[0].imageUrl,
      }

      this.registerOutlet(data).subscribe(
        (response) => {
           if(response){
            this.toastr.success("Successfully Added");
           this.stallForm.reset();
          }
        },
        (error) => {
          this.toastr.error(error);
          // Handle error
        }
      );
    }
   
    }

    registerOutlet(data: any): Observable<any> {
      const url =  environment.baseUrl + "/outlets/register";
      return this.http.post(url, data);
    }

    uploadImage3(index: any) {
      this.photoService.upload(index);
    }


   onFileSelected(event) {
    const file = event.target.files[0];
    const index = 5; // specify the index as per your requirement

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const blob = new Blob([reader.result], { type: file.type });
        const webviewPath = URL.createObjectURL(blob);

        this.photos[index] = {
          filepath: 'soon...', // filepath can be updated later
          webviewPath,
          blob,
          imageUrl: '',
        };
      };

      reader.readAsArrayBuffer(file);
    }
  }
   
}
