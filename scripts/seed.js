const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main(){
  console.log('Creating asesor...')
  const asesor = await prisma.asesor.create({ data: { nombre: 'Asesor Test', telefono: '555-0001', email: 'asesor@test.com', experiencia: 4, zona: 'Centro', estatus: 'activo' } })
  console.log('Asesor created:', asesor.id)

  console.log('Creating cliente...')
  const cliente = await prisma.cliente.create({ data: { nombre: 'Cliente Test', telefono: '555-0002', email: 'cliente@test.com', tipoCliente: 'Comprador', presupuesto: 120000, zonaInteres: 'Centro', requerimientos: '3 recámaras' } })
  console.log('Cliente created:', cliente.id)

  console.log('Creating propiedad linked to asesor and cliente...')
  const propiedad = await prisma.propiedad.create({ data: { direccion: 'Calle Prueba 123', tipo: 'Casa', operacion: 'Venta', precio: 100000, estado: 'Nuevo', ciudad: 'Ciudad', superficieConstruida: 120, superficieTerreno: 200, recamaras: 3, banos: 2, estacionamientos: 1, amenidades: '"Piscina, Jardín"', estatus: 'disponible', asesorId: asesor.id, clienteId: cliente.id } })
  console.log('Propiedad created:', propiedad.id)

  console.log({ asesor, cliente, propiedad })
}

main()
  .catch(e=>{ console.error(e); process.exit(1) })
  .finally(()=>prisma.$disconnect())
