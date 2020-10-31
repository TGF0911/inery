import Medicine from '../models/Medicine'
import Recipe from '../models/Recipe'
import alarmView from './alarm.view'


export default {
  render(recipe: Recipe){
    return {
      id : recipe.id,
      medicine_id : recipe.medicine_id,
      description : recipe.description,
      alarms : alarmView.renderMany(recipe.alarms)
    }

  },

  renderMany(recipe: Recipe[]){
    return recipe.map((recipe) => this.render(recipe))
  }
}