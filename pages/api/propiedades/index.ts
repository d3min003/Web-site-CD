import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method === 'GET'){
  const propiedades = await prisma.propiedad.findMany({include:{cliente:true, asesor:true}})
    return res.json(propiedades)
  }
  if(req.method === 'POST'){
  try {
  const { direccion, tipo, operacion, precio, estatus, clienteId, asesorId, estado, ciudad, superficieConstruida, superficieTerreno, recamaras, banos, estacionamientos, amenidades } = req.body
  if (!direccion || typeof direccion !== 'string') return res.status(400).json({ error: 'Campo "direccion" es requerido' })
  const parsedPrecio = precio !== undefined && precio !== null && precio !== '' ? Number(precio) : 0
  if (!Number.isFinite(parsedPrecio)) return res.status(400).json({ error: 'Campo "precio" debe ser numérico' })
  const parsedClienteId = clienteId ? Number(clienteId) : undefined
  const parsedAsesorId = asesorId ? Number(asesorId) : undefined
  if (clienteId && !Number.isFinite(parsedClienteId)) return res.status(400).json({ error: 'clienteId inválido' })
  if (asesorId && !Number.isFinite(parsedAsesorId)) return res.status(400).json({ error: 'asesorId inválido' })
  const created = await prisma.propiedad.create({data:{
    direccion,
    tipo,
    operacion,
    precio: parsedPrecio,
    estatus,
    clienteId: parsedClienteId,
    asesorId: parsedAsesorId,
    estado,
    ciudad,
    superficieConstruida: superficieConstruida?Number(superficieConstruida):undefined,
    superficieTerreno: superficieTerreno?Number(superficieTerreno):undefined,
    recamaras: recamaras?Number(recamaras):undefined,
    banos: banos?Number(banos):undefined,
    estacionamientos: estacionamientos?Number(estacionamientos):undefined,
    amenidades: amenidades?amenidades:undefined
  }})
    return res.status(201).json(created)
  } catch (err: any) {
    console.error('POST /api/propiedades error:', err)
    return res.status(500).json({ error: err?.message || 'Internal Server Error' })
  }
  }
  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
