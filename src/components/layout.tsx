import NavBar from '@/components/NavBar'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className={`${inter.className} flex flex-col`}>
        <NavBar/>
        <div className="flex-grow py-6 px-12 rounded-md mx-6" style={{borderColor: '#1D267D', borderWidth: '3px', height: '90vh'}}>
          {children}
        </div>
        </div>
  )
}
