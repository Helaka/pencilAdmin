import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
@Injectable({
  providedIn: "root",
})
export class OutletService {

  private apiUrl = environment.baseUrl; // Replace with your Node.js API URL


  constructor(private http: HttpClient) {}

  getOutlets(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/outlets`);
  }

  getLocations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations/all`);
  }

  getCompetitors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/competitorSku/all`);
  }

  getSkus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sku/all`);
  }

  getOutletsLocations(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/locations?outletid=${id}`);
  }

  getVisibilityDrive(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/visibility-drive`);
  }

  getStoreVisits(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/visit`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/all`);
  }

  updateOutlet(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/outlets/update/${id}`;
    return this.http.put(url, data);
  }

  updateSku(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/sku/update/${id}`;
    return this.http.put(url, data);
  }
  updateSkuSub(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/skuCategory/update/${id}`;
    return this.http.put(url, data);
  }
  updateLocation(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/locations/update/${id}`;
    return this.http.put(url, data);
  }

  updateCompetitor(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/competitorSku/update/${id}`;
    return this.http.put(url, data);
  }
  updateUser(id: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/users/update/${id}`;
    return this.http.put(url, data);
  }

  deleteOutlet(id: number): Observable<any> {
    const url = `${this.apiUrl}/outlets/delete/${id}`;
    return this.http.delete(url);
  }

  deleteLocation(id: number): Observable<any> {
    const url = `${this.apiUrl}/locations/delete/${id}`;
    return this.http.delete(url);
  }

  deleteCompetitor(id: number): Observable<any> {
    const url = `${this.apiUrl}/competitorSku/delete/${id}`;
    return this.http.delete(url);
  }

  deleteSKU(id: number): Observable<any> {
    const url = `${this.apiUrl}/sku/delete/${id}`;
    return this.http.delete(url);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/users/delete/${id}`;
    return this.http.delete(url);
  }
}
