import axios from 'axios'



export async function getClients(){
    const resp = await axios.get("https://localhost:5001/api/Eleve")
    return resp
}
export async function getClient(cin){
    const resp = await axios.get("https://localhost:5001/api/Eleve/"+cin)
    return resp
}

export async function addClient(Client){
    
    const resp = await axios.post("https://localhost:5001/api/Eleve",Client)
    
    return resp
}

export async function editClient(cin,Client){
    
    const resp = await axios.put("https://localhost:5001/api/Eleve/"+cin,Client)
    
    return resp
}

export async function deleteClient(cin){
    
    const resp = await axios.delete("https://localhost:5001/api/Eleve/"+cin)
    
    return resp
}


export async function getMontantRestant(cin){
    
    const resp = await axios.get("https://localhost:5001/api/Eleve/MontantRestant/"+cin)
    
    return resp
}