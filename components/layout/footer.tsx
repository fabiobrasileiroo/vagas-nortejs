import { Github, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LogoSvgComponent from '../logo'
export default function Footer() {
  return (
    <footer className="bg-black mt-8 pt-6 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4 max-w-7xl mx-auto">
        <div className="flex flex-row items-center space-x-5">
          {/* <Image
            src="/logo/logo-dark.svg"
            alt="Logo NorteJS"
            width={230}
            height={41}
          /> */}
          <LogoSvgComponent bg="dark" />
          <p className="text-white max-w-md">Nós conectamos candidatos a empregos ideais, oferecendo funcionalidades intuitivas para busca e gerenciamento de vagas.</p>
        </div>

        <div className="flex space-x-4 items-center ">
          <Link className="text-white hover:scale-115 ease-in-out duration-300 " href="https://github.com/your-repo-link" target="_blank" >
            <Github />
          </Link>
          <Link className="text-white hover:scale-115 ease-in-out duration-300 " href="https://github.com/your-repo-link" target="_blank" >
            <Linkedin />
          </Link>
          <Link className="text-white hover:scale-115 ease-in-out duration-300" href="https://github.com/your-repo-link" target="_blank" >
            <Instagram/>
          </Link>
        </div>
      </div>

      {/* Divider line abaixo do conteúdo do footer */}
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-4" />
    </footer>
  )
}