import React, { useState, useEffect } from 'react'
import CalendarView from '../shared/CalendarView.jsx'
import DriversPanel from '../shared/DriversPanel.jsx'
import TripsPanel from '../shared/TripsPanel.jsx'

export default function Dashboard({ user }){
  const [rate, setRate] = useState(() => localStorage.getItem('dm_rate') || '600.00') // CRC per USD
  useEffect(()=> localStorage.setItem('dm_rate', rate), [rate])

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Configuración</h3>
        <div>
          <label>Tasa USD → CRC (manual)</label>
          <input value={rate} onChange={e=>setRate(e.target.value)} />
          <small>Usada para mostrar conversión de costos</small>
        </div>
        <div>
          <h4>Rol: {user.role}</h4>
        </div>
        {user.role === 'admin' && <DriversPanel />}
      </aside>
      <section className="mainpanel">
        <CalendarView user={user} rate={parseFloat(rate)}/>
        <TripsPanel user={user} rate={parseFloat(rate)} />
      </section>
    </div>
  )
}
