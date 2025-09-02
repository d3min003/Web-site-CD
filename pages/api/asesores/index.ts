import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
  const asesores = await prisma.asesor.findMany({include:{propiedades:true}})
    return res.json(asesores)
  }
  if(req.method === 'POST'){
  const { nombre, telefono, email, zona, experiencia, estatus } = req.body
  const created = await prisma.asesor.create({data:{nombre, telefono, email, zona, experiencia: experiencia?Number(experiencia):undefined, estatus}})
    return res.status(201).json(created)
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
