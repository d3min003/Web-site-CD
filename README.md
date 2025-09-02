# CRM Inmobiliario - Minimal Scaffold

Proyecto minimal de CRM inmobiliario con Next.js + TypeScript + Prisma.

Características incluidas:
- Modelos Prisma: Cliente, Asesor, Propiedad (relaciones)
- API REST en `/pages/api/*` para CRUD de clientes, asesores y propiedades
- Páginas básicas en `/clientes`, `/asesores`, `/propiedades` y Dashboard `/`
- TailwindCSS minimal instalado (config incluida)

Rápido para comenzar (Windows PowerShell):

1) Instala dependencias

```powershell
cd c:\Users\J4vie\Desktop\web
npm install
```

2) Configura la base de datos en `.env` (DATABASE_URL). Recomiendo Supabase o Neon para PostgreSQL.

3) Genera Prisma Client y aplica esquema (localmente puedes usar `prisma db push`)

```powershell
npx prisma generate
npx prisma db push
```

4) Ejecuta en modo desarrollo

```powershell
npm run dev
```

Notas:
- Este scaffold usa PostgreSQL por defecto (ver `prisma/schema.prisma`). Para desarrollo rápido puedes apuntar a SQLite cambiando `provider` y `DATABASE_URL` pero la intención es producción en Postgres.
- Integración de `shadcn/ui` y autenticación se dejan como próximos pasos.

Siguientes pasos recomendados:
- Añadir validación de formularios (Zod/react-hook-form)
- Páginas de detalle y edición (formularios con PUT/PATCH)
- Autenticación de un único usuario (NextAuth/Clerk)
- Integración de shadcn/ui para componentes UI
