import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Header() {
  const [user, setUser] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const router = useRouter()
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then(j=>{ if(j.ok) setUser(j.user); else setUser(null) }).catch(()=>setUser(null))
  },[])

  function onSearch(e:any){
    e.preventDefault()
    if(!q) return router.push('/')
    router.push(`/clientes?q=${encodeURIComponent(q)}`)
  }

  function NavLink({href, children}:{href:string, children:any}){
    const active = router.pathname === href
    return <Link href={href}><a className={`text-sm px-3 py-1 rounded ${active? 'bg-gray-100 text-gray-900':'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>{children}</a></Link>
  }

  return (
    <header className="bg-white border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded flex items-center justify-center font-bold">CI</div>
          <Link href="/"><a className="text-lg font-semibold text-gray-800">CRM Inmobiliario</a></Link>
        </div>

        <form onSubmit={onSearch} className="flex items-center gap-2 flex-1 max-w-md mx-4">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar cliente, dirección..." className="w-full p-2 border rounded" />
          <button className="btn btn-ghost" type="submit">Buscar</button>
        </form>

        <nav className="flex items-center">
          <NavLink href="/clientes">Clientes</NavLink>
          <NavLink href="/asesores">Asesores</NavLink>
          <NavLink href="/propiedades">Propiedades</NavLink>
          {user ? (
            <a href="/api/auth/logout" className="ml-4 text-sm text-red-600 px-3 py-1 rounded hover:bg-red-50">Cerrar sesión</a>
          ) : (
            <Link href="/login"><a className="ml-4 text-sm text-blue-600 px-3 py-1 rounded hover:bg-blue-50">Iniciar sesión</a></Link>
          )}
        </nav>
      </div>
    </header>
  )
}
