import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import SeanceModal from "modals/SeanceModal";
import SeanceClickedModal from "modals/SeanceClickedModal"
import { getSeances } from "../Services/SeanceServices";
import { getClient } from "../Services/ClientServices";
import { getMonitor } from "../Services/MonitorServices";
import { getVoiture } from "../Services/VoitureServices";



import { Formik, Field, Form, ErrorMessage } from 'formik';

import CircularProgress from '@material-ui/core/CircularProgress';

import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";


import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'




const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};




const useStyles = makeStyles(styles);



const handleDateClick= (clickInfo)=>{
  let calendarApi = clickInfo.view.calendar

  calendarApi.unselect()
  if (clickInfo.view.type=="dayGridMonth"){
    calendarApi.changeView('timeGridDay', clickInfo.date);
  }
    
}



/*async function getEvents(){
  const seances = await getSeances();
  var data=[]
  seances.data.forEach(async(s) => {
    var eleve = null;
    var monitor = null;
    try{
     eleve =await getClient(s.cin_Eleve)
     monitor =await getMonitor(s.cin_Moniteur)
    }catch(err){
    }

    if(eleve!=null && monitor != null){

      var dateParts = s.date.split("/");
      var heure_debut = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0],s.heure_debut); 
      var heure_fin = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0],s.heure_fin); 
      //const eventInfo ={title:"Eleve "+eleve.data.prenom +" Moniteur "+ monitor.data.prenom, start:heure_debut, end:heure_fin }
      const eventInfo={
          title  : 'event3',
          eleve:"oussama",
          moniteur:"wissem",
          start  : new Date(2020,7,26,12),
          color:"black"
        }      
      data.push(eventInfo)
    }
  });
 

  return data
}*/




const eventContent =(eventInfo)=>{
  return(
    <>
      Eleve {eventInfo.event.eleve}  Moniteur {eventInfo.event.moniteur}
    </>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b> <br/>
      {eventInfo.event.title?eventContent(eventInfo):null }
      
    </>
  )
}


 function Seances (props) {

  const classes = useStyles();

  
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    
    
    calendarApi.unselect() // clear date selection
    if (selectInfo.view.type=="timeGridDay"){
      if(selectInfo.start.getMinutes()==0&&selectInfo.end.getMinutes()==0)
      {setSelectInfoData(selectInfo)
      setClassicModal(true)
      /*let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar
  
      calendarApi.unselect() // clear date selection
  
      if (title) {
        console.log(selectInfo.view.type)
        calendarApi.addEvent({
          id: 1,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }*/
    }
    }
  }
  




  const [classicModal, setClassicModal] = useState(false);
  const [selectInfoData,setSelectInfoData]=useState(null);
  const [data, setData] = useState([])
  const [loading,setLoading]=useState(true)
  const[seances,setSeances]=useState([])
  const[deleteModalOpen,setDeleteModalOpen] =useState(false)
  const[selectedEvent,setSelectedEvent]=useState(null)
  const [calendarApi,setCalendarApi]=useState(null)


  async function fetchSeancesData(s){
    var eleve = null;
    var monitor = null;
    var voiture=null
    try{
    eleve =await getClient(s.cin_Eleve)
    monitor =await getMonitor(s.cin_Moniteur)
    if (s.immatriculation_Voiture!=null){
    voiture=await getVoiture(s.immatriculation_Voiture)}
    voiture=voiture.data
    }catch(err){
    }

    if(eleve!=null && monitor != null){

      var dateParts = s.date.split("/");
      var heure_debut = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0],s.heure_debut); 
      var heure_fin = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0],s.heure_fin); 
      var eventInfo={}
      if(s.type=="code"){
         eventInfo ={id:s.id_Seance,title:"Eleve "+eleve.data.prenom +" Moniteur "+ monitor.data.prenom, start:heure_debut, end:heure_fin,color:"black" }
      }
        
      else{
         eventInfo ={id:s.id_Seance,title:"Eleve "+eleve.data.prenom +" Moniteur "+ monitor.data.prenom, start:heure_debut, end:heure_fin,car:voiture!=null?voiture.marque:null,eleve:eleve.data.prenom +" "+eleve.data.nom,moniteur:monitor.data.prenom+" "+monitor.data.nom,type:s.type }
      }
      setData(prevData=>([...prevData,eventInfo]))
      
    }
  }


  async function fetchSeances()
  {
    const seances = await getSeances();
    setSeances(seances.data)
  }
  useEffect(()=>{

    fetchSeances()
  },[]
  )
  useEffect(()=>{
    
    seances.forEach(s=>{
      fetchSeancesData(s)
    })
    setLoading(false);
  },[seances])

  const refetchData=async()=>{
    await fetchSeances()
    setData([])
    /*seances.forEach(s=>{
       fetchSeancesData(s.id_Seance,s.cin_Eleve,s.cin_Moniteur,s.date,s.heure_debut,s.heure_fin,s.type)
    })*/
    //var eventSource=calendarApi.getEventSources()[0]
    //eventSource.remove()
    //calendarApi.addEventSource(data)

  }
  
const handleEventClick = (clickInfo) => {
  setDeleteModalOpen(true)
  setSelectedEvent(clickInfo.event)
  setCalendarApi(clickInfo.view.calendar)
  /*if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title} '${clickInfo.event.id}'`)) {
    clickInfo.event.remove()
    let calendarApi = clickInfo.view.calendar
    calendarApi.getEventSources()[0].remove()
    calendarApi.addEventSource(data)
  }*/
}

  return (
    <>
    {loading?<CircularProgress style={{position:"absolute",top:"25%",left:"35%"}} size={24}  />:
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar = { {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        
      } }

      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      select={ handleDateSelect }
      eventAdd={e => {  } }
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      eventSources={[data]}
      />}
      
      <SeanceModal classicModal={classicModal} setClassicModal={setClassicModal} selectInfoData={selectInfoData} refetchData={refetchData}/>
{selectedEvent!=null?<SeanceClickedModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} selectedEvent={selectedEvent} refetchData={refetchData} />:null}
    </>
  )

}
export default Seances;


/*

   <FullCalendar

        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar = { {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
          
        } }
        
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={ handleDateSelect }
        events={eventsData}
        eventAdd={e => {  } }
        dateClick={handleDateClick}
        eventContent={renderEventContent}
      />

*/