import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 text-white rounded flex items-center justify-center font-bold">CI</div>
          <Link href="/"><a className="text-lg font-semibold text-gray-800">CRM Inmobiliario</a></Link>
        </div>
        <nav className="space-x-4 text-sm">
          <Link href="/clientes"><a className="text-gray-600 hover:text-gray-900">Clientes</a></Link>
          <Link href="/asesores"><a className="text-gray-600 hover:text-gray-900">Asesores</a></Link>
          <Link href="/propiedades"><a className="text-gray-600 hover:text-gray-900">Propiedades</a></Link>
        </nav>
      </div>
    </header>
  )
}
