import React, { useState } from 'react'

// Users: admin/prueba (password prueba), drivers can be created in-app
const ADMIN = { username: 'admin', password: 'prueba', role: 'admin' }
const DEFAULT_DRIVER = { username: 'conductor1', password: 'prueba', role: 'driver', name: 'Conductor 1' }

export default function Login({ onLogin }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  function handleLogin(e){
    e.preventDefault()
    // simple local auth for demo
    if(username === ADMIN.username && password === ADMIN.password){
      onLogin(ADMIN)
      return
    }
    const drivers = JSON.parse(localStorage.getItem('dm_drivers') || '[]')
    const match = drivers.find(d=> d.username === username && d.password === password)
    if(match){
      onLogin(match)
      return
    }
    // fallback demo driver
    if(username === DEFAULT_DRIVER.username && password === DEFAULT_DRIVER.password){
      onLogin(DEFAULT_DRIVER)
      return
    }
    setMsg('Credenciales inválidas. Usuario de prueba: admin / prueba')
  }

  return (
    <div className="login-card">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <label>Usuario (ej. admin o conductor1)</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
        {msg && <p className="error">{msg}</p>}
      </form>
      <div className="note">
        <p>Cuenta demo administrador: <b>admin</b> / <b>prueba</b></p>
      </div>
    </div>
  )
}
