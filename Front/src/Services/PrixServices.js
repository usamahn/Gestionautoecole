import axios from 'axios'



export async function getPrix(){
    const resp = await axios.get("https://localhost:5001/api/Prix")
    return resp
}
export async function getPrixbyId(id){
    const resp = await axios.get("https://localhost:5001/api/Prix/"+id)
    return resp
}

export async function addPrix(prix){
    
    const resp = await axios.post("https://localhost:5001/api/Prix",prix)
    
    return resp
}

export async function editPrix(id,prix){
    
    const resp = await axios.put("https://localhost:5001/api/Prix/"+id,prix)
    
    return resp
}

export async function deletePrix(id){
    
    const resp = await axios.delete("https://localhost:5001/api/Prix/"+id)
    
    return resp
}