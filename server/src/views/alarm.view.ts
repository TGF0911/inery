import Alarm from '../models/Alarm'
import convertMinutesToHours from '../utils/convertMinutesToHours'
import weekView from '../views/week_day.view'


export default {
  render(alarms: Alarm){
    return {
      id : alarms.id,
      hours : alarms.hour,
      week_days : weekView.renderMany(alarms.week_days)
    }
  },

  renderMany(alarms: Alarm[]){
    return alarms.map(alarm => this.render(alarm))
  }
}