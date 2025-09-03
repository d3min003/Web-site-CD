import type { NextApiRequest, NextApiResponse } from 'next'
import { verify } from '../../../lib/auth'

function parseCookies(req: NextApiRequest){
  const header = req.headers.cookie || ''
  return Object.fromEntries(header.split(';').map(s=>s.trim()).filter(Boolean).map(p=>{
    const [k,v] = p.split('=')
    return [k,v]
  }))
}

export default function handler(req: NextApiRequest, res: NextApiResponse){
  const cookies = parseCookies(req)
  const token = cookies.token
  if(!token) return res.status(401).json({ ok:false })
  const data = verify(token)
  if(!data) return res.status(401).json({ ok:false })
  res.json({ ok:true, user: (data as any).user })
}
