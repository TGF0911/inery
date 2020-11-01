import api from "../service/api";

export default async function sendToIoT(week_day : number, hours : number){
  await api.get(`/iot/${week_day}/${hours}`)
  return
}

