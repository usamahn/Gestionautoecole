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
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
//import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@material-ui/core/Checkbox';


import { addPrix } from "../Services/PrixServices";

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

function PrixModal(props){
    const classes = useStyles();
    const [classicModal, setClassicModal] = useState(false);
    const[type,setType]=useState(props.type)
    const[etat,setEtat]=useState(true)
    const [dateDebut,setDateDebut]=useState(new Date())
    const [dateFin,setDateFin]=useState(new Date())
    const [montant,setMontant]=useState(0)


    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
  

    const onClickAddPrix = async () =>{
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        
      }
      const prix = {"type": type,"montant" :parseInt(montant), "etat":etat?"actuelle":"non actuelle","date_debut":GetFormattedDate(dateDebut),"date_fin":GetFormattedDate(dateFin)}
      console.log(prix)
      const result =await addPrix(prix)
      //console.log(result)
      if(result.status==201){
        setSuccess(true);
        setLoading(false);
        setClassicModal(false)
        props.getData()
        setType("")
        setEtat("")
        setMontant(0)
        setDateDebut(new Date())
        setDateFin(new Date())
      }else{
        setSuccess(true);
        setLoading(false);
      }

     
      //setClassicModal(false)
    }

    return(
        <div>
            <Button color="success"  onClick={() => setClassicModal(true)}> Ajouter Un Prix </Button>
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
              <h4 className={classes.modalTitle}>Ajouter Un Prix</h4>
            </DialogTitle>

            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
            <FormControl>
                <CustomInput
                    labelText="montant"
                    id="montant"
                    
                    formControlProps={{
                    fullWidth: true,
                    
                    }}
                    inputProps={{
                        value:montant,
                        onChange:e=>setMontant(e.target.value),
                        type:"number"

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
                        value={dateDebut}
                        onChange={date=>setDateDebut(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
 
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={dateFin}
                        onChange={date=>setDateFin(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
 
                </MuiPickersUtilsProvider>

                <FormControlLabel
                control={
                        <Checkbox
                            checked={etat}
                            onChange={(e)=>setEtat(e.target.checked)}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Prix actuelle"
                />
            </FormControl>



            </DialogContent>
            <DialogActions className={classes.modalFooter}>
            <div style={{position:"relative"}}>
              <Button color="transparent" simple onClick={() =>onClickAddPrix() }>
                Ajouter
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
export default PrixModal;