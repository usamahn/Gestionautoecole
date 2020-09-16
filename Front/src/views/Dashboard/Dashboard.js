import React,{useState,useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { getNombreClients,getTauxReussite,getNbreHeuresMoyenne,getNombreMoniteurs,getDailyHoursLastSevenDays
,getRevenuMoisActuel,getNombreMoyenneHeuresParJour,getNombreClientsMoisActuel,getRevenuDernier12Mois,getNombreClientsDernier12Mois,getNombreVoitures} from "../../Services/InsightsServices";

import {getHoursbyMonitorCurrentMonth} from "../../Services/MonitorServices"

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { DaySeriesModel } from "@fullcalendar/react";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();


  const[nombreClients,setNombreClients]=useState(null)
  const[tauxReussite,setTauxReussite]=useState(null)
  const[nbreHeuresMoyenne,setNbreHeuresMoyenne]=useState(null)
  const[nombreMoniteurs,setNombreMoniteurs]=useState(null)
  const[nombreVoitures,setNombreVoitures]=useState(null)

  const[dailyHoursLastSevenDays,setDailyHoursLastSevenDays]=useState({labels:[],series:[[]]})
  const[revenuMoisActuel,setRevenuMoisActuel]=useState(null)
const[nombreMoyenneHeuresParJour,setNombreMoyenneHeuresParJour]=useState(null)
const[nombreClientsMoisActuel,setNombreClientsMoisActuel]=useState(null)
const [revenu12months,setRevenu12months]=useState({labels:[],series:[[]]})
const [nombreClientsDernier12Mois,setNombreClientsDernier12Mois]=useState({labels:[],series:[[]]})
const [HoursbyMonitorCurrentMonth,setHoursbyMonitorCurrentMonth]=useState([])
  useEffect(()=>{
    async function fetchData(){
      const result = await getNombreClients();
      setNombreClients(result.data)
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function fetchData(){
      const result = await getTauxReussite();
      setTauxReussite(result.data)
    }
    fetchData()
  },[])
  useEffect(()=>{
    async function fetchData(){
      const result = await getNbreHeuresMoyenne();
      setNbreHeuresMoyenne(result.data)
    }
    fetchData()
  },[])
  useEffect(()=>{
    async function fetchData(){
      const result = await getNombreMoniteurs();
      setNombreMoniteurs(result.data)
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function fetchData(){
      const result = await getNombreVoitures();
      setNombreVoitures(result.data)
    }
    fetchData()
  },[])


  useEffect(()=>{
    async function fetchData(){
      const result = await getDailyHoursLastSevenDays();
      setDailyHoursLastSevenDays({
        labels:Object.keys(result.data),
        series:[Object.values(result.data)]
      })
    }
    fetchData()
  },[])
  useEffect(()=>{
    async function fetchData(){
      const result = await getRevenuDernier12Mois();
      setRevenu12months({
        labels:Object.keys(result.data),
        series:[Object.values(result.data)]
      })
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function fetchData(){
      const result = await getNombreClientsDernier12Mois();
      setNombreClientsDernier12Mois({
        labels:Object.keys(result.data),
        series:[Object.values(result.data)]
      })
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function fetchData(){
      const result = await getRevenuMoisActuel();
      setRevenuMoisActuel(result.data)
    }
    fetchData()
  },[])
  useEffect(()=>{
    async function fetchData(){
      const result = await getNombreMoyenneHeuresParJour();
      setNombreMoyenneHeuresParJour(result.data)
    }
    fetchData()
  },[])

  useEffect(()=>{
    async function fetchData(){
      const result = await getNombreClientsMoisActuel();
      setNombreClientsMoisActuel(result.data)
    }
    fetchData()
  },[])



  useEffect(()=>{
    async function fetchData(){
      const result = await getHoursbyMonitorCurrentMonth();
      setHoursbyMonitorCurrentMonth(result.data.map(d=>([d.nom, d.nombreHeures])))
    }
    fetchData()
  },[])
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PeopleIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Nombre total des clients</p>
              <h3 className={classes.cardTitle}>
                {nombreClients} Clients
              </h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <DoneOutlineOutlinedIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Taux de reussite aux examens</p>
              <h3 className={classes.cardTitle}>{tauxReussite}%</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <WatchLaterIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Nombre Moyennes d'heures par Client</p>
              <h3 className={classes.cardTitle}>{nbreHeuresMoyenne} Heures</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Nombre Total des Moniteurs</p>
              <h3 className={classes.cardTitle}>{nombreMoniteurs} Moniteurs</h3>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer>


      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <MonetizationOnIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Revenu du Mois Actuel (jusqu'au aujourd'hui)</p>
              <h3 className={classes.cardTitle}>
                {revenuMoisActuel} Dinars
              </h3>
            </CardHeader>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <WatchLaterIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nombre Moyenne d'Heures par jour</p>
              <h3 className={classes.cardTitle}>{nombreMoyenneHeuresParJour} Heures</h3>
            </CardHeader>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <PeopleIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Nombre de Clients du Mois Actuel</p>
              <h3 className={classes.cardTitle}>{nombreClientsMoisActuel} Clients</h3>
            </CardHeader>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <DirectionsCarIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Nombre Total des voitures</p>
              <h3 className={classes.cardTitle}>{nombreVoitures} Voitures</h3>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer>




      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailyHoursLastSevenDays}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Nombre d'heures par jour</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  
                </span>{" "}
                Dans les dernniers 7 jours
              </p>
            </CardBody>
            
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={revenu12months}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Revenus Mensuels</h4>
              <p className={classes.cardCategory}>Derniers 12 mois</p>
            </CardBody>
           
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={nombreClientsDernier12Mois}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Nombre de clients par mois</h4>
              <p className={classes.cardCategory}>Derniers 12 mois</p>
            </CardBody>
            
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
       
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Nombre d'heures effectées par chaque moniteur</h4>
              <p className={classes.cardCategoryWhite}>
                Pour le mois actuel
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Nom", "Nombre d'heures"]}
                tableData={HoursbyMonitorCurrentMonth}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
