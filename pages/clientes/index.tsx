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
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  async function create(e:any){
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if(!nombre.trim()){ setError('El nombre es requerido'); return }
    setSubmitting(true)
    try{
      const res = await fetch('/api/clientes', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre, telefono, email, notas, tipoCliente, presupuesto, zonaInteres, requerimientos, estatusCliente: 'Prospecto', interacciones, propiedadesInteres})})
      if(!res.ok) throw new Error('Error al crear cliente')
      setSuccess('Cliente creado correctamente')
      setNombre(''); setTelefono(''); setEmail(''); setPresupuesto(''); setZonaInteres(''); setRequerimientos(''); setPropiedadesInteres([]); setNotas(''); setInteracciones('')
      load()
    }catch(err:any){ setError(err.message||'Error') }
    setSubmitting(false)
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
        <input aria-label="Buscar clientes" value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar por nombre, teléfono, email..." className="p-2 border rounded flex-1" />
        <button onClick={()=>{ router.push(`/clientes?q=${encodeURIComponent(q)}`) }} className="btn btn-primary">Buscar</button>
      </div>
      <form onSubmit={create} className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-row col-span-2">
            <label className="form-label">Nombre <span className="text-red-600">*</span></label>
            <input className="input" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo" />
          </div>

          <div className="form-row">
            <label className="form-label">Teléfono</label>
            <input className="input" value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono" />
          </div>

          <div className="form-row">
            <label className="form-label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
          </div>

          <div className="form-row col-span-2">
            <label className="form-label">Tipo de cliente</label>
            <select className="input" value={tipoCliente} onChange={e=>setTipoCliente(e.target.value)}><option>Comprador</option><option>Vendedor</option><option>Arrendador</option><option>Arrendatario</option></select>
          </div>

          <div className="form-row">
            <label className="form-label">Presupuesto</label>
            <input className="input" value={presupuesto as any} onChange={e=>setPresupuesto(Number(e.target.value)||'')} placeholder="Presupuesto estimado" />
          </div>

          <div className="form-row">
            <label className="form-label">Zona de interés</label>
            <input className="input" value={zonaInteres} onChange={e=>setZonaInteres(e.target.value)} placeholder="Zona de interés" />
          </div>

          <div className="form-row col-span-2">
            <label className="form-label">Requerimientos</label>
            <textarea className="textarea" value={requerimientos} onChange={e=>setRequerimientos(e.target.value)} placeholder="Requerimientos" />
            <div className="helper">Describe las necesidades del cliente (ej. número de recámaras, zona, rango de precio).</div>
          </div>

          <div className="form-row col-span-2">
            <label className="form-label">Interacciones / notas</label>
            <textarea className="textarea" value={interacciones} onChange={e=>setInteracciones(e.target.value)} placeholder="Interacciones / notas de llamadas" />
          </div>

          <div className="form-row col-span-2">
            <label className="form-label">Propiedades de interés</label>
            <div className="flex gap-2 flex-wrap">
              {propiedades.map(p=> (
                <label key={p.id} className="inline-flex items-center gap-2"><input type="checkbox" checked={propiedadesInteres.includes(p.id)} onChange={()=>{
                  setPropiedadesInteres(prev => prev.includes(p.id)? prev.filter(x=>x!==p.id): [...prev,p.id])
                }} /> <span className="helper">{p.direccion}</span></label>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-between">
            <div className="text-sm text-red-600">{error}</div>
            <div className="text-sm text-green-600">{success}</div>
            <button disabled={submitting} aria-busy={submitting} className="btn btn-primary">{submitting ? 'Creando...' : 'Crear Cliente'}</button>
          </div>
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
