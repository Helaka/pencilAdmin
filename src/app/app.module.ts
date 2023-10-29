import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { SkuSubCatComponent } from './pages/sku-sub-cat/sku-sub-cat.component';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { VisitModalComponent } from './modal/visit-modal/visit-modal.component';
import { LocationListsComponent } from './pages/location-lists/location-lists.component';
import { LocationModalComponent } from './modal/location-modal/location-modal.component';
import { SkuListComponent } from './pages/sku-list/sku-list.component';
import { SkuModalComponent } from './modal/sku-modal/sku-modal.component';
import { UsersModalComponent } from './modal/users-modal/users-modal.component';
import { VisitDeleteModalComponent } from './modal/visit-delete-modal/visit-delete-modal.component';
import { LocationDeleteModalComponent } from './modal/location-delete-modal/location-delete-modal.component';
import { SkuDeleteModalComponent } from './modal/sku-delete-modal/sku-delete-modal.component';
import { UserDeleteModalComponent } from './modal/user-delete-modal/user-delete-modal.component';






@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['http://13.212.196.209:3100'],
        disallowedRoutes: []
      }
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    SkuSubCatComponent,
    VisitModalComponent,
    LocationListsComponent,
    LocationModalComponent,
    SkuListComponent,
    SkuModalComponent,
    UsersModalComponent,
    VisitDeleteModalComponent,
    LocationDeleteModalComponent,
    SkuDeleteModalComponent,
    UserDeleteModalComponent

  ],
  providers:[AuthService],

  bootstrap: [AppComponent]
})
export class AppModule { }
