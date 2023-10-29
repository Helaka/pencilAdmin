import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OutletService } from '../../services/outlet.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  skuSubName:any;
  selectedSKU:any;
  skus:any[] = [];

  skuSubForm:FormGroup = new FormGroup({
    skusubName: new FormControl('',[Validators.required]),
    sku: new FormControl('',[Validators.required]),
  })

  constructor(private outletService: OutletService,private router: Router,private http: HttpClient,private formBuilder: FormBuilder,
     private formModule: FormsModule,private toastr: ToastrService) { this.loadSkus()}

  ngOnInit() {
    this.skuSubForm = this.formBuilder.group({
      skusubName: new FormControl('',[Validators.required]),
      sku: new FormControl('',[Validators.required]),
    })
  }

  loadSkus(): void {
    this.outletService.getSkus().subscribe((response) => {
      response.forEach(sku => {
        const city =  sku.locations.locations.map(loc => loc.city).join(', ')
            this.skus.push({
              id:sku.id,
              name:`${sku.sku_name}- ${sku.locations.name}`
            });
      });
    });
  }

  onFormSubmit(){
    if (this.skuSubForm.invalid) {
      this.toastr.error("Something went wrong");
      return;
    }
    const skuData = {
      sku_type: this.skuSubName, 
      skuId: this.selectedSKU, 
    };

    this.registerSkuSub(skuData).subscribe(
      (response) => {
         if(response){
            this.toastr.success("Successfully Added");
            this.skuSubForm.reset();
        }
      },
      (error) => {
        this.toastr.error(error)
        console.error(error);     
      }
    ); 
  }

  registerSkuSub(skuData: any): Observable<any> {
    const url = environment.baseUrl + "skuCategory/add";
    return this.http.post(url, skuData);
  }
}
