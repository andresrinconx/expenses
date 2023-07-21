import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, mensaje, setMensaje, guardarGasto, gastoEditar, setGastoEditar}) => {
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if([nombre, cantidad, categoria].includes('')) {
      setMensaje('Todos los campos son obligatorios')

      setTimeout(() => {
        setMensaje('')
      }, 3000);
      return
    }

    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  const ocultarModal = () => {
    setModal(false)
    setAnimarModal(false)
    setGastoEditar({})
  }

  return (
    <div className='modal'>
      <div className='cerrar-modal'>
        <img src={CerrarBtn} alt='cerrar modal' onClick={ocultarModal} />
      </div>

      <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

        <div className='campo'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            id='nombre'
            placeholder='Nombre del Gasto'
            type='text'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input
            id='cantidad'
            placeholder='Cantidad del Gasto. ej. 300'
            type='text'
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Categoria</label>
          <select 
            id='categoria'
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option disabled value=''>-- Seleccione --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos Varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>

        <input
          type='submit'
          onClick={handleSubmit}
          value={gastoEditar.nombre ? 'Editar Gasto' : 'Guardar Gasto'}
        />

      </form>
    </div>
  )
}

export default Modal
