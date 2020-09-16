import 'date-fns';

import React,{useState} from "react";
import { makeStyles,withStyles  } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';

import Slide from "@material-ui/core/Slide";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


import ClinetAutocompleteInput from "components/ClinetAutocompleteInput";
import MonitorAutocompleteInput from "components/MonitorAutocompleteInput";
import VoitureAutocompleteInput from "components/VoitureAutocompleteInput"

import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
//import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


import { addSeance } from "../Services/SeanceServices";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import styles from "assets/jss/material-dashboard-react/views/componentsSections/javascriptStyles";
import SelectInput from "@material-ui/core/Select/SelectInput";


const useStyles = makeStyles(styles);


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


function GetFormattedDate(date) {
var day = date.getDate()
var month = date.getMonth()+1
var year= date.getFullYear()
return day+"/"+month+"/"+year

}

function SeanceModal(props){
    const classes = useStyles();
    const [date,setDate]=useState("")
    const [heureDebut,setHeureDebut]=useState(null)
    const [heureFin,setHeureFin]=useState(null)
    const [type,setType]=useState("")
    const [cinEleve,setCinEleve]=useState("")
    const [cinMoniteur,setCinMoniteur]=useState("")
    const [monitorAutocompleteInputDisabled,setMonitorAutocompleteInputDisabled]=useState(true)

    const [voitureAutocompleteDisabled,setVoitureAutocompleteDisabled]=useState(true)
    const [voitueAutocompleteValue,setVoitueAutocompleteValue]=useState(null)
    const [immatriculation,setImmatriculation]=useState("")

    const[eleveAutocompleteValue,setEleveAutocompleteValue]=useState(null)
    const[moniteurAutocompleteValue,setMoniteurAutocompleteValue]=useState(null)

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);


    const [errorMessage,setErrorMessage]=useState(null)
    
    const DateTimeSeanceStr = ()=>{
        if (props.selectInfoData != null){
            
            return(
                <>
                    Ajouter une seance le {GetFormattedDate(props.selectInfoData.start)} a partir de {props.selectInfoData.start.getHours()} jusqu'a {props.selectInfoData.end.getHours()} 
                </>
            )
        }else{
            return(
                <>nothing</>
                
            )
        }
    }

    const onClickAddSeance = async () =>{
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        
      }

      const seance = {"cin_Eleve": cinEleve,"Cin_Moniteur" : cinMoniteur , "Date":GetFormattedDate(props.selectInfoData.start),"Heure_debut":props.selectInfoData.start.getHours(),"Heure_fin":props.selectInfoData.end.getHours(),"Type":type,"immatriculation_Voiture":immatriculation}
      const result =await addSeance(seance)
      console.log(result)
      
      if(result.status==201){
        setSuccess(true);
        setLoading(false);
        await props.refetchData()
        setCinEleve("")
        setType("")
        setMonitorAutocompleteInputDisabled(true)
        setEleveAutocompleteValue(null)
        setMoniteurAutocompleteValue(null)
        setVoitueAutocompleteValue(null)
        
        props.setClassicModal(false)
        //props.getData() a refaire avec les seances
      }else if(result.status==215){
        alert("Moniteur ou voiture non disponible")
        setSuccess(true);
        setLoading(false);
      }

     
      //setClassicModal(false)
    }
    
    return(
        <div>
            <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            open={props.classicModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setClassicModal(false)}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
          >
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <IconButton
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => props.setClassicModal(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>Ajouter Une Seance</h4>
            </DialogTitle>

            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
                {DateTimeSeanceStr()}
                <ClinetAutocompleteInput setCinEleve = {setCinEleve} eleveAutocompleteValue={eleveAutocompleteValue} setEleveAutocompleteValue={setEleveAutocompleteValue}/>

                <FormControl >
                    <InputLabel id="Type">Type</InputLabel>  
                    <Select
                        labelId="Type"
                        
                        value={type}
                        onChange={e=>
                          {
                            setType(e.target.value);
                            setVoitureAutocompleteDisabled(e.target.value=="code")
                            setMonitorAutocompleteInputDisabled(false)
                            if(e.target.value=="conduit")
                              setVoitureAutocompleteDisabled(false)
                          }}
                    >

                        <MenuItem value={"code"}>Code</MenuItem>
                        <MenuItem value={"conduit"}>Conduit</MenuItem>
                    </Select>
                  </FormControl>
                <MonitorAutocompleteInput setCinMoniteur = {setCinMoniteur} monitorAutocompleteInputDisabled={monitorAutocompleteInputDisabled} type={type} setMoniteurAutocompleteValue={setMoniteurAutocompleteValue} moniteurAutocompleteValue={moniteurAutocompleteValue} />
                <VoitureAutocompleteInput voitureAutocompleteDisabled={voitureAutocompleteDisabled} setVoitueAutocompleteValue={setVoitueAutocompleteValue} voitueAutocompleteValue={voitueAutocompleteValue} setImmatriculation={setImmatriculation}/>

                {errorMessage}



            </DialogContent>
            <DialogActions className={classes.modalFooter}>
            <div style={{position:"relative"}}>
              <Button color="transparent" simple onClick={() =>onClickAddSeance() }>
                Ajouter
              </Button>
              {loading && <CircularProgress style={{position:"absolute",top:"25%",left:"35%"}} size={24}  />}
            </div>
              <Button
                onClick={() => props.setClassicModal(false)}
                color="danger"
                simple
              >
                Fermer
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}
export default SeanceModal;