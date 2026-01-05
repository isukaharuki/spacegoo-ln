import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'SpaceGOO LN Translation Myanmar',
  description: 'Light novel publishing and translation',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}