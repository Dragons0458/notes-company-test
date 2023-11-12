import { PickType } from '@nestjs/mapped-types';
import { NotesEntity } from '../../../entities/notes.entity';

/**
 * Represents the note id.
 */
export class NoteIdDto extends PickType(NotesEntity, ['id'] as const) {}
