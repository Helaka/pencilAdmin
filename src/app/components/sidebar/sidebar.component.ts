import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  submenu?: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
  // {
  //   path: "/store-visits",
  //   title: "Store Visits",
  //   icon: "ni-tv-2 text-primary",
  //   class: "",
  // },
  {
    path: "/stall",
    title: "Chain",
    icon: "ni-shop text-blue",
    class: "",
    submenu: [
      {
        path: "/stall/list",
        title: "Chain List",
        icon: "ni ni-tag text-blue",
        class: "",
      },
    ],
  },
  {
    path: "/locations",
    title: "Location",
    icon: "ni-pin-3 text-orange",
    class: "",
    submenu: [
      {
        path: "/location/list",
        title: "Location List",
        icon: "ni ni-tag text-blue",
        class: "",
      },
    ],
  },
  {
    path: "/sku",
    title: "Create SKU",
    icon: "ni ni-cart text-yellow",
    class: "",
    submenu: [
      {
        path: "/sku/list",
        title: "Sku List",
        icon: "ni ni-tag text-blue",
        class: "",
      },
    ],
  },

  {
    path: "/competitors",
    title: "Create Competitor",
    icon: "ni ni-user-run text-purple",
    class: "",
    submenu: [
      {
        path: "/competitors/list",
        title: "Competitors List",
        icon: "ni ni-tag text-blue",
        class: "",
      },
    ],
  },
  // {
  //   path: "/sku-sub",
  //   title: "SKU Sub Category ",
  //   icon: "ni-bullet-list-67 text-red",
  //   class: "",
  // },
  {
    path: "/users",
    title: "Users",
    icon: "ni ni-single-02 text-red",
    class: "",
    submenu: [
      {
        path: "/user/list",
        title: "User List",
        icon: "ni ni-tag text-blue",
        class: "",
      },
    ],
  },
  
  {
    path: "/reports",
    title: "Reports",
    icon: "ni ni-single-copy-04 text-green",
    class: "",
  },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;
  public expandedMenuIndex: number | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  toggleSubMenu(index: number): void {
    this.expandedMenuIndex = this.expandedMenuIndex === index ? null : index;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
