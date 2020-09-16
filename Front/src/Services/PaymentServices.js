import axios from 'axios'



export async function getPayments(){
    const resp = await axios.get("https://localhost:5001/api/Paiement")
    return resp
}
export async function getPayment(id){
    const resp = await axios.get("https://localhost:5001/api/Paiement/"+id)
    return resp
}

export async function addPayment(payment){
    
    const resp = await axios.post("https://localhost:5001/api/Paiement",payment)
    
    return resp
}

export async function editPayment(id,payment){
    
    const resp = await axios.put("https://localhost:5001/api/Paiement/"+id,payment)
    
    return resp
}

export async function deletePayment(id){
    
    const resp = await axios.delete("https://localhost:5001/api/Paiement/"+id)
    
    return resp
}