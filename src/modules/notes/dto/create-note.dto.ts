import { OmitType } from '@nestjs/mapped-types';
import { NotesEntity } from '../../../entities/notes.entity';

/**
 * Represents the data to create a note.
 */
export class CreateNoteDto extends OmitType(NotesEntity, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
