import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Protected from '../../components/Protected'

export default function ClientesPage(){
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [notas, setNotas] = useState('')
  const [interacciones, setInteracciones] = useState('')
  const [tipoCliente, setTipoCliente] = useState('Comprador')
  const [presupuesto, setPresupuesto] = useState<number | ''>('')
  const [zonaInteres, setZonaInteres] = useState('')
  const [requerimientos, setRequerimientos] = useState('')
  const [propiedadesInteres, setPropiedadesInteres] = useState<number[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)

  async function load(){
  const qs = q ? `?q=${encodeURIComponent(q)}` : ''
  const data = await fetch(`/api/clientes${qs}`).then(r=>r.json())
    setList(data)
  }
  const [propiedades, setPropiedades] = useState<any[]>([])
  async function loadProps(){
    const p = await fetch('/api/propiedades').then(r=>r.json())
    setPropiedades(p)
  }
  useEffect(()=>{loadProps()},[])
  useEffect(()=>{ 
    // read q from URL
    if(router && typeof router.query.q === 'string') setQ(router.query.q)
  },[router.query.q])
  useEffect(()=>{load()},[q])

  const [error, setError] = useState<string | null>(null)
  async function create(e:any){
    e.preventDefault()
    setError(null)
    if(!nombre.trim()){ setError('El nombre es requerido'); return }
    await fetch('/api/clientes', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre, telefono, email, notas, tipoCliente, presupuesto, zonaInteres, requerimientos, estatusCliente: 'Prospecto', interacciones, propiedadesInteres})})
    setNombre(''); setTelefono(''); setEmail(''); setPresupuesto(''); setZonaInteres(''); setRequerimientos(''); setPropiedadesInteres([]); setNotas(''); setInteracciones('')
    load()
  }

  async function del(id:number){
    if(!confirm('Eliminar cliente?')) return
    await fetch(`/api/clientes/${id}`, {method:'DELETE'})
    load()
  }

  async function saveEdit(id:number, data:any){
    await fetch(`/api/clientes/${id}`, {method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
    setEditingId(null)
    load()
  }

  return (
    <Protected>
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Clientes</h1>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nombre, teléfono, email..." className="p-2 border rounded flex-1" />
        <button onClick={()=>{ router.push(`/clientes?q=${encodeURIComponent(q)}`) }} className="btn btn-primary">Buscar</button>
      </div>
      <form onSubmit={create} className="mb-4 grid grid-cols-2 gap-3 bg-white p-4 rounded-lg shadow">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Nombre <span className="text-red-600">*</span></label>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Tipo de cliente</label>
          <select value={tipoCliente} onChange={e=>setTipoCliente(e.target.value)} className="w-full p-2 border rounded"><option>Comprador</option><option>Vendedor</option><option>Arrendador</option><option>Arrendatario</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Presupuesto</label>
          <input value={presupuesto as any} onChange={e=>setPresupuesto(Number(e.target.value)||'')} placeholder="Presupuesto estimado" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Zona de interés</label>
          <input value={zonaInteres} onChange={e=>setZonaInteres(e.target.value)} placeholder="Zona de interés" className="w-full p-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Requerimientos</label>
          <textarea value={requerimientos} onChange={e=>setRequerimientos(e.target.value)} placeholder="Requerimientos" className="w-full p-2 border rounded" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Interacciones / notas</label>
          <textarea value={interacciones} onChange={e=>setInteracciones(e.target.value)} placeholder="Interacciones / notas de llamadas" className="w-full p-2 border rounded" />
        </div>
        <div className="col-span-2">
          <div className="text-sm text-gray-600 mb-1">Propiedades de interés (selecciona una o más)</div>
          <div className="flex gap-2 flex-wrap">
            {propiedades.map(p=> (
              <label key={p.id} className="inline-flex items-center gap-2 border rounded p-2"><input type="checkbox" checked={propiedadesInteres.includes(p.id)} onChange={()=>{
                setPropiedadesInteres(prev => prev.includes(p.id)? prev.filter(x=>x!==p.id): [...prev,p.id])
              }} /> <span className="text-sm max-w-xs block truncate">{p.direccion}</span></label>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex items-center justify-between">
          <div className="text-sm text-red-600">{error}</div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Crear Cliente</button>
        </div>
      </form>
      <div className="bg-white rounded-lg shadow p-2">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Zona</th>
              <th className="">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {list.map(c=> (
              <tr key={c.id}>
                <td className="font-semibold">{c.nombre}</td>
                <td className="muted">{c.telefono || '—'}</td>
                <td className="muted">{c.email || '—'}</td>
                <td className="muted">{c.tipoCliente || '—'}</td>
                <td className="muted">{c.zonaInteres || '—'}</td>
                <td className="text-right">
                  <button onClick={()=>setEditingId(c.id)} className="btn btn-ghost">Editar</button>
                  <button onClick={()=>del(c.id)} className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </Protected>
  )
}
