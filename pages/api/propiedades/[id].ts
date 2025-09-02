import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const id = Number(req.query.id)
  if(req.method === 'GET'){
  const propiedad = await prisma.propiedad.findUnique({where:{id}, include:{cliente:true, asesor:true}})
    return res.json(propiedad)
  }
  if(req.method === 'PUT' || req.method === 'PATCH'){
  const data = req.body
  // coerce numeric fields
  if(data.precio) data.precio = Number(data.precio)
  if(data.superficieConstruida) data.superficieConstruida = Number(data.superficieConstruida)
  if(data.superficieTerreno) data.superficieTerreno = Number(data.superficieTerreno)
  if(data.recamaras) data.recamaras = Number(data.recamaras)
  if(data.banos) data.banos = Number(data.banos)
  if(data.estacionamientos) data.estacionamientos = Number(data.estacionamientos)
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
