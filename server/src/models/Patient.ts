import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate} from 'typeorm'
import Recipe from './Recipe'


@Entity('patient')
export default class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({length: 12})
  cpf: string;

  @Column()
  photo?: string;

  @OneToMany(() => Recipe, (recipe) => recipe.patient_id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name : 'patient_id'})
  recipes: Recipe[];



}