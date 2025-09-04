import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
  const asesores = await prisma.asesor.findMany({include:{propiedades:true}})
    return res.json(asesores)
  }
  if(req.method === 'POST'){
  try {
    const { nombre, telefono, email, zona, experiencia, estatus } = req.body
    if (!nombre || typeof nombre !== 'string') return res.status(400).json({ error: 'Campo "nombre" es requerido' })
    const data: any = { nombre, telefono, email, zona, estatus }
    if (experiencia !== undefined && experiencia !== null && experiencia !== '') {
      const expNum = Number(experiencia)
      if (!Number.isFinite(expNum)) return res.status(400).json({ error: 'Campo "experiencia" debe ser numérico' })
      data.experiencia = expNum
    }
    const created = await prisma.asesor.create({ data: data as any })
    return res.status(201).json(created)
  } catch (err: any) {
    console.error('POST /api/asesores error:', err)
    return res.status(500).json({ error: err?.message || 'Internal Server Error' })
  }
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
