import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { requireAuthApi } from '../../../lib/requireAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const id = Number(req.query.id)
  if(req.method === 'GET'){
    const auth = requireAuthApi(req,res); if(!auth) return
    const cliente = await prisma.cliente.findUnique({where:{id}})
    return res.json(cliente)
  }
  if(req.method === 'PUT' || req.method === 'PATCH'){
    const auth = requireAuthApi(req,res); if(!auth) return
    const data = req.body
    const updated = await prisma.cliente.update({where:{id}, data})
    return res.json(updated)
  }
  if(req.method === 'DELETE'){
    const auth = requireAuthApi(req,res); if(!auth) return
    await prisma.cliente.delete({where:{id}})
    return res.status(204).end()
  }
  res.setHeader('Allow', 'GET,PUT,PATCH,DELETE')
  res.status(405).end('Method Not Allowed')
}
