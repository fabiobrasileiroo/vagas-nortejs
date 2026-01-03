"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoSvgComponent from '../logo';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href ?? ''))

  return (
    <nav className="flex justify-between p-4 w-full max-w-7xl mx-auto items-center border-b border-gray-200 mb-8">
      <div>
        {/* <Image src="/logo/logo-default.svg" alt="Logo NorteJS" width={180} height={120} /> */}
        <LogoSvgComponent bg="light" />
      </div>

      <ul className="flex items-center space-x-4">
        <li>
          <Link href="/" className={cn(
            "hover:font-medium ease-in-out duration-300",
            isActive('/') && 'font-medium')
            }>
            Home
          </Link>
          {isActive('/') && <div className="border-b-[3px] border-blue-400/90 rounded-2xl" />}
        </li>

        <li>
          <Link href="/sobre" className={`hover:font-medium ease-in-out duration-300  ${isActive('/sobre') ? 'font-medium' : ''}`}>Sobre</Link>
          {isActive('/sobre') && <div className="border-b-[3px] border-blue-400/90 rounded-2xl" />}
        </li>

        <li>
          <Link href="/vagas" className={`hover:font-medium ease-in-out duration-300  ${isActive('/vagas') ? 'font-medium' : ''}`}>Vagas</Link>
          {isActive('/vagas') && <div className="border-b-[3px] border-blue-400/90 rounded-2xl" />}
        </li>

        <li>
          <Link href="/cadastrar-vagas" className={`hover:font-medium ease-in-out duration-300  ${isActive('/cadastrar-vagas') ? 'font-medium' : ''}`}>Cadastrar Vagas</Link>
          {isActive('/cadastrar-vagas') && <div className="border-b-[3px] border-blue-400/90 rounded-2xl" />}
        </li>
      </ul>
    </nav >
  )
}