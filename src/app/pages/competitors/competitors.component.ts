import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OutletService } from "../../services/outlet.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { error } from "console";
import { environment } from "../../../environments/environment.prod";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent {

  locations: any[] = [];
  selectedLocation: any;
  skuName: any;
  isNewSKU: boolean = false;
  selectedSKU: string;
  newSKUName: any;
  existingSKUs: any = [];
  skuData = {};
  outletId:any;
  competitorName: any;
  skuSubData = {};

  competitorForm: FormGroup = new FormGroup({
    competitorName: new FormControl("", [Validators.required])
  });

  constructor(
    private outletService: OutletService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    private toastr: ToastrService
  ) {
  
  }

  

  ngOnInit() {
    this.competitorForm = this.formBuilder.group({
      competiName: new FormControl("", [Validators.required]),
    
    });

  }

  onFormSubmit() {
    if (this.competitorForm.invalid) {
      this.toastr.error("Something went wrong");
      return;
    } 
    
    const data = {
      competitorName:this.competitorName
    }

    this.registerCompetitor(data).subscribe(
      (response) => {
         if(response){
          this.toastr.success("Successfully Added");
         this.competitorForm.reset();
        }
      },
      (error) => {
        this.toastr.error(error);
        // Handle error
      }
    );
  }
  registerCompetitor(compData: any): Observable<any> {
    const url = environment.baseUrl + "/competitorSku";
    return this.http.post(url, compData);
  }

  

}
