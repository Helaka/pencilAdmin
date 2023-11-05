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
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  locations: any[] = [];
  selectedLocation: any;
  skuName: any;
  isNewSKU: boolean = false;
  selectedSKU: string;
  newSKUName: any;
  existingSKUs: any = [];
  skuData = {};
  outletId:any;
  skuSubName: any;
  skuSubData = {};

  skuForm: FormGroup = new FormGroup({
    skuname: new FormControl("", [Validators.required]),
    location: new FormControl("", [Validators.required]),
    skusub: new FormControl("", [Validators.required]),
    newSKUNamemodel: new FormControl("", [Validators.required]),
  });

  constructor(
    private outletService: OutletService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private formModule: FormsModule,
    private toastr: ToastrService
  ) {
    this.loadLocations();

    this.loadSkus();
  }

  onSKUChange() {
    if (this.selectedSKU === "new") {
      this.isNewSKU = true;
    } else {
      this.isNewSKU = false;
    }
  }

  ngOnInit() {
    this.skuForm = this.formBuilder.group({
      skuname: new FormControl(""),
      location: new FormControl("", [Validators.required]),
      skusub: new FormControl("", [Validators.required]),
      newSKUNamemodel: new FormControl(""),
    });
  }

  loadLocations(): void {
    this.outletService.getLocations().subscribe((response) => {
      response.forEach((location) => {
        this.locations.push({
          id: location.id,
          name: `${location.outlet.name}-${location.city}`,
        });
        this.outletId = location.outletId;
      });
      // this.locations = response;
    });
  }

  loadSkus(): void {
    this.outletService.getSkus().subscribe((response) => {
      const unique = response.reduce((acc, curr) => {
        if (!acc.some((item) => item.sku_name === curr.sku_name)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      this.existingSKUs = unique;
    });
  }

  async onFormSubmit() {
    if (this.skuForm.invalid) {
      this.toastr.error("Something went wrong");
      return;
    }

    if (this.isNewSKU) {
      this.skuData = {
        sku_name: this.newSKUName,
        locationId: this.selectedLocation,
        outletId:this.outletId
      };
    } else {
      this.skuData = {
        sku_name: this.selectedSKU,
        locationId: this.selectedLocation,
        outletId:this.outletId
      };
    }

    try {
      this.registerSku(this.skuData)
        .pipe(
          switchMap((firstResponse) => {
            this.skuSubData = {
              sku_type: this.skuSubName,
              skuId: firstResponse.sku.id,
            };
            if (firstResponse["message"]) {
              this.toastr.success(firstResponse["message"]);
              this.skuForm.reset();
            } else {
              this.toastr.error("Something went wrong");
            }
            return this.registerSubSku(this.skuSubData);
          })
        )
        .subscribe((secondResponse) => {
          if (secondResponse["success"]) {
            this.skuForm.reset();
            this.toastr.success(secondResponse["message"]);
          } else {
            this.toastr.error("Something went wrong");
          }
        });
    } catch (error) {
      this.toastr.error(error);
    }
  }
  registerSku(skuData: any): Observable<any> {
    const url = environment.baseUrl + "/sku/create";
    return this.http.post(url, skuData);
  }

  registerSubSku(skuSubData: any): Observable<any> {
    const url = environment.baseUrl + "/skuCategory/add"; 
    return this.http.post(url, skuSubData);
  }
}
