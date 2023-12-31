import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto, mensaje, setMensaje}) => {
  const handlePresupuesto = (e) => {
    e.preventDefault()

    if(!presupuesto || presupuesto < 0) {
      setMensaje('It isn\'t a valid budget')
      return
    }
    setMensaje('')
    setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label>Define Budget</label>
          <input className='nuevo-presupuesto'
            placeholder='Add your budget'
            type='number'
            value={presupuesto}
            onChange={e => setPresupuesto(Number(e.target.value))}
          />
        </div>
        <input type="submit" value='Add' />

        {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
