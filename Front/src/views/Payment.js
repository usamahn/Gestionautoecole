import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { getPayments,deletePayment } from "../Services/PaymentServices";
import { getClient ,getMontantRestant} from "../Services/ClientServices";



import { Formik, Field, Form, ErrorMessage } from 'formik';


import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";



import PaymentModal from "modals/PaymentModal";
import PaymentModificationModal from "modals/PaymentModificationModal";


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


const Payment = (props) => {

  const classes = useStyles();
  const getData = async () => {
    const result = await getPayments()
    
    setData(result.data)
  }
  async function fetchPaymentData(payment){
    var client = await getClient(payment.cin_Eleve)
    
    var payment_result = payment;
    payment_result["nom"]=client.data.prenom+" "+ client.data.nom

    setPaymentData(prev=>([...prev,payment_result]))
}

  const [data, setData] = useState([])
    const[paymentData,setPaymentData] = useState([])


  useEffect(() => { getData() }, [] )
  useEffect(()=>{
    setPaymentData([])
    data.forEach(d=>{
        fetchPaymentData(d)
        
    })
},[data])

  const onDeleteButtonClick = async (id)=>{
    const result = await deletePayment(id)
    getData()
  }
  const paymentsTab = paymentData.map(p=>[p.cin_Eleve, p.nom,p.date,p.montant,<PaymentModificationModal payment={p} getData={getData}/>])
  return (
    <>
      <Card>
        <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>Les Paiements</h4>
          <p className={classes.cardCategoryWhite}>
            Les paiements effectuées par les élèves
                    </p>
        </CardHeader>
        <CardBody>
          <Table
            tableHeaderColor="warning"
            tableHead={["CIN", "Nom", "Date", "Montant", ]}
            tableData={paymentsTab}
          />
        </CardBody>
      </Card>



      <PaymentModal getData={getData} />



    </>
  )

}
export default Payment;