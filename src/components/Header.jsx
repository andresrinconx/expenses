import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({
  presupuesto, 
  setPresupuesto, 
  setIsValidPresupuesto, 
  isValidPresupuesto, 
  mensaje, 
  setMensaje, 
  gastos, 
  setGastos, 
}) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto
        ? (
          <ControlPresupuesto
            gastos={gastos}
            presupuesto={presupuesto} 
            setIsValidPresupuesto={setIsValidPresupuesto}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
          />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            isValidPresupuesto={isValidPresupuesto}
            mensaje={mensaje}
            setMensaje={setMensaje}
          />
        )
      }
    </header>
  )
}

export default Header
