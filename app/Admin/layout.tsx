export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import User from '../(components)/User/page'
import './globals.css'
import { getUser } from '../(components)/Header'
import Link from 'next/link'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user= getUser()
  return (
    <html lang="en">
      <body className=" h-screen bg-gradient-to-tr text-center from-orange-400 via-orange-900 to-orange-800">
        <div className=' h-[50px] flex flex-row bg-gradient-to-tr from-slate-800/40 to-slate-400/70 justify-around items-center '><Link href={'/studio'}><div>Sanity Dashboard</div></Link><div><User user={user} /></div></div>
        {children}
        </body>
    </html>
  )
}
