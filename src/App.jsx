import React, { useState, useEffect } from 'react'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App(){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const s = localStorage.getItem('dm_user')
    if(s) setUser(JSON.parse(s))
  },[])

  function onLogin(u){
    localStorage.setItem('dm_user', JSON.stringify(u))
    setUser(u)
  }
  function onLogout(){
    localStorage.removeItem('dm_user')
    setUser(null)
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>Gestión de Conductores</h1>
        {user && <div className="user">Usuario: {user.username} ({user.role}) <button onClick={onLogout}>Cerrar sesión</button></div>}
      </header>
      <main>
        {!user ? <Login onLogin={onLogin}/> : <Dashboard user={user} />}
      </main>
    </div>
  )
}
