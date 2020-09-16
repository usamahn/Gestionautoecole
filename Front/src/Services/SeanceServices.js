import axios from 'axios'


export async function getSeances(){
    const resp = await axios.get("https://localhost:5001/api/Seance")
    return resp
}


export async function addSeance(Seance){
    const resp = await axios.post("https://localhost:5001/api/Seance",Seance)
    return resp
}



export async function deleteSeance(id){
    
    const resp = await axios.delete("https://localhost:5001/api/Seance/"+id)
    
    return resp
}