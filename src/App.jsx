import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal'
import {generarId} from './helpers'
import ListadoGastos from './components/ListadoGastos'
import Filtro from './components/Filtro'

const App = () => {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [mensaje, setMensaje] = useState('')
 
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      handleModal()
    }    
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', JSON.stringify(presupuesto))
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  const handleModal = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {
    if(gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Nuevo
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }

    setTimeout(() => {
      setModal(false)
    }, 500);

    setGastoEditar({})
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
    setGastoEditar({})
  }

  return (
    <div className={modal && 'fijar'}>
      <Header 
        presupuesto={presupuesto}
        isValidPresupuesto={isValidPresupuesto}
        mensaje={mensaje}
        setMensaje={setMensaje}
        gastos={gastos}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setPresupuesto={setPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto
        && (
          <>
            <main>
              <Filtro
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos  
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>  
            <div className='nuevo-gasto'>
              <img src={IconoNuevoGasto} alt='icono nuevo gasto' onClick={handleModal}/>
            </div>
          </>
        )
      }

      {modal
        && (
          <Modal 
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            mensaje={mensaje}
            setMensaje={setMensaje}
            guardarGasto={guardarGasto}
            gastos={gastos}
            setGastos={setGastos}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )
      }

    </div>
  )
}

export default App

