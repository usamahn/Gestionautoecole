import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { getMonitors,deleteMonitor } from "../Services/MonitorServices";

import { Formik, Field, Form, ErrorMessage } from 'formik';


import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";



import MonitorsModal from "modals/MonitorsModal";
import MonitorModificationModal from "modals/MonitorModificationModal";


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


const Monitors = (props) => {

  const classes = useStyles();
  const getData = async () => {
    const result = await getMonitors()
    console.log(result)
    setData(result.data)
  }


  const [data, setData] = useState([])
  useEffect(() => { getData() }, [] )

  const onDeleteButtonClick = async (cin)=>{
    const result = await deleteMonitor(cin)
    getData()
  }
  const monitorsTab = data.map(m=>[m.cin_Moniteur, m.nom,m.prenom,m.date_naissance,m.adresse,m.tel,m.type,<MonitorModificationModal monitor={m} getData={getData}/>, <Button color="danger" onClick={async()=>await onDeleteButtonClick(m.Cin_Moniteur)}>Supprimer</Button>])
  return (
    <>
      <Card>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>Les Moniteurs</h4>
          <p className={classes.cardCategoryWhite}>
            Les moniteurs et leurs informations personnelles
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="info"
            tableHead={["CIN", "Nom", "Prenom", "Date de naissance", "Adresse", "Tel","Type"]}
            tableData={monitorsTab}
          />
        </CardBody>
      </Card>



      <MonitorsModal getData={getData} />



    </>
  )

}
export default Monitors;