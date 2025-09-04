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

  async function load(){
    const data = await fetch('/api/propiedades').then(r=>r.json())
    setList(data)
  }
  const [asesores, setAsesores] = useState<any[]>([])

  async function loadAsesores(){
    const a = await fetch('/api/asesores').then(r=>r.json())
    setAsesores(a)
  }
  useEffect(()=>{loadAsesores()},[])
  useEffect(()=>{load()},[])

  function toggleAmenidad(name:string){
    setAmenidades(prev => prev.includes(name) ? prev.filter(x=>x!==name) : [...prev, name])
  }

  async function create(e:any){
    e.preventDefault()
  if(!direccion.trim()){ alert('Dirección requerida'); return }
  const body = { direccion, tipo, operacion, precio, estado, ciudad, superficieConstruida: supConst, superficieTerreno: supTerr, recamaras, banos, estacionamientos, amenidades, estatus, asesorId: asesorId || undefined }
  const btn = (e.target as HTMLFormElement).querySelector('button')
  if(btn) btn.setAttribute('disabled','true')
  await fetch('/api/propiedades', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)})
  // reset
  setDireccion(''); setPrecio(''); setSupConst(''); setSupTerr(''); setRecamaras(''); setBanos(''); setEstacionamientos(''); setAmenidades([])
  load()
  if(btn) btn.removeAttribute('disabled')
  }

  async function del(id:number){
    if(!confirm('¿Eliminar propiedad?')) return
    await fetch(`/api/propiedades/${id}`, {method:'DELETE'})
    load()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Propiedades</h1>
      <form onSubmit={create} className="mb-6 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input value={direccion} onChange={e=>setDireccion(e.target.value)} placeholder="Dirección completa" className="p-2 border rounded" />
          <input value={estado} onChange={e=>setEstado(e.target.value)} placeholder="Estado" className="p-2 border rounded" />
          <input value={ciudad} onChange={e=>setCiudad(e.target.value)} placeholder="Ciudad" className="p-2 border rounded" />
          <select value={tipo} onChange={e=>setTipo(e.target.value)} className="p-2 border rounded">
            <option>Casa</option><option>Departamento</option><option>Terreno</option><option>Oficina</option>
          </select>
          <select value={operacion} onChange={e=>setOperacion(e.target.value)} className="p-2 border rounded">
            <option>Venta</option><option>Renta</option>
          </select>
          <input value={precio as any} onChange={e=>setPrecio(Number(e.target.value)||'')} placeholder="Precio" className="p-2 border rounded" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input value={supConst as any} onChange={e=>setSupConst(Number(e.target.value)||'')} placeholder="Superficie construida (m²)" className="p-2 border rounded" />
          <input value={supTerr as any} onChange={e=>setSupTerr(Number(e.target.value)||'')} placeholder="Superficie terreno (m²)" className="p-2 border rounded" />
          <input value={recamaras as any} onChange={e=>setRecamaras(Number(e.target.value)||'')} placeholder="Recámaras" className="p-2 border rounded" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input value={banos as any} onChange={e=>setBanos(Number(e.target.value)||'')} placeholder="Baños" className="p-2 border rounded" />
          <input value={estacionamientos as any} onChange={e=>setEstacionamientos(Number(e.target.value)||'')} placeholder="Estacionamientos" className="p-2 border rounded" />
          <select value={estatus} onChange={e=>setEstatus(e.target.value)} className="p-2 border rounded">
            <option>Disponible</option><option>En proceso</option><option>Vendido/Rentado</option>
          </select>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Amenidades</div>
          <div className="flex gap-2">
            {['alberca','seguridad','gimnasio','roof garden'].map(a=> (
              <label key={a} className="inline-flex items-center gap-2"><input type="checkbox" checked={amenidades.includes(a)} onChange={()=>toggleAmenidad(a)} /> {a}</label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <select value={asesorId as any} onChange={e=>setAsesorId(Number(e.target.value)||'')} className="p-2 border rounded">
            <option value="">Asignar asesor (opcional)</option>
            {asesores.map(a=> <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Crear Propiedad</button>
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
