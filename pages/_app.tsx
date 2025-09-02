import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
