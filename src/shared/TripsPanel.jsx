import React, { useState } from 'react'

export default function TripsPanel({ user, rate }){
  const [trips, setTrips] = React.useState(()=> JSON.parse(localStorage.getItem('dm_trips')||'[]'))
  React.useEffect(()=> localStorage.setItem('dm_trips', JSON.stringify(trips)), [trips])

  function assignDriver(tripId){
    const drivers = JSON.parse(localStorage.getItem('dm_drivers')||'[]')
    const first = drivers[0]
    if(!first) return alert('No hay conductores. Crearlos en panel de Conductores.')
    setTrips(trips.map(t=> t.id===tripId ? {...t, driver: first.username} : t))
  }
  function toggleAccept(tripId){
    setTrips(trips.map(t=> t.id===tripId ? {...t, accepted: !t.accepted} : t))
    // here: call notification/email/sms functions (placeholders)
    alert('Notificación demo: estado cambiado. Implementar integración de Email/SMS en backend.')
  }
  function setCost(tripId){
    const v = prompt('Ingrese costo en USD (número):')
    if(!v) return
    setTrips(trips.map(t=> t.id===tripId ? {...t, cost_usd: parseFloat(v)} : t))
  }

  const visible = user.role === 'admin' ? trips : trips.filter(t=> t.driver === user.username)

  return (
    <div className="trips-panel">
      <h3>Viajes</h3>
      {visible.length===0 ? <p>No hay viajes.</p> : visible.map(t=>(
        <div className="trip" key={t.id}>
          <div>{t.date} {t.time} — {t.passenger}</div>
          <div>Conductor: {t.driver || 'Sin asignar'}</div>
          <div>Precio: ${t.cost_usd} USD ≈ ₡{Math.round(t.cost_usd * rate)}</div>
          <div>
            {user.role === 'admin' && <button onClick={()=>assignDriver(t.id)}>Asignar conductor demo</button>}
            <button onClick={()=>toggleAccept(t.id)}>{t.accepted ? 'Marcar pendiente' : 'Aceptar viaje'}</button>
            {user.role === 'admin' && <button onClick={()=>setCost(t.id)}>Editar costo</button>}
          </div>
        </div>
      ))}
    </div>
  )
}
