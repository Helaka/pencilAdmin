import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutletService } from '../../services/outlet.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersModalComponent } from 'src/app/modal/users-modal/users-modal.component';
import { UserDeleteModalComponent } from 'src/app/modal/user-delete-modal/user-delete-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users: any[] = [];
  constructor(private outletService: OutletService,private router: Router,private http: HttpClient,private toastr: ToastrService,private modalService: NgbModal) {
   this.loadUsers();
   }

   loadUsers():void{
    this.outletService.getUsers().subscribe((response)=>{
      this.users = response; 
    })
  }

  openUserModal(user: any): void {
    const modalRef = this.modalService.open(UsersModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.user = user;
  }

  openUserDeleteModal(user: any): void {
    const modalRef = this.modalService.open(UserDeleteModalComponent,{ backdrop: false ,windowClass: 'custom-modal'});
    modalRef.componentInstance.user = user;
  }

}
