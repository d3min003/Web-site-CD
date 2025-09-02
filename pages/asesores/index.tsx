import { useEffect, useState } from 'react'

type Asesor = { id:number, nombre:string, zona?:string }

export default function AsesoresPage(){
  const [list, setList] = useState<Asesor[]>([])
  const [nombre, setNombre] = useState('')

  async function load(){
    const data = await fetch('/api/asesores').then(r=>r.json())
    setList(data)
  }
  useEffect(()=>{load()},[])

  async function create(e:any){
    e.preventDefault()
    await fetch('/api/asesores', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre})})
    setNombre('')
    load()
  }

  async function del(id:number){
    if(!confirm('Eliminar asesor?')) return
    await fetch(`/api/asesores/${id}`, {method:'DELETE'})
    load()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Asesores</h1>
      <form onSubmit={create} className="mb-4">
        <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" className="p-2 border rounded mr-2" />
        <button className="p-2 bg-blue-600 text-white rounded">Crear</button>
      </form>
      <ul className="space-y-2">
        {list.map(a=> (
          <li key={a.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>{a.nombre} {a.zona && <span className="text-sm text-gray-500">({a.zona})</span>}</div>
            <div><button onClick={()=>del(a.id)} className="text-red-600">Eliminar</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
