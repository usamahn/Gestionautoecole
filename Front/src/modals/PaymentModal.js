import 'date-fns';

import React,{useState, useEffect} from "react";
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

import ClinetAutocompleteInput from "components/ClinetAutocompleteInput";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';



import CircularProgress from '@material-ui/core/CircularProgress';

import { getMontantRestant} from "../Services/ClientServices";

import { addPayment } from "../Services/PaymentServices";

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

  function GetFormattedDate(date) {
    var day = date.getDate()
    var month = date.getMonth()+1
    var year= date.getFullYear()
    return day+"/"+month+"/"+year
    
    }


function PaymentModal(props){
    const classes = useStyles();
    const [classicModal, setClassicModal] = useState(false);

    const[cinEleve,setCinEleve]=useState("")
    const[eleveAutocompleteValue,setEleveAutocompleteValue]=useState(null)
    const[montant,setMontant]=useState("")

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const[date,setDate]=useState(new Date())

    const[montantRestant,setMontantRestant] =useState(0)
    const[buttonDisabled,setButtonDisabled] =useState(false)

    const onClickAddExamen = async () =>{
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        
      }
      const payment = {"cin_Eleve": cinEleve,"date" : GetFormattedDate(date) ,"montant":parseInt(montant)}
      const result =await addPayment(payment)
      console.log(result)
      if(result.status==201){
        setSuccess(true);
        setLoading(false);
        setClassicModal(false)
        setEleveAutocompleteValue(null)
        setCinEleve("")
        setMontant("")
        setDate(new Date())
        setMontantRestant(0)
        props.getData()
      }else{
        setSuccess(true);
        setLoading(false);
      }

     
      //setClassicModal(false)
    }

    async function fetchtMontantRestant(cin){
      try{

        const montant_restant= await getMontantRestant(cin)
        setMontantRestant(montant_restant.data)
        setButtonDisabled(false)
      }catch(e){
        setMontantRestant("pas de seances encore")
        setButtonDisabled(true)
      }
        
        
    }
    useEffect(()=>{
      async function fetchData(){
        if(cinEleve!=""){
          const resp=await fetchtMontantRestant(cinEleve)
          
      }
      }
      fetchData()
      
    },[cinEleve])

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
              <h4 className={classes.modalTitle}>Ajouter une paiement</h4>
            </DialogTitle>

            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >

                <ClinetAutocompleteInput setCinEleve = {setCinEleve} eleveAutocompleteValue={eleveAutocompleteValue} setEleveAutocompleteValue={setEleveAutocompleteValue}/>


                  <h4>Montant Restant : {montantRestant}</h4>
                <FormControl >

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={date}
                        onChange={date=>setDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
 
                </MuiPickersUtilsProvider>
                  </FormControl>
                  
                  <CustomInput
                    labelText="montant"
                    id="montant"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        value:montant,
                        onChange:e=>setMontant(e.target.value)
                    }}
                    
                />

                   

              



            </DialogContent>
            <DialogActions className={classes.modalFooter}>
            <div style={{position:"relative"}}>
              <Button disabled={buttonDisabled} color="transparent" simple onClick={() =>onClickAddExamen() }>
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
export default PaymentModal;