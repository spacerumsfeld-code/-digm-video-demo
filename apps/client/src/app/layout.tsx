import { Manrope } from 'next/font/google'
import './globals.css'
import { Navbar } from '../ui/NavBar'

const inter = Manrope({ weight: 
  '500', subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
            <body>
                <main>
      <Navbar />
      <div className={inter.className}>{children}</div>
                </main>
      </body>
    </html>
  )
}
