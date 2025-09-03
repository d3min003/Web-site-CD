import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage(){
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e:any){
    e.preventDefault()
    const res = await fetch('/api/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user, password})})
    if(res.ok) return router.push('/')
    const j = await res.json()
    setErr(j.error||'Error')
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={submit} className="grid gap-2">
        <input value={user} onChange={e=>setUser(e.target.value)} placeholder="Usuario" className="p-2 border rounded" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" className="p-2 border rounded" />
        {err && <div className="text-red-600">{err}</div>}
        <div className="flex gap-2"><button className="p-2 bg-blue-600 text-white rounded">Entrar</button></div>
      </form>
    </div>
  )
}
