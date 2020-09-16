import 'date-fns';

import React,{useState} from "react";
import { makeStyles,withStyles  } from "@material-ui/core/styles";

import Slide from "@material-ui/core/Slide";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import Button from "components/CustomButtons/Button.js";
import { deleteSeance } from "../Services/SeanceServices";


import CircularProgress from '@material-ui/core/CircularProgress';


import styles from "assets/jss/material-dashboard-react/views/componentsSections/javascriptStyles";


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
function SeanceClickedModal(props){
    const classes = useStyles();
    const [classicModal, setClassicModal] = useState(false);



    const [loading, setLoading] = React.useState(false);
  
const onClickDeleteSeance=async () =>{
    const result=await deleteSeance(parseInt(props.selectedEvent.id))
    if(result.status==200){
      await props.refetchData()
      props.setDeleteModalOpen(false)
    }
    
}

    return(
        <div>
            
            <Dialog
            classes={{
              root: classes.center,
              paper: classes.modal
            }}
            open={props.deleteModalOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setDeleteModalOpen(false)}
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
                onClick={() => props.setDeleteModalOpen(false)}
              >
                <Close className={classes.modalClose} />
              </IconButton>
              <h5 className={classes.modalTitle}>Details du seance</h5>
            </DialogTitle>

            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <h5>le {GetFormattedDate(props.selectedEvent.start)} a partir de {props.selectedEvent.start.getHours()} jusqu'a {props.selectedEvent.end.getHours()}</h5>
              <h5>Eleve: {props.selectedEvent.extendedProps.eleve}</h5>
              <h5>Moniteur: {props.selectedEvent.extendedProps.moniteur}</h5>
              <h5>Seance de  {props.selectedEvent.extendedProps.type}</h5>
              

            </DialogContent>
            <DialogActions className={classes.modalFooter}>
            <div style={{position:"relative"}}>
              <Button color="transparent" simple onClick={() =>onClickDeleteSeance() }>
                Supprimer
              </Button>
              {loading && <CircularProgress style={{position:"absolute",top:"25%",left:"35%"}} size={24}  />}
            </div>
              <Button
                onClick={() => props.setDeleteModalOpen(false)}
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
export default SeanceClickedModal;