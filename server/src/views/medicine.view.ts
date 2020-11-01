import Medicine from '../models/Medicine'


export default {
  render(medicine : Medicine){
    return { 
      id : medicine.id,
      name : medicine.name,
      manufacturer : medicine.manufacturer,
      description: medicine.description,
      compund : medicine.compund,
      photo : `http://192.168.0.10:3333/uploads/${medicine.photo}`
    }
  },
  renderMany (medicines : Medicine[]) {
    return medicines.map(medicine => this.render(medicine))
  }
}