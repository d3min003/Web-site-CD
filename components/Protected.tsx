import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Protected({children}:{children:any}){
  const [ok, setOk] = useState<boolean | null>(null)
  const router = useRouter()
  useEffect(()=>{
    fetch('/api/auth/me').then(r=>r.json()).then(j=>{ if(j.ok) setOk(true); else { setOk(false); router.push('/login') } }).catch(()=>{ setOk(false); router.push('/login') })
  },[])
  if(ok === null) return <div>Comprobando sesión...</div>
  return <>{children}</>
}
