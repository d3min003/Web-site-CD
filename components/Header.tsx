import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
  const [user, setUser] = useState<string | null>(null)
  const router = useRouter()
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then((j:any)=>{ if(j.ok) setUser(j.user); else setUser(null) }).catch(()=>setUser(null))
  },[])

  function NavLink({href, children}: {href: string, children: React.ReactNode}){
    const active = router.pathname === href
    return (
      <Link href={href} className={`text-sm px-3 py-1 rounded ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
        {children}
      </Link>
    )
  }

  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded flex items-center justify-center font-bold">CI</div>
          <Link href="/" className="text-lg font-semibold text-gray-800">CRM Inmobiliario</Link>
        </div>

        <nav className="flex items-center">
          <NavLink href="/clientes">Clientes</NavLink>
          <NavLink href="/asesores">Asesores</NavLink>
          <NavLink href="/propiedades">Propiedades</NavLink>
          {user ? (
            <a href="/api/auth/logout" className="ml-4 text-sm text-red-600 px-3 py-1 rounded hover:bg-red-50">Cerrar sesión</a>
          ) : (
            <Link href="/login" className="ml-4 text-sm text-blue-600 px-3 py-1 rounded hover:bg-blue-50">Iniciar sesión</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
