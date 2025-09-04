import { useEffect, useState } from 'react'

export default function AsesoresPage(){
  const [list, setList] = useState<any[]>([])
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [experiencia, setExperiencia] = useState<number | ''>('')
  const [zona, setZona] = useState('')
  const [estatus, setEstatus] = useState('Activo')

  async function load(){
    const data = await fetch('/api/asesores').then(r=>r.json())
    setList(data)
  }
  useEffect(()=>{load()},[])

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  async function create(e:any){
    e.preventDefault()
    setError(null); setSuccess(null)
    if(!nombre.trim()) { setError('El nombre es requerido'); return }
    setSubmitting(true)
    try{
      const res = await fetch('/api/asesores', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre, telefono, email, zona, experiencia, estatus})})
      if(!res.ok) throw new Error('Error al crear asesor')
      setSuccess('Asesor creado')
      setNombre(''); setTelefono(''); setEmail(''); setExperiencia(''); setZona('');
      load()
    }catch(err:any){ setError(err.message||'Error') }
    setSubmitting(false)
  }

  async function del(id:number){
    if(!confirm('¿Eliminar asesor?')) return
    await fetch(`/api/asesores/${id}`, {method:'DELETE'})
    load()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Asesores</h1>
      <form onSubmit={create} className="mb-4 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-row">
            <label className="form-label">Nombre</label>
            <input className="input" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo" />
          </div>
          <div className="form-row">
            <label className="form-label">Teléfono</label>
            <input className="input" value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono" />
          </div>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email corporativo" />
          </div>
          <div className="form-row">
            <label className="form-label">Experiencia (años)</label>
            <input className="input" value={experiencia as any} onChange={e=>setExperiencia(Number(e.target.value)||'')} placeholder="Experiencia (años)" />
          </div>
          <div className="form-row">
            <label className="form-label">Zona de cobertura</label>
            <input className="input" value={zona} onChange={e=>setZona(e.target.value)} placeholder="Zona de cobertura" />
          </div>
          <div className="form-row">
            <label className="form-label">Estatus</label>
            <select className="input" value={estatus} onChange={e=>setEstatus(e.target.value)}><option>Activo</option><option>Inactivo</option></select>
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <div className="text-sm text-red-600">{error}</div>
            <div className="text-sm text-green-600">{success}</div>
            <button disabled={submitting} className="btn btn-primary">{submitting ? 'Creando...' : 'Crear Asesor'}</button>
          </div>
        </div>
      </form>
      <ul className="space-y-2">
        {list.map(a=> (
          <li key={a.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{a.nombre}</div>
              <div className="text-sm text-gray-500">{a.zona} · {a.experiencia || 0} años</div>
            </div>
            <div><button onClick={()=>del(a.id)} className="text-red-600">Eliminar</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
