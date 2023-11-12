import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

/**
 * Represents the data to update a note.
 */
export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
