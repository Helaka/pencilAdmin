import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OutletService } from '../../services/outlet.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient,private outletService:OutletService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  downloadReports(){
    this.http.get( environment.baseUrl + "/report", { responseType: 'blob' }).subscribe((csvBlob: Blob) => {
    this.downloadCSV(csvBlob);
    });
  }

  downloadCSV(csvBlob: Blob) {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(csvBlob);
    a.href = url;
    a.download = 'report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  

}
