import { Repository } from 'typeorm';
import { NotesEntity } from '../../entities/notes.entity';
import { QueryError } from '../../lib/query-error';
import { getRepository } from '../../orm.config';
import { CreateNoteDto, NoteIdDto, UpdateNoteDto } from './dto';

/**
 * The notes service class is responsible for handling the business logic of the notes entity.
 */
export class NotesService {
  /**
   * The notes service instance.
   * @private
   */
  private static notesServiceInstance: NotesService;

  /**
   * The notes repository instance.
   * @private
   */
  private notesRepository!: Repository<NotesEntity>;

  private constructor() {}

  static async getInstance(): Promise<NotesService> {
    if (!this.notesServiceInstance) {
      this.notesServiceInstance = new NotesService();
      this.notesServiceInstance.notesRepository =
        await getRepository(NotesEntity);
    }

    return this.notesServiceInstance;
  }

  /**
   * Returns all notes.
   * @returns {Promise<NotesEntity[]>} The notes.
   */
  async all(): Promise<NotesEntity[]> {
    return this.notesRepository.find();
  }

  /**
   * Returns a note by id.
   * @param id {string} The note id.
   * @returns {Promise<NotesEntity>} The note.
   */
  async getById(id: string): Promise<NotesEntity> {
    const note = await this.notesRepository.findOneBy({ id });

    if (!note) throw new QueryError(404, 'Not found');

    return note;
  }

  /**
   * Creates a new note.
   * @param createNote {CreateNoteDto} The note data.
   * @returns {Promise<NoteIdDto>} The note id.
   */
  async create(createNote: CreateNoteDto): Promise<NoteIdDto> {
    const {
      identifiers: [note],
    } = await this.notesRepository.insert(createNote);

    return { id: note?.id };
  }

  /**
   * Updates a note.
   * @param id {string} The note id.
   * @param updateNote {UpdateNoteDto} The note data.
   * @throws {QueryError} If the note is not found.
   * @returns {Promise<void>}
   */
  async update(id: string, updateNote: UpdateNoteDto): Promise<void> {
    const { affected } = await this.notesRepository.update(id, updateNote);

    if (!affected) throw new QueryError(404, 'Not found');
  }

  /**
   * Deletes a note.
   * @param id {string} The note id.
   * @throws {QueryError} If the note is not found.
   * @returns {Promise<void>}
   */
  async delete(id: string): Promise<void> {
    const { affected } = await this.notesRepository.delete(id);

    if (!affected) throw new QueryError(404, 'Not found');
  }
}
