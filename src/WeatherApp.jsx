import React, { useState } from 'react'

export const WeatherApp = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='
  const API_KEY = '7055b340331e571854c1fa2ba7b3a9bb'
  const diffKelvin = 273.15

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)



  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(ciudad)
    if (ciudad.length > 0) fetchClima()
  }

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}${ciudad}&appid=${API_KEY}&lang=es`)
      const data = await response.json()
      setDataClima(data)

    } catch (error) {
      console.error('Ocurrió el siguiente problema: ', error)

    }
  }

  return (
    <div className='container'>
      <h1>Aplicación de clima</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ciudad}
          onChange={handleCambioCiudad}
        />
        <button type='submit'>Buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp - diffKelvin)}°C</p>
            <p>Condición meteorológica: {dataClima?.weather[0]?.description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0]?.icon}@2x.png`}/>
          </div>
        )
      }
    </div>
  )
}
