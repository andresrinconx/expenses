import React from 'react'

const Filtro = ({setFiltro, filtro}) => {
  return (
    <div className='filtros sombra contenedor'>
      <form className=''>
        <div className='campo'>
          <label>Filter Expenses</label>
          <select
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          >
            <option value=''>-- All categories --</option>
            <option value='saving'>Saving</option>
            <option value='food'>Food</option>
            <option value='home'>Home</option>
            <option value='expenses'>Miscellaneous Expenses</option>
            <option value='leisure'>Leisure</option>
            <option value='health'>Health</option>
            <option value='suscriptions'>Suscriptions</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filtro
