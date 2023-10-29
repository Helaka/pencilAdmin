import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PhotoService } from "../../services/photo.service";
import { ToastrService } from "ngx-toastr";
import { OutletService } from "../../services/outlet.service";
import { error } from "console";

@Component({
  selector: "app-users-modal",
  templateUrl: "./users-modal.component.html",
  styleUrls: ["./users-modal.component.scss"],
})
export class UsersModalComponent {
  @Input() user: any;

  constructor(
    public activeModal: NgbActiveModal,
    public photoService: PhotoService,
    private toastr: ToastrService,
    private outletService: OutletService
  ) {}

  saveChanges() {
    const userData = {
      firstName: this.user.firstName,
      roleId: this.user.userRoles.id,
    };
    this.outletService.updateUser(this.user.id, userData).subscribe(
      (response) => {
        if (response["success"] === true) {
          this.toastr.success(response.message);
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
