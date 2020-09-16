import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { getVoitures,deleteVoiture } from "../Services/VoitureServices";

import { Formik, Field, Form, ErrorMessage } from 'formik';


import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";



import VoitureModal from "modals/VoitureModal";
import VoitureModificationModal from "modals/VoitureModificationModal";


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


const Voiture = (props) => {

  const classes = useStyles();
  const getData = async () => {
    const result = await getVoitures()
    
    setData(result.data)
  }


  const [data, setData] = useState([])
  useEffect(() => { getData() }, [] )

  const onDeleteButtonClick = async (id)=>{
    const result = await deleteVoiture(id)
    getData()
  }
  const voituresTab = data.map(v=>[v.immatriculation,v.marque,<VoitureModificationModal voiture={v} getData={getData}/>, <Button color="danger" onClick={async()=>await onDeleteButtonClick(v.Immatriculation)}>Supprimer</Button>])
  return (
    <>
      <Card>
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Les Voitures</h4>
          <p className={classes.cardCategoryWhite}>
            Les voitures disponibles
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="danger"
            tableHead={["Immatriculation", "Marque"]}
            tableData={voituresTab}
          />
        </CardBody>
      </Card>



      <VoitureModal getData={getData} />



    </>
  )

}
export default Voiture;