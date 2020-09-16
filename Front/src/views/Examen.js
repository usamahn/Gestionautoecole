import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { getExamens,deleteExamen } from "../Services/ExamenServices";
import { getClient } from "../Services/ClientServices";

import { Formik, Field, Form, ErrorMessage } from 'formik';


import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";



import ExamenModal from "modals/ExamenModal";
import ExamenModificationModal from "modals/ExamenModificationModal";

import VoitureModificationModal from "modals/VoitureModificationModal";
import { func } from "prop-types";


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


const Examen = (props) => {

  const classes = useStyles();
  const getData = async () => {
    const result = await getExamens()
    
    setData(result.data)
  }

  async function fetchExamenData(examen){
        var client = await getClient(examen.cin_Eleve)
        var examen_result = examen;
        examen_result["nom"]=client.data.prenom+" "+ client.data.nom
        setExamenData(prev=>([...prev,examen_result]))
  }


  const [data, setData] = useState([])
  const [examenData, setExamenData] = useState([])
  useEffect(() => { getData() }, [] )

  useEffect(()=>{
      setExamenData([])
      data.forEach(d=>{
          fetchExamenData(d)
          
      })
  },[data])
  
  const onDeleteButtonClick = async (id)=>{
    const result = await deleteExamen(id)
    getData()
  }
  const examensTab = examenData.map(e=>[e.cin_Eleve,e.nom,e.type,e.date,e.etat,<ExamenModificationModal examen={e} getData={getData}/>,<Button color="danger" onClick={async()=>await onDeleteButtonClick(e.id_Examen)}>Supprimer</Button>])
  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Les Examens</h4>
          <p className={classes.cardCategoryWhite}>
            
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["CIN", "Nom et Prenom","Type","Date","Etat"]}
            tableData={examensTab}
          />
        </CardBody>
      </Card>



      <ExamenModal getData={getData} />



    </>
  )

}
export default Examen;