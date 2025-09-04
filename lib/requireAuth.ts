import { NextApiRequest, NextApiResponse } from 'next'
import { verify } from './auth'

function parseCookies(header?: string){
  const h = header || ''
  return Object.fromEntries(h.split(';').map(s=>s.trim()).filter(Boolean).map(p=>{
    const [k,v] = p.split('=')
    return [k,v]
  }))
}

export function requireAuthApi(req: NextApiRequest, res: NextApiResponse){
  const cookies = parseCookies(req.headers.cookie as any)
  const token = cookies.token
  if(!token) {
    res.status(401).json({ ok: false, error: 'Not authenticated' })
    return null
  }
  const data = verify(token)
  if(!data){
    res.status(401).json({ ok: false, error: 'Invalid token' })
    return null
  }
  return data
}
