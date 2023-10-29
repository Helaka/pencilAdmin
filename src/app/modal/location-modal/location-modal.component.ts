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

@Component({
  selector: "app-location-modal",
  templateUrl: "./location-modal.component.html",
  styleUrls: ["./location-modal.component.scss"],
})
export class LocationModalComponent {
  @Input() location: any;
  outlets: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    public photoService: PhotoService,
    private toastr: ToastrService,
    private outletService: OutletService
  ) {
    this.loadOutlets();
  }

  saveChanges() {
    const locationData = {
      city: this.location.city,
      address: this.location.address,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      outletId: this.location.outletId,
    };

    this.outletService.updateLocation(this.location.id, locationData).subscribe(
      (response) => {
        if (response["success"] === true) {
          this.toastr.success("Successfully Updated");
          this.dismiss();
        } else {
          this.toastr.error(response.message);
        }
      },
      (error) => {
        this.toastr.error("Something went wrong");
      }
    );
  }

  loadOutlets(): void {
    this.outletService.getOutlets().subscribe((response) => {
      this.outlets = response;
    });
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
