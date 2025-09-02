import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
    const clientes = await prisma.cliente.findMany()
    return res.json(clientes)
  }
  if(req.method === 'POST'){
    const { nombre, telefono, email, notas } = req.body
    const created = await prisma.cliente.create({data:{nombre, telefono, email, notas}})
    return res.status(201).json(created)
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
