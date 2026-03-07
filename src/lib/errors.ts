export type BusinessErrorCode = 
  
  | 'SPECIALTY_ALREADY_EXISTS' 
  | 'SPECIALTY_ALREADY_EXISTS_IN_TRASH' 
  | 'SPECIALTY_HAS_RELATED_RECORDS'
  | 'PRESTATION_ALREADY_EXISTS' 
  | 'PRESTATION_ALREADY_EXISTS_IN_TRASH' 
  | 'PERSON_HAS_OTHERS_PROFILES' 
  | 'PERSON_ALREADY_EXISTS_IN_TRASH'
  | 'PERSON_DNI_IN_USE' 
  | 'PERSON_HAS_USER'
  | 'PERSON_NOT_HAS_ASSOCIATED_EMAIL'
  | 'STAFF_MEMBER_HAS_CONSULTATIONS'
  | 'STAFF_MEMBER_HAS_CLINIC_HISTORY_POSTS'
  | 'STAFF_MEMBER_HAS_APPOINTMENTS'
  | 'NOT_FOUND' 
  | 'STAFF_MEMBER_HAS_NO_PROVIDER_DATA'
  | 'RECORD_HAS_ASSOCIATED_RECORDS'
  | 'UNAUTHORIZED';


export class BusinessError extends Error {
  constructor(
    public code: BusinessErrorCode,
    public message: string,
    public status: number = 400
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}

