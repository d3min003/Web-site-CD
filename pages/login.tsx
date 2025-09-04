import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage(){
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const userRef = useRef<HTMLInputElement | null>(null)

  useEffect(()=>{ userRef.current?.focus() }, [])
  useEffect(()=>{ if(err) setErr(null) }, [user, password])

  async function submit(e:any){
    e.preventDefault()
    setErr(null)
    if(!user.trim() || !password) { setErr('Usuario y contraseña son requeridos'); return }
    setSubmitting(true)
    try{
      const res = await fetch('/api/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({user, password})})
      if(res.ok) return router.push('/')
      const j = await res.json()
      setErr(j?.error || 'Usuario o contraseña inválidos')
    }catch(err:any){
      setErr(err?.message || 'Error de red')
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-1">Iniciar sesión</h1>
        <p className="text-sm text-gray-600 mb-4">Ingresa tus credenciales para acceder al panel</p>

        <form onSubmit={submit} className="space-y-3">
          <div className="form-row">
            <label className="form-label">Usuario</label>
            <input
              ref={userRef}
              className="input"
              aria-label="usuario"
              value={user}
              onChange={e=>setUser(e.target.value)}
              placeholder="Usuario"
              autoComplete="username"
            />
          </div>

          <div className="form-row">
            <div className="flex items-center justify-between">
              <label className="form-label">Contraseña</label>
              <button type="button" className="text-sm text-gray-500 hover:underline" onClick={()=>setShowPassword(s=>!s)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button>
            </div>
            <input
              className="input"
              aria-label="contraseña"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
              <span>Recordarme</span>
            </label>
            <a className="text-sm text-blue-600 hover:underline" href="#">¿Olvidaste tu contraseña?</a>
          </div>

          {err && <div role="alert" className="text-sm text-red-600">{err}</div>}

          <div className="pt-2">
            <button className="btn btn-primary w-full" disabled={submitting}>{submitting ? 'Entrando...' : 'Entrar'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
