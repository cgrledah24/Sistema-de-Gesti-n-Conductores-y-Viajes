import React, { useState, useEffect } from 'react'

export default function DriversPanel(){
  const [drivers, setDrivers] = useState(()=> JSON.parse(localStorage.getItem('dm_drivers')||'[]'))
  const [u,setU]=useState('conductor' + (drivers.length+1))
  const [p,setP]=useState('prueba')

  useEffect(()=> localStorage.setItem('dm_drivers', JSON.stringify(drivers)), [drivers])

  function addDriver(){
    const d = { username: u, password: p, role: 'driver', name: u, available: true }
    setDrivers([...drivers, d])
    setU('conductor' + (drivers.length+2))
  }

  return (
    <div className="drivers-panel">
      <h4>Conductores</h4>
      <div>
        <label>Usuario nuevo</label>
        <input value={u} onChange={e=>setU(e.target.value)} />
        <label>Contraseña</label>
        <input value={p} onChange={e=>setP(e.target.value)} />
        <button onClick={addDriver}>Crear conductor</button>
      </div>
      <ul>
        {drivers.map(d=>(
          <li key={d.username}>
            {d.name} ({d.username}) — {d.available? 'Disponible':'No disponible'}
          </li>
        ))}
      </ul>
    </div>
  )
}
