import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from '../../../lib/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') return res.status(405).end()
  const { user, password } = req.body || {}
  // simple static credentials as requested
  if(user === 'Corporativo_Diamante' && password === 'CD2025/3$$'){
    const token = sign({ user })
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${8*3600}`)
    return res.json({ ok: true })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
}
