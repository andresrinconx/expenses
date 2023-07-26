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
      setMensaje('All fields are required')

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
        <img src={CerrarBtn} alt='close modal' onClick={ocultarModal} />
      </div>

      <form className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
        <legend>{gastoEditar.nombre ? 'Edit Expense' : 'New Expense'}</legend>
        {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

        <div className='campo'>
          <label htmlFor='nombre'>Name</label>
          <input
            id='nombre'
            placeholder='Expense Name.'
            type='text'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='cantidad'>Amount</label>
          <input
            id='cantidad'
            placeholder='Amount of the expense'
            type='text'
            value={cantidad}
            onChange={e => setCantidad(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor='categoria'>Category</label>
          <select 
            id='categoria'
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option disabled value=''>-- Select --</option>
            <option value='saving'>Saving</option>
            <option value='food'>Food</option>
            <option value='home'>Home</option>
            <option value='expenses'>Miscellaneous Expenses</option>
            <option value='leisure'>Leisure</option>
            <option value='health'>Health</option>
            <option value='suscriptions'>Suscriptions</option>
          </select>
        </div>

        <input
          type='submit'
          onClick={handleSubmit}
          value={gastoEditar.nombre ? 'Edit Expense' : 'Save Expense'}
        />

      </form>
    </div>
  )
}

export default Modal
