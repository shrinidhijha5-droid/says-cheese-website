import { League_Spartan, DM_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Says Cheese — India\u2019s Premium Photobooth Company',
  description:
    'Premium aesthetic photobooths installed at zero upfront cost. Every customer leaves carrying your brand. Book a demo.',
  keywords:
    'photobooth, cafe photobooth, mall photobooth, photostrip, franchise, Says Cheese, India',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${dmSans.variable}`}>
      <body className="font-body bg-black text-white antialiased selection:bg-[#F5D5D0] selection:text-black">
        {children}
        <Toaster theme="dark" position="bottom-right" richColors />
      </body>
    </html>
  )
}
