import axios from 'axios'



export async function getNombreClients(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreClients")
    return resp
}

export async function getTauxReussite(){
    const resp = await axios.get("https://localhost:5001/api/Insights/TauxReussite")
    return resp
}

export async function getNbreHeuresMoyenne(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreMoyenneHeures")
    return resp
}

export async function getNombreMoniteurs(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreMoniteurs")
    return resp
}
export async function getNombreVoitures(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreVoitures")
    return resp
}

export async function getDailyHoursLastSevenDays(){
    const resp = await axios.get("https://localhost:5001/api/Insights/DailyHoursLastSevenDays")
    return resp
}

export async function getRevenuMoisActuel(){
    const resp = await axios.get("https://localhost:5001/api/Insights/RevenuMoisActuelle")
    return resp
}


export async function getNombreMoyenneHeuresParJour(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreMoyenneHeuresParJour")
    return resp
}

export async function getNombreClientsMoisActuel(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreClientsMoisActuel")
    return resp
}

export async function getRevenuDernier12Mois(){
    const resp = await axios.get("https://localhost:5001/api/Insights/RevenuDernier12Mois")
    return resp
}

export async function getNombreClientsDernier12Mois(){
    const resp = await axios.get("https://localhost:5001/api/Insights/NombreClientsDernier12Mois")
    return resp
}