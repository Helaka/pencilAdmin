import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutletService } from '../../services/outlet.service';

import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisitModalComponent } from '../../modal/visit-modal/visit-modal.component';
import { VisitDeleteModalComponent } from '../../modal/visit-delete-modal/visit-delete-modal.component';

@Component({
  selector: 'app-stall-lists',
  templateUrl: './stall-lists.component.html',
  styleUrls: ['./stall-lists.component.scss']
})
export class StallListsComponent implements OnInit {

  outlets: any[] = [];
  selectedVisit: any;
  constructor(private outletService: OutletService,private router: Router,private http: HttpClient,private toastr: ToastrService,private modalService: NgbModal) {
    this.loadOutlets();
   }

  ngOnInit(): void {
  }

  loadOutlets():void{
    this.outletService.getOutlets().subscribe((response)=>{
      this.outlets = response; 
    })
  }
  openVisitModal(outlet: any): void {
    const modalRef = this.modalService.open(VisitModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.outlet = outlet;
  }

  openVisitDeleteModal(outlet:any):void {
    const modalRef = this.modalService.open(VisitDeleteModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.outlet = outlet;

  }
}
