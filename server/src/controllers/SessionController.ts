import {Request, Response} from 'express'
import Patient from '../models/Patient'
import {getRepository} from 'typeorm'


export default {
  async store(req : Request, res: Response){
    const {email, password} = req.body

    console.log(email, password)

    const patientRepository = getRepository(Patient)
  const patient = await patientRepository.findOneOrFail(
    {where: {email : email}},
  )

  if(!email) return res.status(401).json({message : 'Email not found'})

  if(password !=  patient.password) return res.status(401).json({message : 'Not that password'})

  return res.status(201).json(patient)
  }
}