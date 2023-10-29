import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PhotoService } from "../../services/photo.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { OutletService } from "../../services/outlet.service";
import { error } from "console";
interface Photo {
  filepath: string;
  webviewPath: string;
  blob: Blob;
  imageUrl: string;
}

@Component({
  selector: "app-visit-modal",
  templateUrl: "./visit-modal.component.html",
  styleUrls: ["./visit-modal.component.scss"],
})
export class VisitModalComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  photos: Photo[] = [];

  stall: any;
  image: any;
  selectedFile: File;

  stallForm: FormGroup = new FormGroup({
    stallName: new FormControl("", [Validators.required]),
    file: new FormControl("", [Validators.required]),
  });

  @Input() outlet: any;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    public photoService: PhotoService,
    private toastr: ToastrService,
    private outletService: OutletService
  ) {}

  ngOnInit() {
    this.stallForm = this.formBuilder.group({
      stallName: new FormControl("", [Validators.required]),
      file: new FormControl("", [Validators.required]),
    });
  }

  saveChanges() {
    const outletData = {
      name: this.outlet.name,
    };

    this.outletService.updateOutlet(this.outlet.id, outletData).subscribe(
      (response) => {
        if(response['success'] === true){
          this.toastr.success("Successfully Updated");
          this.dismiss();
        }else{
          this.toastr.error(response.message);
        }
      },
      (error) => {
        this.toastr.error("Something went wrong");
      }
    );
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
