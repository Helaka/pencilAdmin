import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OutletService } from "../../services/outlet.service";

import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompetitorModalComponent } from "src/app/modal/competitor-modal/competitor-modal.component";
import { CompetitorDeleteModalComponent } from "src/app/modal/competitor-delete-modal/competitor-delete-modal.component";



@Component({
  selector: 'app-competitors-list',
  templateUrl: './competitors-list.component.html',
  styleUrls: ['./competitors-list.component.scss']
})
export class CompetitorsListComponent {

  competitors: any[] = [];
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
    this.outletService.getCompetitors().subscribe((response) => {
      this.competitors = response;
    });
  }

  openCompetitorModal(competitor: any): void {
    const modalRef = this.modalService.open(CompetitorModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.competitor = competitor;
  }

  openCompetitornDeleteModal(competitor: any): void {
    const modalRef = this.modalService.open(CompetitorDeleteModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.competitor = competitor;
  }



}
