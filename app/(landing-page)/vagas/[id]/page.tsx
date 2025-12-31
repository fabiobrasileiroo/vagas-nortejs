'use server'
import { useRouter } from 'next/navigation';
export default async function VagasId() {
  const router = useRouter()
  return (
    <div>
      Rota /vagas/id
    </div>
  )


}