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

export default async function page() {

    const swimmersLIst = await prisma.swimmer.findMany()


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>DNI</TableHead>
                    <TableHead>APELLIDO</TableHead>
                    <TableHead>NOMBRE</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {swimmersLIst.map((swimmer) => (
                    <TableRow key={swimmer.dni}>
                        <TableCell className="font-medium">{swimmer.dni}</TableCell>
                        <TableCell>{swimmer.lastName}</TableCell>
                        <TableCell>{swimmer.firstName}</TableCell>
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
