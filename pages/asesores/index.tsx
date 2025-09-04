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

  async function create(e:any){
  e.preventDefault()
  if(!nombre.trim()) { alert('El nombre es requerido'); return }
  const btn = (e.target as HTMLFormElement).querySelector('button')
  if(btn) btn.setAttribute('disabled','true')
  await fetch('/api/asesores', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre, telefono, email, zona, experiencia, estatus})})
  setNombre(''); setTelefono(''); setEmail(''); setExperiencia(''); setZona('');
  load()
  if(btn) btn.removeAttribute('disabled')
  }

  async function del(id:number){
    if(!confirm('¿Eliminar asesor?')) return
    await fetch(`/api/asesores/${id}`, {method:'DELETE'})
    load()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Asesores</h1>
      <form onSubmit={create} className="mb-4 grid grid-cols-2 gap-2">
        <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo" className="p-2 border rounded" />
        <input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono" className="p-2 border rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email corporativo" className="p-2 border rounded" />
        <input value={experiencia as any} onChange={e=>setExperiencia(Number(e.target.value)||'')} placeholder="Experiencia (años)" className="p-2 border rounded" />
        <input value={zona} onChange={e=>setZona(e.target.value)} placeholder="Zona de cobertura" className="p-2 border rounded" />
        <select value={estatus} onChange={e=>setEstatus(e.target.value)} className="p-2 border rounded"><option>Activo</option><option>Inactivo</option></select>
        <div className="col-span-2"><button className="p-2 bg-blue-600 text-white rounded">Crear Asesor</button></div>
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
