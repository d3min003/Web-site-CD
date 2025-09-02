import { useEffect, useState } from 'react'

export default function ClientesPage(){
  const [list, setList] = useState<any[]>([])
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [tipoCliente, setTipoCliente] = useState('Comprador')
  const [presupuesto, setPresupuesto] = useState<number | ''>('')
  const [zonaInteres, setZonaInteres] = useState('')
  const [requerimientos, setRequerimientos] = useState('')
  const [propiedadesInteres, setPropiedadesInteres] = useState<number[]>([])

  async function load(){
    const data = await fetch('/api/clientes').then(r=>r.json())
    setList(data)
  }
  const [propiedades, setPropiedades] = useState<any[]>([])
  async function loadProps(){
    const p = await fetch('/api/propiedades').then(r=>r.json())
    setPropiedades(p)
  }
  useEffect(()=>{loadProps()},[])
  useEffect(()=>{load()},[])

  async function create(e:any){
    e.preventDefault()
    await fetch('/api/clientes', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre, telefono, email, tipoCliente, presupuesto, zonaInteres, requerimientos, propiedadesInteres})})
    setNombre(''); setTelefono(''); setEmail(''); setPresupuesto(''); setZonaInteres(''); setRequerimientos(''); setPropiedadesInteres([])
    load()
  }

  async function del(id:number){
    if(!confirm('Eliminar cliente?')) return
    await fetch(`/api/clientes/${id}`, {method:'DELETE'})
    load()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Clientes</h1>
      <form onSubmit={create} className="mb-4 grid grid-cols-2 gap-2">
        <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo" className="p-2 border rounded" />
        <input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono" className="p-2 border rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="p-2 border rounded" />
        <select value={tipoCliente} onChange={e=>setTipoCliente(e.target.value)} className="p-2 border rounded"><option>Comprador</option><option>Vendedor</option><option>Arrendador</option><option>Arrendatario</option></select>
        <input value={presupuesto as any} onChange={e=>setPresupuesto(Number(e.target.value)||'')} placeholder="Presupuesto estimado" className="p-2 border rounded" />
        <input value={zonaInteres} onChange={e=>setZonaInteres(e.target.value)} placeholder="Zona de interés" className="p-2 border rounded" />
        <textarea value={requerimientos} onChange={e=>setRequerimientos(e.target.value)} placeholder="Requerimientos" className="p-2 border rounded col-span-2" />
        <div className="col-span-2">
          <div className="text-sm text-gray-600 mb-1">Propiedades de interés (selecciona una o más)</div>
          <div className="flex gap-2 flex-wrap">
            {propiedades.map(p=> (
              <label key={p.id} className="inline-flex items-center gap-2 border rounded p-2"><input type="checkbox" checked={propiedadesInteres.includes(p.id)} onChange={()=>{
                setPropiedadesInteres(prev => prev.includes(p.id)? prev.filter(x=>x!==p.id): [...prev,p.id])
              }} /> <span className="text-sm">{p.direccion}</span></label>
            ))}
          </div>
        </div>
        <div className="col-span-2"><button className="p-2 bg-blue-600 text-white rounded">Crear Cliente</button></div>
      </form>
      <ul className="space-y-2">
        {list.map(c=> (
          <li key={c.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{c.nombre}</div>
              <div className="text-sm text-gray-500">{c.tipoCliente || ''} · {c.zonaInteres || ''}</div>
            </div>
            <div><button onClick={()=>del(c.id)} className="text-red-600">Eliminar</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
