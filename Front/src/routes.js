/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import School from "@material-ui/icons/School";
import Car from "@material-ui/icons/School";

import DateRange from "@material-ui/icons/DateRange";
import AttachMoney from "@material-ui/icons/AttachMoney";


import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import Clients from "views/Clients"
import Monitors from "views/Monitors"
import Seances from "views/Seance"
import Payment from "views/Payment"
import Voiture from "views/Voiture"
import Examen from "views/Examen"
import Prix from "views/Prix"
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Les élèves",
    
    icon: People,
    component: Clients,
    layout: "/admin"
  },
  {
    path: "/monitors",
    name: "Les moniteurs",
    
    icon: School,
    component: Monitors,
    layout: "/admin"
  },
  {
    path: "/cars",
    name: "Les voitures",
    
    icon: DirectionsCarIcon,
    component: Voiture,
    layout: "/admin"
  },
  {
    path: "/seances",
    name: "Les seances",
    
    icon: DateRange,
    component: Seances,
    layout: "/admin"
  },
  {
    path: "/examens",
    name: "Les Examens",
    
    icon: HelpOutlineIcon,
    component: Examen,
    layout: "/admin"
  },
  {
    path: "/payment",
    name: "Les paiement",
    
    icon: AttachMoney,
    component: Payment,
    layout: "/admin"
  },
  {
    path: "/prix",
    name: "Les prix",
    
    icon: LocalOfferIcon,
    component: Prix,
    layout: "/admin"
  },
  /*{
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }*/
];

export default dashboardRoutes;
