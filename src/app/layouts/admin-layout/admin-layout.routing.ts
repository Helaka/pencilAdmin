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
import { CompetitorsComponent } from "src/app/pages/competitors/competitors.component";
import { CompetitorsListComponent } from "src/app/pages/competitors-list/competitors-list.component";
import { AuthGuard } from "src/app/auth.guard";

export const AdminLayoutRoutes: Routes = [
  // { path: 'dashboard',      component: DashboardComponent },
  { path: "sku", component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: "sku-sub", component: TablesComponent, canActivate: [AuthGuard] },
  {
    path: "stall",
    component: IconsComponent,
  },
  { path: "locations", component: MapsComponent ,canActivate: [AuthGuard]},
  { path: "stall/list", component: StallListsComponent , canActivate: [AuthGuard] },
  { path: "location/list", component: LocationListsComponent, canActivate: [AuthGuard] },
  { path: "user/list", component: UsersListComponent, canActivate: [AuthGuard] },
  { path: "sku/list", component: SkuListComponent , canActivate: [AuthGuard]},
  { path: "reports", component: ReportsComponent , canActivate: [AuthGuard]},
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  { path: "store-visits", component: StoreVisitsComponent, canActivate: [AuthGuard] },
  { path: "competitors", component: CompetitorsComponent, canActivate: [AuthGuard] },
  { path: "competitors/list", component: CompetitorsListComponent, canActivate: [AuthGuard] },
];
