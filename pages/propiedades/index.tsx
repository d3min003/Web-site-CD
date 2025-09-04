import { useEffect, useState } from 'react'

type Prop = any

export default function PropiedadesPage(){
  const [list, setList] = useState<Prop[]>([])
  const [direccion, setDireccion] = useState('')
  const [tipo, setTipo] = useState('Casa')
  const [operacion, setOperacion] = useState('Venta')
  const [precio, setPrecio] = useState<number | ''>('')
  const [estado, setEstado] = useState('')
  const [ciudad, setCiudad] = useState('')
  const [supConst, setSupConst] = useState<number | ''>('')
  const [supTerr, setSupTerr] = useState<number | ''>('')
  const [recamaras, setRecamaras] = useState<number | ''>('')
  const [banos, setBanos] = useState<number | ''>('')
  const [estacionamientos, setEstacionamientos] = useState<number | ''>('')
  const [amenidades, setAmenidades] = useState<string[]>([])
  const [estatus, setEstatus] = useState('Disponible')
  const [asesorId, setAsesorId] = useState<number | ''>('')

  const [asesores, setAsesores] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function load(){
    const data = await fetch('/api/propiedades').then(r=>r.json())
    setList(data)
  }

  async function loadAsesores(){
    const a = await fetch('/api/asesores').then(r=>r.json())
    setAsesores(a)
  }
  useEffect(()=>{loadAsesores(); load()},[])

  function toggleAmenidad(name:string){
    setAmenidades(prev => prev.includes(name) ? prev.filter(x=>x!==name) : [...prev, name])
  }

  async function create(e:any){
    e.preventDefault()
    setError(null); setSuccess(null)
    if(!direccion.trim()){ setError('Dirección requerida'); return }
    if(precio !== '' && Number(precio) < 0){ setError('Precio inválido'); return }
    setSubmitting(true)
    try{
      const body = { direccion, tipo, operacion, precio: precio === '' ? undefined : Number(precio), estado, ciudad, superficieConstruida: supConst === '' ? undefined : Number(supConst), superficieTerreno: supTerr === '' ? undefined : Number(supTerr), recamaras: recamaras === '' ? undefined : Number(recamaras), banos: banos === '' ? undefined : Number(banos), estacionamientos: estacionamientos === '' ? undefined : Number(estacionamientos), amenidades, estatus, asesorId: asesorId || undefined }
      const res = await fetch('/api/propiedades', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)})
      if(!res.ok) throw new Error('Error al crear propiedad')
      setSuccess('Propiedad creada')
      // reset
      setDireccion(''); setPrecio(''); setSupConst(''); setSupTerr(''); setRecamaras(''); setBanos(''); setEstacionamientos(''); setAmenidades([]); setAsesorId('')
      load()
    }catch(err:any){ setError(err.message||'Error') }
    setSubmitting(false)
  }

  async function del(id:number){
    if(!confirm('¿Eliminar propiedad?')) return
    await fetch(`/api/propiedades/${id}`, {method:'DELETE'})
    load()
  }

  const AMENIDADES = ['alberca','seguridad','gimnasio','roof garden']

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Propiedades</h1>

      <form onSubmit={create} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-row col-span-2">
            <label className="form-label">Dirección</label>
            <input className="input" value={direccion} onChange={e=>setDireccion(e.target.value)} placeholder="Dirección completa" />
          </div>

          <div className="form-row">
            <label className="form-label">Estado</label>
            <input className="input" value={estado} onChange={e=>setEstado(e.target.value)} placeholder="Estado" />
          </div>
          <div className="form-row">
            <label className="form-label">Ciudad</label>
            <input className="input" value={ciudad} onChange={e=>setCiudad(e.target.value)} placeholder="Ciudad" />
          </div>

          <div className="form-row">
            <label className="form-label">Tipo</label>
            <select className="input" value={tipo} onChange={e=>setTipo(e.target.value)}>
              <option>Casa</option><option>Departamento</option><option>Terreno</option><option>Oficina</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">Operación</label>
            <select className="input" value={operacion} onChange={e=>setOperacion(e.target.value)}>
              <option>Venta</option><option>Renta</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">Precio</label>
            <input className="input" type="number" step="0.01" value={precio as any} onChange={e=>setPrecio(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Precio" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="form-row">
            <label className="form-label">Superficie construida (m²)</label>
            <input className="input" type="number" value={supConst as any} onChange={e=>setSupConst(e.target.value === '' ? '' : Number(e.target.value))} placeholder="m²" />
          </div>
          <div className="form-row">
            <label className="form-label">Superficie terreno (m²)</label>
            <input className="input" type="number" value={supTerr as any} onChange={e=>setSupTerr(e.target.value === '' ? '' : Number(e.target.value))} placeholder="m²" />
          </div>
          <div className="form-row">
            <label className="form-label">Recámaras</label>
            <input className="input" type="number" value={recamaras as any} onChange={e=>setRecamaras(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Recámaras" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="form-row">
            <label className="form-label">Baños</label>
            <input className="input" type="number" value={banos as any} onChange={e=>setBanos(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Baños" />
          </div>
          <div className="form-row">
            <label className="form-label">Estacionamientos</label>
            <input className="input" type="number" value={estacionamientos as any} onChange={e=>setEstacionamientos(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Estacionamientos" />
          </div>
          <div className="form-row">
            <label className="form-label">Estatus</label>
            <select className="input" value={estatus} onChange={e=>setEstatus(e.target.value)}>
              <option>Disponible</option><option>En proceso</option><option>Vendido/Rentado</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Amenidades</div>
          <div className="flex flex-wrap gap-2">
            {AMENIDADES.map(a=> (
              <button type="button" key={a} onClick={()=>toggleAmenidad(a)} className={`px-3 py-1 rounded-full border text-sm ${amenidades.includes(a) ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700'}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <select className="input flex-1" value={asesorId as any} onChange={e=>setAsesorId(Number(e.target.value)||'')}>
            <option value="">Asignar asesor (opcional)</option>
            {asesores.map(a=> <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
          <button className="btn btn-primary" disabled={submitting}>{submitting ? 'Creando...' : 'Crear Propiedad'}</button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-red-600">{error}</div>
          <div className="text-sm text-green-600">{success}</div>
        </div>
      </form>

      <ul className="space-y-2">
        {list.map((p: any)=> (
          <li key={p.id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{p.direccion}</div>
                <div className="text-sm text-gray-500">{p.tipo} · {p.operacion} · {p.estado}, {p.ciudad}</div>
              </div>
              <div>
                <div className="text-right">${p.precio}</div>
                <div className="text-sm text-gray-500">{p.estatus}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">Amenidades: {p.amenidades ? JSON.stringify(p.amenidades) : '—'}</div>
              <div className="mt-2 text-right"><button onClick={()=>del(p.id)} className="text-red-600">Eliminar</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
