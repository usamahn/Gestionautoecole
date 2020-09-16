import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { getClients,deleteClient } from "../Services/ClientServices";

import { Formik, Field, Form, ErrorMessage } from 'formik';


import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";



import ClientsModals from "modals/ClientsModals";
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


const Clients = (props) => {

  const classes = useStyles();
  const getData = async () => {
    const result = await getClients()
    
    setData(result.data)
  }


  const [data, setData] = useState([])
  useEffect(() => { getData() }, [] )

  const onDeleteButtonClick = async (cin)=>{
    const result = await deleteClient(cin)
    console.log(cin)
    getData()
  }
  const clientsTab = data.map(c=>[c.cin_Eleve, c.nom,c.prenom,c.date_naissance,c.adresse,c.tel,<ClientModificationModal client={c} getData={getData}/>, <Button color="danger" onClick={async()=>await onDeleteButtonClick(c.cin_Eleve)}>Supprimer</Button>])
  return (
    <>
      
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Les éleves</h4>
          <p className={classes.cardCategoryWhite}>
            Tous les élèves et leurs informations personnelles
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["CIN", "Nom", "Prenom", "Date de naissance", "Adresse", "Tel"]}
            tableData={clientsTab}
          />
        </CardBody>
      </Card>



      <ClientsModals getData={getData} />



    </>
  )

}
export default Clients;