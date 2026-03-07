'use server'
import { prisma, Prisma} from "@/lib/prisma"


export async function newInscription (data : any){
   console.log('Data en server action: ', data)
   //aca luego voy a validar con zod.
   const result = await prisma.swimmer.findFirstOrThrow({where:{dni:data.dni}})

   console.log(result)
   return null
}