import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [metrics, setMetrics] = useState({clientes:0, propiedades:0, asesores:0})

  useEffect(()=>{
    async function load(){
      const c = await fetch('/api/clientes').then(r=>r.json())
      const p = await fetch('/api/propiedades').then(r=>r.json())
      const a = await fetch('/api/asesores').then(r=>r.json())
      setMetrics({clientes: c.length, propiedades: p.filter((x:any)=>x.estatus!=='rentada').length, asesores: a.length})
    }
    load()
  },[])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">CRM Inmobiliario - Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">Clientes<br/><span className="text-2xl font-semibold">{metrics.clientes}</span></div>
        <div className="p-4 bg-white rounded shadow">Propiedades disponibles<br/><span className="text-2xl font-semibold">{metrics.propiedades}</span></div>
        <div className="p-4 bg-white rounded shadow">Asesores<br/><span className="text-2xl font-semibold">{metrics.asesores}</span></div>
      </div>

      <nav className="space-x-4">
        <Link href="/clientes"><a className="text-blue-600">Clientes</a></Link>
        <Link href="/asesores"><a className="ml-4 text-blue-600">Asesores</a></Link>
        <Link href="/propiedades"><a className="ml-4 text-blue-600">Propiedades</a></Link>
      </nav>
    </div>
  )
}
