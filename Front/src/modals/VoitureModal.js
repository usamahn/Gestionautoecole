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


import CircularProgress from '@material-ui/core/CircularProgress';


import { addVoiture } from "../Services/VoitureServices";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import styles from "assets/jss/material-dashboard-react/views/componentsSections/javascriptStyles";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { maroon } from 'color-name';


const useStyles = makeStyles(styles);


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });




function VoitureModal(props){
    const classes = useStyles();
    const [classicModal, setClassicModal] = useState(false);
    const [immatriculation, setImmatriculation] = useState("");
    const [Marque, setMarque] = useState("");



    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
  

    const onClickAddVoiture = async () =>{
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        
      }
      const voiture = {"immatriculation": immatriculation,"marque" : Marque }
      const result =await addVoiture(voiture)
      console.log(result)
      if(result.status==201){
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
            <Button color="success"  onClick={() => setClassicModal(true)}> Ajouter </Button>
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
              <h4 className={classes.modalTitle}>Ajouter une voiture</h4>
            </DialogTitle>

            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
                <CustomInput
                    labelText="Immatriculation"
                    id="Immatriculation"
                    formControlProps={{
                    fullWidth: true,
                    }}
                    
                    inputProps={{
                        value:immatriculation,
                        onChange:e=>setImmatriculation(e.target.value)
                    }}
                    
                />
                <CustomInput
                    labelText="Maruqe"
                    id="marque"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:Marque,
                        onChange:e=>setMarque(e.target.value)
                    }}
                    
                />
     

              



            </DialogContent>
            <DialogActions className={classes.modalFooter}>
            <div style={{position:"relative"}}>
              <Button color="transparent" simple onClick={() =>onClickAddVoiture() }>
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
export default VoitureModal;