import { NotesEntity } from '../../entities/notes.entity';
import { faker } from '@faker-js/faker';

export function generateNote(fixedUUID?: string): NotesEntity {
  const note = new NotesEntity();

  note.id = fixedUUID ?? faker.string.uuid();
  note.title = faker.lorem.words(3);
  note.content = faker.lorem.paragraph();
  note.createdAt = faker.date.past();
  note.updatedAt = faker.date.recent();

  return note;
}

export function generateNotes(size: number, fixedUUID?: string): NotesEntity[] {
  const notes = Array.from({ length: size }, generateNote);

  if (fixedUUID) {
    notes[0].id = fixedUUID;
  }

  return notes;
}
