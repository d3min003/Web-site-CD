import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const id = Number(req.query.id)
  if(req.method === 'GET'){
    const propiedad = await prisma.propiedad.findUnique({where:{id}})
    return res.json(propiedad)
  }
  if(req.method === 'PUT' || req.method === 'PATCH'){
    const data = req.body
    const updated = await prisma.propiedad.update({where:{id}, data})
    return res.json(updated)
  }
  if(req.method === 'DELETE'){
    await prisma.propiedad.delete({where:{id}})
    return res.status(204).end()
  }
  res.setHeader('Allow', 'GET,PUT,PATCH,DELETE')
  res.status(405).end('Method Not Allowed')
}
