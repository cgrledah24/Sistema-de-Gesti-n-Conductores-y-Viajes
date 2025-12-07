import React, { useState, useEffect } from 'react'

// Very simple calendar: list of scheduled trips by date
export default function CalendarView({ user, rate }){
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [trips, setTrips] = useState(()=> JSON.parse(localStorage.getItem('dm_trips')||'[]'))

  useEffect(()=> localStorage.setItem('dm_trips', JSON.stringify(trips)), [trips])

  function scheduleTrip(){
    const id = Date.now()
    const newTrip = {
      id,
      date,
      time: '09:00',
      passenger: 'Cliente',
      driver: null,
      cost_usd: 10,
      accepted: false
    }
    setTrips([...trips, newTrip])
    alert('Viaje programado (demo). Añádelo y luego asigna o acepta desde panel de viajes.')
  }

  const visibleTrips = user.role === 'admin' ? trips : trips.filter(t=> t.driver === user.username)

  return (
    <div className="calendar">
      <h2>Calendario</h2>
      <div className="calendar-controls">
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <button onClick={scheduleTrip}>Programar viaje (demo)</button>
      </div>
      <div className="trips-list">
        {visibleTrips.length===0 ? <p>No hay viajes para la fecha seleccionada.</p> : visibleTrips.map(t=>(
          <div key={t.id} className="trip-card">
            <div>{t.date} {t.time} — {t.passenger}</div>
            <div>Conductor: {t.driver || 'Sin asignar'}</div>
            <div>Precio: ${t.cost_usd} USD ≈ ₡{Math.round(t.cost_usd * rate)}</div>
            <div>Estado: {t.accepted ? 'Aceptado' : 'Pendiente'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
