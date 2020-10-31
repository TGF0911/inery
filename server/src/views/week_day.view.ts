import WeekDay from '../models/WeekDay'

export default {
  render(week: WeekDay){
    return {
      id : week.id,
      week_day : week.week_day
    }
  },

  renderMany (weeks : WeekDay[]){
    return weeks.map(week => this.render(week))
  }
}