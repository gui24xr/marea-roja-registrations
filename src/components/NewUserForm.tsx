'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewUserForm({ person }: { person: any }) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.currentTarget))
        console.log('Aca habria que validar')
        console.log('Datos form:', data.email)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Enviar Invitacion</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Crear usuario</DialogTitle>
                        <DialogDescription>
                            Enviar invitacion para usuario del sistema a {person.lastName + ' ' + person.firstName}.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup className="mt-4">
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                title="Ingrese un email válido (ej: usuario@email.com)" required />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Aceptar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}