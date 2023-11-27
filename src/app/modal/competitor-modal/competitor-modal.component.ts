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
  selector: 'app-competitor-modal',
  templateUrl: './competitor-modal.component.html',
  styleUrls: ['./competitor-modal.component.scss']
})
export class CompetitorModalComponent {

  @Input() competitor: any;
  outlets: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    private toastr: ToastrService,
    private outletService: OutletService
  ) {
   
  }

  saveChanges() {
    const competitorData = {
      competitorName: this.competitor.competitorName,

    };

    this.outletService.updateCompetitor(this.competitor.id, competitorData).subscribe(
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
  dismiss(): void {
    this.activeModal.dismiss();
  }

}
