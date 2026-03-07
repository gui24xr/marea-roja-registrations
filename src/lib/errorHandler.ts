import { z } from "zod";
import { BusinessError } from "@/lib/errors";
// Integramos tus códigos de negocio
export type BusinessErrorCode = 
  | 'SPECIALTY_ALREADY_EXISTS' 
  | 'SPECIALTY_ALREADY_EXISTS_IN_TRASH' 
  | 'PRESTATION_ALREADY_EXISTS' 
  | 'PRESTATION_ALREADY_EXISTS_IN_TRASH' 
  | 'PERSON_HAS_OTHERS_PROFILES' 
  | 'PERSON_ALREADY_EXISTS_IN_TRASH'
  | 'PERSON_DNI_IN_USE' 
  | 'PERSON_HAS_USER'
  | 'PERSON_NOT_HAS_ASSOCIATED_EMAIL'
  | 'NOT_FOUND' 
  | 'UNAUTHORIZED'
  | 'VALIDATION_ERROR' // Añadidos para consistencia
  | 'INTERNAL_SERVER_ERROR';
type errorHandlerResponse = {
  code: BusinessErrorCode | string;
  message: string;
  fields?: string[]
}
export function errorHandler(error: unknown): errorHandlerResponse  {
  
  // 1. ERRORES DE NEGOCIO (Tu clase personalizada)
  if (error instanceof BusinessError) {
    return {
      code: error.code,
      message: error.message
    };
  }

  // 2. ERRORES DE ZOD
  if (error instanceof z.ZodError) {
    return {
      code: 'VALIDATION_ERROR',
      message: error.issues.map(issue => issue.message).join(', ')
    };
  }

  // 3. ERRORES DE PRISMA
  const isPrismaError = error && typeof error === 'object' && 'code' in error;
  if (isPrismaError) {
    const prismaError = error as { code: string; meta?: any };
    
    switch (prismaError.code) {
      case 'P2002': {
    const { target, modelName } = prismaError.meta as { target: string[], modelName: string };
    
    return { 
        code: `${modelName.toUpperCase()}_UNIQUE_CONFLICT`, 
        message: `Ya existe un registro con ese ${target?.join(', ')}`,
        fields: target || []  // 👈 Agregás esto
    };
}
      case 'P2003':
        return { code: 'RECORD_HAS_ASSOCIATED_RECORDS_CANNOT_BE_DELETED', message: 'Este registro no se puede borrar ya que tiene registros asociados' };
      case 'P2025':
        return { code: 'RECORD_NOT_FOUND', message: 'El registro no existe' };
      default:
        return { code: `DB_ERROR_${prismaError.code}`, message: 'Error de base de datos' };
    }
  }

  // 4. FALLBACK FINAL
  console.error("Critical Error:", error);
  return { 
    code: 'INTERNAL_SERVER_ERROR', 
    message: 'Ocurrió un error inesperado' 
  };
}