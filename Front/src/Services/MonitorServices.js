import axios from 'axios'



export async function getMonitors(){
    const resp = await axios.get("https://localhost:5001/api/Moniteur")
    return resp
}
export async function getMonitorsbyType(type){
    const resp = await axios.get("https://localhost:5001/api/Moniteur?type="+type)
    return resp
}

export async function getMonitor(cin){
    const resp = await axios.get("https://localhost:5001/api/Moniteur/"+cin)
    return resp
}

export async function addMonitor(Monitor){
    
    const resp = await axios.post("https://localhost:5001/api/Moniteur",Monitor)
    
    return resp
}

export async function editMonitor(cin,Monitor){
    
    const resp = await axios.put("https://localhost:5001/api/Moniteur/"+cin,Monitor)
    
    return resp
}

export async function deleteMonitor(cin){
    
    const resp = await axios.delete("https://localhost:5001/api/Moniteur/"+cin)
    
    return resp
}

export async function getHoursbyMonitorCurrentMonth(){
    const resp = await axios.get("https://localhost:5001/api/moniteur/HoursbyMonitorCurrentMonth")
    return resp
}