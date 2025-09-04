import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { requireAuthApi } from '../../../lib/requireAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
  const auth = requireAuthApi(req,res)
  if(!auth) return
  const q = typeof req.query.q === 'string' ? req.query.q.trim() : undefined
  const where = q ? {
    OR: [
      { nombre: { contains: q } },
      { telefono: { contains: q } },
      { email: { contains: q } },
      { zonaInteres: { contains: q } },
      { tipoCliente: { contains: q } },
    ]
  } : undefined
  const clientes = await prisma.cliente.findMany({ where, include:{propiedades:true}})
    return res.json(clientes)
  }
  if(req.method === 'POST'){
  const auth = requireAuthApi(req,res)
  if(!auth) return
  const { nombre, telefono, email, notas, tipoCliente, presupuesto, zonaInteres, requerimientos, estatusCliente, interacciones, propiedadesInteres } = req.body
  const created = await prisma.cliente.create({data:{nombre, telefono, email, notas, tipoCliente, presupuesto: presupuesto?Number(presupuesto):undefined, zonaInteres, requerimientos, estatusCliente, interacciones, propiedadesInteres: propiedadesInteres?JSON.stringify(propiedadesInteres):undefined}})
    return res.status(201).json(created)
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
