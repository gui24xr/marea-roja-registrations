// lib/forms/specialtyFormFields.tsx
import { FieldConfig } from "@/hooks/useDynamicForm";
//---SPECIALTies----------------------------------------------------------------------
export interface SpecialtyFormData {
  identifier: string;
  displayName: string;
}

export const specialtyFormFields: FieldConfig<keyof SpecialtyFormData>[] = [
  {
    name: "identifier",
    label: "Identificador de especialidad.",
    required: true,
    placeholder: "Ingrese un identificador de especialidad. EJ: MED-GEN, MED-CLI, etc.",
  },
  {
    name: "displayName",
    label: "Nombre de visualizacion de especialidad.",
    required: true,
    placeholder: "Ingrese el nombre con el cuel se visualizara la especialidad. EJ: Medicina general",
  },
];

//--Providers---------------------------------------------------------------------
export interface ProviderFormData {
  dni: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone?: string;
  whatsAppNumber?: string;
  specialtyIds: string[];
  record?: string;
}
export const providerFormFields: FieldConfig<keyof ProviderFormData>[] = [
  {
    name: "dni",
    label: "DNI del medico.",
    required: true,
    placeholder: "Ingrese el DNI del medico.",
  },
  {
    name: "firstName",
    label: "Nombre del medico.",
    required: true,
    placeholder: "Ingrese el nombre del medico.",
  },
  {
    name: "lastName",
    label: "Apellido del medico.",
    required: true,
    placeholder: "Ingrese el apellido del medico.",
  },
  {
    name: "displayName",
    label: "Nombre de visualizacion del medico.",
    required: true,
    placeholder: "Ingrese el nombre con el cuel se visualizara el medico.",
  },
  {
    name: "email",
    label: "Email del medico.",
    required: true,
    placeholder: "Ingrese el email del medico.",
  },
  {
    name: "phone",
    label: "Telefono del medico.",
    placeholder: "Ingrese el telefono del medico.",
  },
  {
    name: "whatsAppNumber",
    label: "Numero de WhatsApp del medico.",
    placeholder: "Ingrese el numero de WhatsApp del medico.",
  },
  {
    name: "specialtyIds",
    label: "Especialidades del medico.",
    type: "multiselect",
    required: true,
    placeholder: "Seleccione las especialidades",
  },
  {
    name: "record",
    label: "Legajo del medico.",
    placeholder: "Ingrese el legajo del medico.",
  },
];
  