import { useEffect, useState } from 'react'

type Cliente = { id:number, nombre:string, telefono?:string, email?:string }

export default function ClientesPage(){
  const [list, setList] = useState<Cliente[]>([])
  const [nombre, setNombre] = useState('')

  async function load(){
    const data = await fetch('/api/clientes').then(r=>r.json())
    setList(data)
  }
  useEffect(()=>{load()},[])

  async function create(e:any){
    e.preventDefault()
    await fetch('/api/clientes', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({nombre})})
    setNombre('')
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
      <form onSubmit={create} className="mb-4">
        <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre" className="p-2 border rounded mr-2" />
        <button className="p-2 bg-blue-600 text-white rounded">Crear</button>
      </form>
      <ul className="space-y-2">
        {list.map(c=> (
          <li key={c.id} className="p-3 bg-white rounded shadow flex justify-between">
            <div>{c.nombre} {c.email && <span className="text-sm text-gray-500">({c.email})</span>}</div>
            <div><button onClick={()=>del(c.id)} className="text-red-600">Eliminar</button></div>
          </li>
        ))}
      </ul>
    </div>
  )
}
