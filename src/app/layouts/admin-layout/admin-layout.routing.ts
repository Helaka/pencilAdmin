import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { ReportsComponent } from "../../pages/reports/reports.component";
import { StoreVisitsComponent } from "../../pages/store-visits/store-visits.component";
import { StallListsComponent } from "src/app/pages/stall-lists/stall-lists.component";
import { LocationListsComponent } from "src/app/pages/location-lists/location-lists.component";
import { SkuListComponent } from "src/app/pages/sku-list/sku-list.component";
import { UsersComponent } from "src/app/pages/users/users.component";
import { UsersListComponent } from "src/app/pages/users-list/users-list.component";

export const AdminLayoutRoutes: Routes = [
  // { path: 'dashboard',      component: DashboardComponent },
  { path: "sku", component: UserProfileComponent },
  { path: "sku-sub", component: TablesComponent },
  {
    path: "stall",
    component: IconsComponent,
  },
  { path: "locations", component: MapsComponent },
  { path: "stall/list", component: StallListsComponent },
  { path: "location/list", component: LocationListsComponent },
  { path: "user/list", component: UsersListComponent },
  { path: "sku/list", component: SkuListComponent },
  { path: "reports", component: ReportsComponent },
  { path: "users", component: UsersComponent },
  { path: "store-visits", component: StoreVisitsComponent },
];
