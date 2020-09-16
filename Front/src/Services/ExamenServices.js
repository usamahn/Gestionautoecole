import axios from 'axios'



export async function getExamens(){
    const resp = await axios.get("https://localhost:5001/api/Examen")
    return resp
}
export async function getExamen(id){
    const resp = await axios.get("https://localhost:5001/api/Examen/"+id)
    return resp
}

export async function addExamen(examen){
    
    const resp = await axios.post("https://localhost:5001/api/Examen",examen)
    
    return resp
}

export async function editExamen(id,examen){
    
    const resp = await axios.put("https://localhost:5001/api/Examen/"+id,examen)
    
    return resp
}

export async function deleteExamen(id){
    
    const resp = await axios.delete("https://localhost:5001/api/Examen/"+id)
    
    return resp
}