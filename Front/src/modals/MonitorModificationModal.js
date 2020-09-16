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


import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
//import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';


import { editMonitor } from "../Services/MonitorServices";

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

  function GetDate(stringDate) {
    var dateParts = stringDate.split("/");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    return dateObject
}

function GetFormattedDate(date) {
var day = date.getDate()
var month = date.getMonth()+1
var year= date.getFullYear()
return day+"/"+month+"/"+year

}

function MonitorModificationModal(props){
    const classes = useStyles();
    const [classicModal, setClassicModal] = useState(false);
    const [cin, setCin] = useState(props.monitor.cin_Moniteur);
    const [nom, setNom] = useState(props.monitor.nom);
    const [prenom, setPrenom] = useState(props.monitor.prenom);
    const [dateNaissance, setDateNaissance] = useState(GetDate(props.monitor.date_naissance));
    const [adresse, setAdresse] = useState(props.monitor.adresse);
    const [tel, setTel] = useState(props.monitor.adresse);
    const [type, setType] = useState(props.monitor.type);


    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
  

    const onClickAddMonitor = async () =>{
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        
      }
      const monitor = {"cin_Moniteur": cin,"nom" : nom , "prenom":prenom,"date_naissance":GetFormattedDate(dateNaissance),"adresse":adresse,"tel":tel,"type":type}
      console.log(GetFormattedDate(dateNaissance))
      const result =await editMonitor(cin ,monitor)
      //console.log(result)
      if(result.status==204){
        setSuccess(true);
        setLoading(false);
        setClassicModal(false)
        props.getData()
      }else{
        setSuccess(true);
        setLoading(false);
      }

     
      //setClassicModal(false)
    }

    return(
        <div>
            <Button color="info"  onClick={() => setClassicModal(true)}> Modifier </Button>
            <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            open={classicModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setClassicModal(false)}
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
                onClick={() => setClassicModal(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
              <h4 className={classes.modalTitle}>Ajouter Un Eleve</h4>
            </DialogTitle>

            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
                <CustomInput
                    labelText="CIN"
                    id="cin"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:cin,
                        onChange:e=>setCin(e.target.value)
                    }}
                    
                />
                <CustomInput
                    labelText="Nom"
                    id="nom"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:nom,
                        onChange:e=>setNom(e.target.value)
                    }}
                    
                />
                <CustomInput
                    labelText="Prenom"
                    id="prenom"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:prenom,
                        onChange:e=>setPrenom(e.target.value)
                    }}
                    
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={dateNaissance}
                        onChange={date=>setDateNaissance(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
 
                </MuiPickersUtilsProvider>

                <CustomInput
                    labelText="Adresse"
                    id="adresse"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:adresse,
                        onChange:e=>setAdresse(e.target.value)
                    }}
                    
                />
                <CustomInput
                    labelText="Tel"
                    id="tel"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:tel,
                        onChange:e=>setTel(e.target.value)
                    }}
                    
                />

                    <FormControl >
                    <InputLabel id="Type">Age</InputLabel>  
                    <Select
                        labelId="Type"
                        value={type}
                        onChange={e=>setType(e.target.value)}
                    >

                        <MenuItem value={"code"}>Code</MenuItem>
                        <MenuItem value={"conduit"}>Conduit</MenuItem>
                    </Select>
                    </FormControl>

            </DialogContent>
            <DialogActions className={classes.modalFooter}>
            <div style={{position:"relative"}}>
              <Button color="transparent" simple onClick={() =>onClickAddMonitor() }>
                Modifier
              </Button>
              {loading && <CircularProgress style={{position:"absolute",top:"25%",left:"35%"}} size={24}  />}
            </div>
              <Button
                onClick={() => setClassicModal(false)}
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
export default MonitorModificationModal;