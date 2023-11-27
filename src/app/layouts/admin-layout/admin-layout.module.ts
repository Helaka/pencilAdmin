import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ReportsComponent } from '../..//pages/reports/reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkuSubCategoryComponent } from '../../pages/sku-sub-category/sku-sub-category.component';
import { StoreVisitsComponent } from '../../pages/store-visits/store-visits.component';
import { StallListsComponent } from '../../pages/stall-lists/stall-lists.component';
import { UsersComponent } from '../../pages/users/users.component';
import { UsersListComponent } from 'src/app/pages/users-list/users-list.component';
import { CompetitorsComponent } from 'src/app/pages/competitors/competitors.component';
import { CompetitorsListComponent } from 'src/app/pages/competitors-list/competitors-list.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    UsersComponent,
    SkuSubCategoryComponent,
    ReportsComponent,
    StoreVisitsComponent,
    StallListsComponent,
    UsersListComponent,
    CompetitorsComponent,
    CompetitorsListComponent
 
  ]
})

export class AdminLayoutModule {}
