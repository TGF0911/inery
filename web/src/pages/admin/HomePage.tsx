import React, { useEffect, useState } from 'react';

import Sidebar from '../../components/SideBar'
import listImg from '../../assets/medical-records.svg'
import pillsImg from '../../assets/pills.svg'

import '../../styles/pages/admin/home.css'
import { useHistory } from 'react-router-dom';
import api from '../../service/api';

interface Medicine {
  id: number;
  name: string;
  manufacturer: string;
  compund : string;
  description: string;
}


export default function HomePage() {

  // const history = useHistory()

  const [medicines, setMedicines] = useState<Medicine[]>([])

  useEffect(() => { 
    api.get('medicine').then(({data}) => setMedicines(data) )
  }, [])

  return (
    <div id="home-container">
      <Sidebar />
      <div className="main-container">

        <main>
          <header>

            <div className="intro">
              <h2>Bem-vindo Administrador!</h2>
              <p>Aqui você terá controle de alguns dados.</p>
            </div>
          </header>

          <div className="container">

            {/* <div className="list-page">
              <img src={listImg} alt="Lista de remédios" />

              <p>Lisa de remédios já cadastrados.</p>
            </div>

            <div className="create-page">
              <img src={pillsImg} alt="Cadastrar remédios" />

              <p>Cadastre remédios.</p>

            </div> */}
            <div className="title-container">
              <img src={listImg} alt="Lista de remédios" />
              <h1>Remédios Cadastrados</h1>

            </div>

            <ul>
              <li>
                <img src={listImg} alt="Lista de remédios" />
                <strong>Remédio:</strong>
                <p>Loratadina</p>

                <strong>Descrição:</strong>
                <p>Remédio para alergia.</p>
              </li>


              <li>
                <img src={listImg} alt="Lista de remédios" />
                <strong>Remédio:</strong>
                <p>Loratadina</p>

                <strong>Descrição:</strong>
                <p>Remédio para alergia.</p>
              </li>

              <li>
                <img src={listImg} alt="Lista de remédios" />
                <strong>Remédio:</strong>
                <p>Loratadina</p>

                <strong>Descrição:</strong>
                <p>Remédio para alergia.</p>
              </li>

              <li>
                <img src={listImg} alt="Lista de remédios" />
                <strong>Remédio:</strong>
                <p>Loratadina</p>

                <strong>Descrição:</strong>
                <p>Remédio para alergia.</p>
              </li>

              <li>
                <img src={listImg} alt="Lista de remédios" />
                <strong>Remédio:</strong>
                <p>Loratadina</p>

                <strong>Descrição:</strong>
                <p>Remédio para alergia.</p>
              </li>
            </ul>

          </div>

        </main>
      </div>
    </div>
  )
}