import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
} from "@angular/forms";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PhotoService } from "../../services/photo.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { OutletService } from "../../services/outlet.service";
import { switchMap } from "rxjs";

@Component({
  selector: "app-sku-modal",
  templateUrl: "./sku-modal.component.html",
  styleUrls: ["./sku-modal.component.scss"],
})
export class SkuModalComponent {
  @Input() sku: any;
  outlets: any[] = [];
  outletId: any;
  locations: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private http: HttpClient,
    public photoService: PhotoService,
    private toastr: ToastrService,
    private outletService: OutletService
  ) {
    this.loadLocations();
  }

  saveChanges() {
    const skuData = {
      sku_name: this.sku.sku_name,
      locationId: this.sku.locations.id,
      outletId: this.sku.outlets.id,
    };

    const skuSubData = {
      sku_type: this.sku.skuCategory[0].sku_type,
      skuId: this.sku.id,
    };

    this.outletService.updateSku(this.sku.id, skuData)
    .pipe(
      switchMap((firstResponse) => {
   
        if (firstResponse["message"]) {
          this.toastr.success(firstResponse["message"]);
        } else {
          this.toastr.error("Something went wrong");
        }
        return this.outletService.updateSkuSub(this.sku.id,skuSubData);
      })
    )
    .subscribe((secondResponse) => {
      if (secondResponse["success"]) {
        this.toastr.success(secondResponse["message"]);
      } else {
        this.toastr.error("Something went wrong");
      }
    });
    
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  loadLocations(): void {
    this.outletService.getLocations().subscribe((response) => {
      response.forEach((location) => {
        this.locations.push({
          id: location.id,
          name: `${location.outlet.name}-${location.city}`,
        });
        this.outletId = location.outletId;
      });
    });
  }
}
