import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/uploads'


import AlarmController from './controllers/AlarmController'
import MedicineController from './controllers/MedicineController'
import PatientController from './controllers/PatientController'
import RecipeController from './controllers/RecipeController'
import IoTController from './controllers/IoTController'
import SessionController from './controllers/SessionController'

const routes = Router()
const uploads = multer(uploadConfig)

routes.post('/patient', uploads.single('photo'),PatientController.create)
routes.get('/patient', PatientController.index)
routes.get('/patient/:id', PatientController.show)
routes.put('/patient/:id', uploads.single('photo'), PatientController.update)
routes.delete('/patient/:id', PatientController.delete)

routes.post('/medicine', uploads.single('photo'),MedicineController.create)
routes.get('/medicine', MedicineController.index)
routes.get('/medicine/:id', MedicineController.show)
routes.put('/medicine/:id', uploads.single('photo'), MedicineController.update)
routes.delete('/medicine/:id', MedicineController.delete)

routes.post('/recipe', RecipeController.create)
routes.get('/recipe', RecipeController.index)
routes.get('/recipe/:id', RecipeController.show)
routes.put('/recipe/:id',  RecipeController.update)
routes.delete('/recipe/:id', RecipeController.delete)

routes.post('/alarm/:recipe_id', AlarmController.create)
routes.get('/alarm/:recipe_id', AlarmController.index)
routes.get('/alarm/:id', AlarmController.show)
routes.put('/alarm/:id', AlarmController.update)
routes.delete('/alarm/:id', AlarmController.delete)

routes.post('/session/:email', SessionController.store)


routes.post('/iot/', IoTController.alarm)

export default routes