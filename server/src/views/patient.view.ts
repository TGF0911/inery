import Patient from '../models/Patient'

export default {
  render(patient: Patient) {
    return {
      id: patient.id,
      name: patient.name,
      email : patient.email,
      cpf : patient.cpf,
      photo : `http:////192.168.0.10:3333/uploads/${patient.photo}`,
    }
  },

  renderMany (patients : Patient[]) {
    return patients.map(patient => this.render(patient))
  }
}