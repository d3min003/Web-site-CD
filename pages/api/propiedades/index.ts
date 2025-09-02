import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    const propiedades = await prisma.propiedad.findMany({include:{cliente:true, asesor:true}})
    return res.json(propiedades)
  }
  if(req.method === 'POST'){
    const { direccion, tipo, precio, estatus, clienteId, asesorId } = req.body
    const created = await prisma.propiedad.create({data:{direccion, tipo, precio: Number(precio)||0, estatus, clienteId, asesorId}})
    return res.status(201).json(created)
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
