import { useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage(){
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e:any){
    e.preventDefault()
  if(!user.trim() || !password) { setErr('Usuario y contraseña son requeridos'); return }
  const btn = (e.target as HTMLFormElement).querySelector('button')
  if(btn) btn.setAttribute('disabled','true')
  const res = await fetch('/api/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user, password})})
  if(res.ok) return router.push('/')
  const j = await res.json()
  setErr(j.error||'Error')
  if(btn) btn.removeAttribute('disabled')
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
      <form onSubmit={submit} className="grid gap-2">
        <input aria-label="usuario" value={user} onChange={e=>setUser(e.target.value)} placeholder="Usuario" className="p-2 border rounded" />
        <input aria-label="contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" className="p-2 border rounded" />
        {err && <div role="alert" className="text-red-600">{err}</div>}
        <div className="flex gap-2"><button className="btn btn-primary">Entrar</button></div>
      </form>
    </div>
  )
}
