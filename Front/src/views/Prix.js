import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Divider from '@material-ui/core/Divider';

import { getPrix,deletePrix } from "../Services/PrixServices";

import { Formik, Field, Form, ErrorMessage } from 'formik';


import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";



import PrixModal from "modals/PrixModal";
import ClientModificationModal from "modals/ClientModificationModal";


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


const Prix = (props) => {

  const classes = useStyles();
  const getData = async () => {

    const result = await getPrix()
    setPrixConduite([])
    setPrixCode([])
    setPrixExamenCode([])
    setPrixExamenConduite([])
    result.data.forEach(e => {
        if(e.type=="conduit")
            setPrixConduite(prev=>([...prev,e]))
        else if(e.type=="code")
            setPrixCode(prev=>([...prev,e]))
        else if(e.type=="exam_code")
          setPrixExamenCode(prev=>([...prev,e]))
        else if(e.type=="exam_conduit")
          setPrixExamenConduite(prev=>([...prev,e]))
        
    });
  }


  const [prixConduite, setPrixConduite] = useState([])
  const [prixCode, setPrixCode] = useState([])
  const [prixExamenCode, setPrixExamenCode] = useState([])
  const [prixExamenConduite, setPrixExamenConduite] = useState([])

  useEffect(() => { 
      getData() 
    }, [] )

  const onDeleteButtonClick = async (id)=>{
    const result = await deletePrix(id)
    getData()
  }
  const prixConduiteTab = prixConduite.map(p=>[p.montant,p.date_debut,p.date_fin,p.etat, <Button color="danger" onClick={async()=>await onDeleteButtonClick(p.id_Prix)}>Supprimer</Button>])
  const prixCodeTab = prixCode.map(p=>[p.montant,p.date_debut,p.date_fin,p.etat, <Button color="danger" onClick={async()=>await onDeleteButtonClick(p.id_Prix)}>Supprimer</Button>])
  const prixExamenCodeTab = prixExamenCode.map(p=>[p.montant,p.date_debut,p.date_fin,p.etat, <Button color="danger" onClick={async()=>await onDeleteButtonClick(p.id_Prix)}>Supprimer</Button>])
  const prixExamenConduiteTab = prixExamenConduite.map(p=>[p.montant,p.date_debut,p.date_fin,p.etat, <Button color="danger" onClick={async()=>await onDeleteButtonClick(p.id_Prix)}>Supprimer</Button>])

  return (
    <>
      
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Prix d'une seance de conduite</h4>
          <p className={classes.cardCategoryWhite}>
          Historique des prix d'une seance de conduite et le prix actuel
          </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Prix", "Date debut", "Date fin", "Etat"]}
            tableData={prixConduiteTab}
          />
        </CardBody>
      </Card>
      <PrixModal getData={getData} type={"conduit"} />
      <Divider variant="middle" style={{marginBottom:"100px"}} />

      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Prix d'une seance de code</h4>
          <p className={classes.cardCategoryWhite}>
          Historique des prix d'une seance de code et le prix actuel </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Prix", "Date debut", "Date fin", "Etat"]}
            tableData={prixCodeTab}
          />
        </CardBody>
      </Card>
      <PrixModal getData={getData} type={"code"} />
      <Divider variant="middle" style={{marginBottom:"100px"}} />
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Prix d'examen de conduite</h4>
          <p className={classes.cardCategoryWhite}>
          Historique des prix d'examen de conduite et le prix actuel
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Prix", "Date debut", "Date fin", "Etat"]}
            tableData={prixExamenConduiteTab}
          />
        </CardBody>
      </Card>
      <PrixModal getData={getData} type={"exam_conduit"} />
      <Divider variant="middle" style={{marginBottom:"100px"}} />
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Prix d'examen de code</h4>
          <p className={classes.cardCategoryWhite}>
          Historique des prix d'examen de code et le prix actuel
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Prix", "Date debut", "Date fin", "Etat"]}
            tableData={prixExamenCodeTab}
          />
        </CardBody>
      </Card>




      <PrixModal getData={getData} type={"exam_code"} />



    </>
  )

}
export default Prix;