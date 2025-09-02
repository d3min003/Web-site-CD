import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
  const propiedades = await prisma.propiedad.findMany({include:{cliente:true, asesor:true}})
    return res.json(propiedades)
  }
  if(req.method === 'POST'){
  const { direccion, tipo, operacion, precio, estatus, clienteId, asesorId, estado, ciudad, superficieConstruida, superficieTerreno, recamaras, banos, estacionamientos, amenidades } = req.body
  const created = await prisma.propiedad.create({data:{direccion, tipo, operacion, precio: Number(precio)||0, estatus, clienteId, asesorId, estado, ciudad, superficieConstruida: superficieConstruida?Number(superficieConstruida):undefined, superficieTerreno: superficieTerreno?Number(superficieTerreno):undefined, recamaras: recamaras?Number(recamaras):undefined, banos: banos?Number(banos):undefined, estacionamientos: estacionamientos?Number(estacionamientos):undefined, amenidades: amenidades?amenidades:undefined}})
    return res.status(201).json(created)
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
