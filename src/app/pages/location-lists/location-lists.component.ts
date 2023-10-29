import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OutletService } from "../../services/outlet.service";

import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LocationModalComponent } from "src/app/modal/location-modal/location-modal.component";
import { LocationDeleteModalComponent } from "src/app/modal/location-delete-modal/location-delete-modal.component";

@Component({
  selector: "app-location-lists",
  templateUrl: "./location-lists.component.html",
  styleUrls: ["./location-lists.component.scss"],
})
export class LocationListsComponent {
  locations: any[] = [];
  outlets:any[]=[];
  selectedVisit: any;

  constructor(
    private outletService: OutletService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.loadLocations();
  }

  ngOnInit(): void {}

  loadLocations(): void {
    this.outletService.getLocations().subscribe((response) => {
      this.locations = response;
    });
  }

  openLocationModal(location: any): void {
    const modalRef = this.modalService.open(LocationModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.location = location;
  }

  openLocationDeleteModal(location: any): void {
    const modalRef = this.modalService.open(LocationDeleteModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.location = location;
  }


}
