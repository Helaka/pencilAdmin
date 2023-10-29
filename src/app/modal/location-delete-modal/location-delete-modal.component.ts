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
  selector: "app-location-delete-modal",
  templateUrl: "./location-delete-modal.component.html",
  styleUrls: ["./location-delete-modal.component.scss"],
})
export class LocationDeleteModalComponent {
  @Input() location: any;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    private toastr: ToastrService,
    private outletService: OutletService
  ) {}

  delete() {
    this.outletService.deleteLocation(this.location.id).subscribe((response) => {
      if (response.success) {
        this.toastr.success("successfully deleted");
        this.dismiss();
      } else {
        this.toastr.error("record not found");
        this.dismiss();
      }
    });
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
