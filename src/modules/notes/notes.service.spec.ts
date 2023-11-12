import { faker } from '@faker-js/faker';
import { CreateNoteDto, NoteIdDto, UpdateNoteDto } from './dto';
import { QueryError } from '../../lib/query-error';
import { getRepository } from '../../orm.config';
import { NotesService } from './notes.service';
import { NotesEntity } from '../../entities/notes.entity';

jest.mock('../../orm.config');

const error = new QueryError(404, 'Not found');
const MockedGetRepository = getRepository as jest.MockedFunction<
  typeof getRepository
>;

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

MockedGetRepository.mockImplementation(() => mockRepository as never);

describe('NoteService', () => {
  let noteService: NotesService;

  beforeEach(async () => {
    noteService = await NotesService.getInstance();

    for (const fn of Object.values(mockRepository)) {
      fn.mockClear();
    }
  });

  it('should return an instance of NotesService and the repository should be initialized', async () => {
    expect.assertions(2);
    expect(noteService).toBeInstanceOf(NotesService);
    expect(noteService['notesRepository']).toBeInstanceOf(Object);
  });

  it('all method, should return an array', () => {
    mockRepository.find.mockResolvedValueOnce([]);

    expect(noteService.all()).resolves.toBeInstanceOf(Array);
  });

  describe('getById method', () => {
    it('should return a NoteEntity instance', () => {
      mockRepository.findOneBy.mockResolvedValueOnce(new NotesEntity());

      expect(noteService.getById(faker.string.uuid())).resolves.toBeInstanceOf(
        NotesEntity,
      );
    });

    it('should throw an error with status 404 when the id is not found', () => {
      mockRepository.findOneBy.mockResolvedValueOnce(null);

      expect(noteService.getById(faker.string.uuid())).rejects.toThrow(error);
    });
  });

  it('create method should return a NoteId instance', async () => {
    expect.assertions(2);

    const noteId = new NoteIdDto();
    noteId.id = faker.string.uuid();
    mockRepository.insert.mockResolvedValueOnce({ identifiers: [noteId] });

    const res = await noteService.create({} as CreateNoteDto);

    expect(res).toBeInstanceOf(Object);
    expect(res.id).toStrictEqual(noteId.id);
  });

  describe('update method', () => {
    it("shouldn't return an error when the id is found", () => {
      mockRepository.update.mockResolvedValueOnce({ affected: 1 });

      expect(
        noteService.update(faker.string.uuid(), {} as UpdateNoteDto),
      ).resolves.not.toThrow();
    });

    it('should throw an error with status 404 when the id is not found', () => {
      mockRepository.update.mockResolvedValueOnce({ affected: 0 });

      expect(
        noteService.update(faker.string.uuid(), {} as UpdateNoteDto),
      ).rejects.toThrow(error);
    });
  });

  describe('delete method', () => {
    it("shouldn't return an error when the id is found", () => {
      mockRepository.delete.mockResolvedValueOnce({ affected: 1 });

      expect(noteService.delete(faker.string.uuid())).resolves.not.toThrow();
    });

    it('should throw an error with status 404 when the id is not found', () => {
      mockRepository.delete.mockResolvedValueOnce({ affected: 0 });

      expect(noteService.delete(faker.string.uuid())).rejects.toThrow(error);
    });
  });
});
