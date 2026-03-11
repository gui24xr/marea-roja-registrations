'use server'
import { prisma, Prisma } from "@/lib/prisma"
import { clerkClient } from '@clerk/nextjs/server'



export async function createAndInviteUser(data: { personId: string, email: string }) {
    try {
        //1- validar el email x qno confio en el front?
        //2- exizte la persona? si no existe lanzo error
        //3- envio invitacion de clerk con la metadata de person y recojo datos
        //4- guardo el user y la data de invitaciion de clerk en user y lo conecto al personId
        const client = await clerkClient()
        const invitation = await client.invitations.createInvitation({
            emailAddress: 'email',
            redirectUrl: `${process.env.PROJECT_URL}/my-sign-up`,
            publicMetadata: {
                personId: data.personId,
                userType: 'USER'
            },
        })

        const newUser = await prisma.user.create({
            data: {
                clerkInvitationData: JSON.parse(JSON.stringify(invitation)),
                email: data.email,
                type: 'USER',
                status: 'INVITED',
                person: {
                    connect: { id: data.personId }  
                }
            }
        })

        return {
            success: true,
            payload: {
                invitationUrl: 'asasasasasaasa',
                user: newUser
            }
        }

    } catch (error) {
        //error de clerk? borro el registro creado
        //error al guasdar en BD? revoco en clerk
        console.log(error)
        return {
            success: false,
        }
    }
}