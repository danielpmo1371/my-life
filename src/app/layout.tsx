import NavBar from '@/components/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Life',
  description: 'Take control of your life',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <NavBar/>
        <div className="flex-grow py-6 px-12 bg-zinc-800 rounded-md mx-6 h-full">
          {children}
        </div>
        </body>
    </html>
  )
}
