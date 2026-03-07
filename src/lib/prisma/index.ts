import { Prisma } from '@/generated/prisma'
import prisma from '@/lib/prisma/client'

export type TxClient = Prisma.TransactionClient

export {
    Prisma,
    prisma,
}

