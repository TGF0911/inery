import {Request, Response} from 'express'
import Patient from '../models/Patient'
import {getRepository} from 'typeorm'


export default {
  async store(req : Request, res: Response){
   const email = req.params

   const patientRepository = getRepository(Patient)

   const patient = await patientRepository.findOneOrFail({
     where : {email : email}
   })

  if(!patient) return res.status(401).json({message : 'Invalid email'})   
  
  return res.status(201).json(patient)
  }
}