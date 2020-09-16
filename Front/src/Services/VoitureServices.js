import axios from 'axios'



export async function getVoitures(){
    const resp = await axios.get("https://localhost:5001/api/Voiture")
    return resp
}


export async function getVoiture(id){
    const resp = await axios.get("https://localhost:5001/api/Voiture/"+id)
    return resp
}

export async function addVoiture(Voiture){
    
    const resp = await axios.post("https://localhost:5001/api/Voiture",Voiture)
    
    return resp
}

export async function editVoiture(id,Voiture){
    
    const resp = await axios.put("https://localhost:5001/api/Voiture/"+id,Voiture)
    
    return resp
}

export async function deleteVoiture(id){
    
    const resp = await axios.delete("https://localhost:5001/api/Voiture/"+id)
    
    return resp
}