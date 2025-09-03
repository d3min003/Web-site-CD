import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [user, setUser] = useState<string | null>(null)
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then(j=>{ if(j.ok) setUser(j.user); else setUser(null) }).catch(()=>setUser(null))
  },[])

  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded flex items-center justify-center font-bold">CI</div>
          <Link href="/"><a className="text-lg font-semibold text-gray-800">CRM Inmobiliario</a></Link>
        </div>
        <nav className="space-x-4 text-sm flex items-center">
          <Link href="/clientes"><a className="text-gray-600 hover:text-gray-900">Clientes</a></Link>
          <Link href="/asesores"><a className="text-gray-600 hover:text-gray-900">Asesores</a></Link>
          <Link href="/propiedades"><a className="text-gray-600 hover:text-gray-900">Propiedades</a></Link>
          {user ? (
            <a href="/api/auth/logout" className="ml-4 text-sm text-red-600">Cerrar sesión</a>
          ) : (
            <Link href="/login"><a className="ml-4 text-sm text-blue-600">Iniciar sesión</a></Link>
          )}
        </nav>
      </div>
    </header>
  )
}
