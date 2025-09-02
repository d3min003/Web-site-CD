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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-600">Resumen rápido del sistema</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Clientes</div>
          <div className="text-2xl font-semibold mt-2">{metrics.clientes}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Propiedades disponibles</div>
          <div className="text-2xl font-semibold mt-2">{metrics.propiedades}</div>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col">
          <div className="text-sm text-gray-500">Asesores</div>
          <div className="text-2xl font-semibold mt-2">{metrics.asesores}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h2 className="text-lg font-medium mb-2">Acciones rápidas</h2>
        <div className="flex gap-3">
          <Link href="/clientes"><a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ver Clientes</a></Link>
          <Link href="/propiedades"><a className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Ver Propiedades</a></Link>
          <Link href="/asesores"><a className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Ver Asesores</a></Link>
        </div>
      </div>
    </div>
  )
}
