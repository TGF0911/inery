import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Alarm from '../models/Alarm'
import Recipe from '../models/Recipe'
import WeekDay from '../models/WeekDay'
import convertHourToMinutes from '../utils/convertToMinute'
import recipeView from '../views/recipe.view'

export default {
  async create(req: Request, res: Response) {
    const { description, medicine_id, hour } = req.body

    const patient_id = Number(req.headers.authorization)

    const recipeRepository = getRepository(Recipe)

    const alarmRepository = getRepository(Alarm)

    const weeks = req.body.weeks as WeekDay[]
    // console.log("Fora do map", weeks)
    const week_days = weeks.map((week: WeekDay) => {
      // console.log("Dentro do map", week)
      return { week_day: week.week_day }
    })


    const recipeData = {
      patient_id,
      medicine_id,
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