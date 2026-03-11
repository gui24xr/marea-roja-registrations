import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { prisma, Prisma } from "@/lib/prisma"
import { NewUserForm } from "@/components/NewUserForm"

export default async function page() {

    const personsList = await prisma.person.findMany({
        include: {
            swimmer: true,
            user: true
        }
    })

    console.log('Lista de miembros del natatorio: ', personsList)


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>DNI</TableHead>
                    <TableHead>APELLIDO</TableHead>
                    <TableHead>NOMBRE</TableHead>
                    <TableHead>es Nadador</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {personsList.map((person) => (
                    <TableRow key={person.dni}>
                        <TableCell className="font-medium">{person.dni}</TableCell>
                        <TableCell>{person.lastName}</TableCell>
                        <TableCell>{person.firstName}</TableCell>
                        <TableCell>{person.swimmer ? 'Si' : 'No'}</TableCell>
                        <TableCell>{person.user?.status || <NewUserForm person={person}/>}</TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Administrar Usuario</DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

}
