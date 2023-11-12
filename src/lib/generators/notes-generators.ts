import { faker } from '@faker-js/faker';
import { NotesEntity } from '../../entities/notes.entity';

/**
 * Generate a note with random data
 * @param fixedUUID {string} Optional fixed UUID
 * @returns {NotesEntity} A note entity
 */
export function generateNote(fixedUUID?: string): NotesEntity {
  const note = new NotesEntity();

  note.id = fixedUUID ?? faker.string.uuid();
  note.title = faker.lorem.words(3);
  note.content = faker.lorem.paragraph();
  note.createdAt = faker.date.past();
  note.updatedAt = faker.date.recent();

  return note;
}

/**
 * Generate a list of notes with random data
 * @param size {number} Number of notes to generate
 * @param fixedUUID {string} Optional fixed UUID
 * @returns {NotesEntity[]} A list of notes
 */
export function generateNotes(size: number, fixedUUID?: string): NotesEntity[] {
  const notes = Array.from({ length: size }, generateNote);

  if (fixedUUID) {
    notes[0].id = fixedUUID;
  }

  return notes;
}
