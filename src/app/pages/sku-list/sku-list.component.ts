import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OutletService } from "../../services/outlet.service";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SkuModalComponent } from "src/app/modal/sku-modal/sku-modal.component";
import { SkuDeleteModalComponent } from "src/app/modal/sku-delete-modal/sku-delete-modal.component";

@Component({
  selector: "app-sku-list",
  templateUrl: "./sku-list.component.html",
  styleUrls: ["./sku-list.component.scss"],
})
export class SkuListComponent {
  skus: any[] = [];

  constructor(
    private outletService: OutletService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.loadSkus();
  }

  loadSkus(): void {
    this.outletService.getSkus().subscribe((response) => {
      this.skus = response;
    });
  }
  openSKUModal(sku: any): void {
    const modalRef = this.modalService.open(SkuModalComponent, {
      backdrop: false,
      windowClass: "custom-modal",
    });
    modalRef.componentInstance.sku = sku;
  }

  openSKUDeleteModal(sku: any): void {
    const modalRef = this.modalService.open(SkuDeleteModalComponent, {
      backdrop: false,
      windowClass: "custom-modal",
    });
    modalRef.componentInstance.sku = sku;
  }
}
