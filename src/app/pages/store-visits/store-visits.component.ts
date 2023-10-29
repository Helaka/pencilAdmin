import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutletService } from '../../services/outlet.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VisitModalComponent } from '../../modal/visit-modal/visit-modal.component';
declare var $: any;
@Component({
  selector: 'app-store-visits',
  templateUrl: './store-visits.component.html',
  styleUrls: ['./store-visits.component.scss']
})
export class StoreVisitsComponent implements OnInit {

  visits: any[] = [];
  selectedVisit: any;
  constructor(private outletService: OutletService,private router: Router,private http: HttpClient,private toastr: ToastrService,private modalService: NgbModal) {
    this.loadStoreVisits();
   }

  ngOnInit(): void {
  }

  
  loadStoreVisits():void{
    this.outletService.getStoreVisits().subscribe((response)=>{
      this.visits = response; 
    })
  }

  open(visit:any){
    const modalRef = this.modalService.open(VisitModalComponent,{ backdrop: false });
    modalRef.componentInstance.data = visit;
  }
}
