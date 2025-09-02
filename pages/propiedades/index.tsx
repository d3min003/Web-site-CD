import { useEffect, useState } from 'react'

type Prop = { id:number, direccion:string, tipo:string, precio:number, estatus:string }

export default function PropiedadesPage(){
  const [list, setList] = useState<Prop[]>([])
  const [direccion, setDireccion] = useState('')

  async function load(){
    const data = await fetch('/api/propiedades').then(r=>r.json())
    setList(data)
  }
  useEffect(()=>{load()},[])

  async function create(e:any){
    e.preventDefault()
    await fetch('/api/propiedades', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({direccion, tipo:'casa', precio:0, estatus:'disponible'})})
    setDireccion('')
    load()
  }

  async function del(id:number){
    if(!confirm('Eliminar propiedad?')) return
    await fetch(`/api/propiedades/${id}`, {method:'DELETE'})
    load()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Propiedades</h1>
      <form onSubmit={create} className="mb-4">
        <input value={direccion} onChange={e=>setDireccion(e.target.value)} placeholder="Dirección" className="p-2 border rounded mr-2" />
        <button className="p-2 bg-blue-600 text-white rounded">Crear</button>
      </form>
      <ul className="space-y-2">
        {list.map(p=> (
          <li key={p.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>{p.direccion} <span className="text-sm text-gray-500">{p.tipo} - {p.estatus}</span></div>
            <div><button onClick={()=>del(p.id)} className="text-red-600">Eliminar</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
