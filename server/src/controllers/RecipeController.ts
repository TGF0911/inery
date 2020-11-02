import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Alarm from '../models/Alarm'
import Recipe from '../models/Recipe'
import WeekDay from '../models/WeekDay'
import convertHourToMinutes from '../utils/convertToMinute'


export default {
  async create(req: Request, res: Response) {
    const { description, medicine_id, hour } = req.params

    const patient_id = 5
    const recipeRepository = getRepository(Recipe)

    const alarmRepository = getRepository(Alarm)

    const weeks = [
      {
        week_day : 1
      },
      {
        week_day : 3
      },
      {
        week_day : 4
      }
    ] as WeekDay[]
   
    const week_days = weeks.map((week: WeekDay) => {
     
      return { week_day: week.week_day }
    })

	console.log(description,' :',medicine_id, ':', hour, ':', patient_id )


    const recipeData = {
      patient_id,
      medicine_id : Number(medicine_id),
      description,
    }
    const recipe = recipeRepository.create(recipeData)
    await recipeRepository.save(recipe);


    const alarms = {
      recipe_id: recipe.id,
      hour: convertHourToMinutes(hour),
      week_days
    }


    const alarm = alarmRepository.create(alarms)


    await alarmRepository.save(alarm);


    return res.status(201).json(recipe)

  },

  async index(req: Request, res: Response) {
    const patient_id = req.headers.authorization
    const recipeRepository = getRepository(Recipe)

    const recipes = await recipeRepository.find({
      where: { patient_id: Number(patient_id) },
      relations: ['alarms'], 
    })

    return res.json(recipes)
  },

  async show(req: Request, res: Response) {
    const recipeRepository = getRepository(Recipe)
    const { id } = req.params

    const recipe = await recipeRepository.findOneOrFail(
      id,
      { 
        relations: ['alarms'],
        loadRelationIds : { 
          relations : ['medicine_id']
        }
      },
    )

    if (!recipe) return res.status(401)

    return res.json(recipe)
  },

  async update(req: Request, res: Response) {
    const { id } = req.params

    const recipeRepository = getRepository(Recipe)

    const recipe = await recipeRepository.findOneOrFail(id)

    if (!recipe) return res.status(401)

    recipeRepository.merge(recipe, req.body)
    const results = await recipeRepository.save(recipe)
    return res.json(results)
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const recipeRepository = getRepository(Recipe)

    const recipe = await recipeRepository.findOneOrFail(id)

    if (!recipe) return res.status(401)

    await recipeRepository.delete(recipe)

    return res.status(204).json({ message: 'recipe deleted', recipe })
  }
}
