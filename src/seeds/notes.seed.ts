import { NotesEntity } from '../entities/notes.entity';
import { generateNotes } from '../lib/generators/notes-generators';
import { getRepository } from '../orm.config';

/**
 * Seed notes
 * @param numberOfElements {number} Number of notes to seed
 * @returns {Promise<NotesEntity[]>} Promise with the seeded notes
 */
export default async function (
  numberOfElements: number = 10,
): Promise<NotesEntity[]> {
  console.log('Seeding notes...');
  const repository = await getRepository<NotesEntity>('notes');
  const notes = generateNotes(numberOfElements);

  await repository.insert(notes);
  console.log('Notes seeded!');

  return notes;
}
