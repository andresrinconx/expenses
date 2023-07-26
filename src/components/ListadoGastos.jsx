import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>
      {filtro
        ? (
          <>
            <h2>{gastosFiltrados.length ? 'Expenses' : 'There are no expenses in this category' }</h2>
            {gastosFiltrados.map((gasto) => {
              return (
                <Gasto
                  gasto={gasto} 
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              )
            })}
          </>
        ) : (
          <>
            <h2>{gastos.length ? 'Expenses' : 'There are no expenses' }</h2>
            {gastos.map((gasto) => {
              return (
                <Gasto
                  gasto={gasto} 
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              )
            })}
          </>
        )
      }
    </div>
  )
}

export default ListadoGastos
