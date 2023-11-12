import { faker } from '@faker-js/faker';
import { NotesEntity } from '../../entities/notes.entity';
import { QueryError } from '../../lib/query-error';
import { NotesController } from './notes.controller';

const mockedNoteService = {
  all: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

jest.mock('./notes.service', () => {
  return {
    NotesService: {
      getInstance: jest.fn(() => mockedNoteService),
    },
  };
});

function generateNote(): NotesEntity {
  const note = new NotesEntity();
  note.id = faker.string.uuid();
  note.title = faker.lorem.words(3);
  note.content = faker.lorem.paragraph();
  note.createdAt = faker.date.past();
  note.updatedAt = faker.date.past();

  return note;
}

const error = new QueryError(404, 'Not found');
const responseMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
};

describe('NotesController', () => {
  let noteController: NotesController;

  beforeEach(async () => {
    noteController = await NotesController.getInstance();
    responseMock.status.mockClear();
    responseMock.json.mockClear();
  });

  it('should return an instance of NotesController and the service should be initialized', async () => {
    expect.assertions(2);

    expect(noteController).toBeInstanceOf(NotesController);
    expect(noteController['noteService']).toBeInstanceOf(Object);
  });

  it('all method, should response with status 200 and a list of notes', async () => {
    expect.assertions(2);

    const note = generateNote();

    mockedNoteService.all.mockResolvedValueOnce([note]);
    await noteController.all(null as never, responseMock as never);

    expect(responseMock.status).toHaveBeenCalledWith(200);
    expect(responseMock.json).toHaveBeenCalledWith([note]);
  });

  describe('getById method', () => {
    it('should response with status 200 and a note', async () => {
      expect.assertions(2);

      const note = generateNote();

      mockedNoteService.getById.mockResolvedValueOnce(note);
      await noteController.getById(
        { params: { id: note.id } } as never,
        responseMock as never,
      );

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(note);
    });

    it("should response with status 404 when the id doesn't exist", async () => {
      expect.assertions(2);

      mockedNoteService.getById.mockRejectedValue(error);
      await noteController.getById(
        { params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(responseMock.status).toHaveBeenCalledWith(404);
      expect(responseMock.send).toHaveBeenCalled();
    });
  });

  it('create method should response with status 201 and a note', async () => {
    expect.assertions(2);

    const note = generateNote();

    mockedNoteService.create.mockResolvedValueOnce(note);
    await noteController.create({ body: {} } as never, responseMock as never);

    expect(responseMock.status).toHaveBeenCalledWith(201);
    expect(responseMock.json).toHaveBeenCalledWith(note);
  });

  describe('update method', () => {
    it('should response with status 204 when the id exists', async () => {
      expect.assertions(2);

      await noteController.update(
        { body: {}, params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(responseMock.status).toHaveBeenCalledWith(204);
      expect(responseMock.send).toHaveBeenCalled();
    });

    it("should response with status 404 when the id doesn't exist", async () => {
      expect.assertions(2);

      mockedNoteService.update.mockRejectedValue(error);
      await noteController.update(
        { body: {}, params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(responseMock.status).toHaveBeenCalledWith(404);
      expect(responseMock.send).toHaveBeenCalled();
    });

    it('should throw the same error when we have an unexpected error', () => {
      const error = new Error();

      mockedNoteService.update.mockRejectedValue(error);

      const toExecute = noteController.update(
        { body: {}, params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(toExecute).rejects.toThrow(error);
    });
  });

  describe('delete method', () => {
    it('should response with status 204 when the id exists', async () => {
      expect.assertions(2);

      await noteController.delete(
        { params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(responseMock.status).toHaveBeenCalledWith(204);
      expect(responseMock.send).toHaveBeenCalled();
    });

    it("should response with status 404 when the id doesn't exist", async () => {
      expect.assertions(2);

      mockedNoteService.delete.mockRejectedValue(error);
      await noteController.delete(
        { params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(responseMock.status).toHaveBeenCalledWith(404);
      expect(responseMock.send).toHaveBeenCalled();
    });

    it('should throw the same error when we have an unexpected error', () => {
      const error = new Error();

      mockedNoteService.delete.mockRejectedValue(error);

      const toExecute = noteController.delete(
        { params: { id: faker.number.int() } } as never,
        responseMock as never,
      );

      expect(toExecute).rejects.toThrow(error);
    });
  });
});
