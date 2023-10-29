import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OutletService } from '../../services/outlet.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators,FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  outlets: any[] = [];
  selectedOutlet: any;
  address:any;
  city:any;
  lat:any;
  long:any;


  locationForm:FormGroup = new FormGroup({
    locationAddress: new FormControl('',[Validators.required]),
    locationCity: new FormControl('',[Validators.required]),
    outletName: new FormControl('',[Validators.required]),
    latitude: new FormControl('',[Validators.required]),
    longitude: new FormControl('',[Validators.required]),

  })

  constructor(private outletService: OutletService,private router: Router,private http: HttpClient,private formBuilder: FormBuilder, 
    private formModule: FormsModule,private toastr: ToastrService) {
    this.loadOutlets();
   }

  ngOnInit() {
    this.locationForm = this.formBuilder.group({
      locationAddress: new FormControl('',[Validators.required]),
      locationCity: new FormControl('',[Validators.required]),
      outletName: new FormControl('',[Validators.required]),
      latitude: new FormControl('',[Validators.required]),
      longitude: new FormControl('',[Validators.required])
    })
  }
  onFormSubmit() {
    if (this.locationForm.invalid) {
      this.toastr.error("Something went wrong")
      return;
    }
      const locationData = {
        address:this.address,
        city:this.city,
        country:'Srilanka',
        outletId:this.selectedOutlet,
        latitude:this.lat,
        longitude:this.long
      }
      this.registerLocation(locationData).subscribe((response)=>{
        if(response){
          this.toastr.success("Successfully Added");

          this.locationForm.reset();
        }
      },
      (error)=>{
        this.toastr.error(error);
        console.log(error);
      })
  }

  registerLocation(locationData: any): Observable<any> {
    const url = environment.baseUrl + "locations/add";
    
    return this.http.post(url, locationData);
  }

  loadOutlets(): void {
    this.outletService.getOutlets().subscribe((response) => {
      this.outlets = response;
    });
  }

}
