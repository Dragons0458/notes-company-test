import { NotesEntity } from '../entities/notes.entity';
import { getRepository } from '../orm.config';
import { generateNotes } from '../lib/generators/notes-generators';

export default async function (numberOfElements = 10): Promise<NotesEntity[]> {
  console.log('Seeding notes...');
  const repository = await getRepository<NotesEntity>('notes');
  const notes = generateNotes(numberOfElements);

  await repository.insert(notes);
  console.log('Notes seeded!');

  return notes;
}
