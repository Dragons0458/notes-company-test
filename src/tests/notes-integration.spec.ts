import supertest from 'supertest';
import '../modules/notes/handler';
import app from '../app';
import { NotesEntity } from '../entities/notes.entity';
import notesSeeder from '../seeds/notes.seed';
import { faker } from '@faker-js/faker';

describe('Notes integration tests', () => {
  let generatedNotes: NotesEntity[];

  beforeAll(async () => {
    generatedNotes = await notesSeeder();
  });

  it('should return 200 when get all notes and an array type', async () => {
    expect.assertions(2);

    const { body, status } = await supertest(app).get('/notes');

    expect(status).toStrictEqual(200);
    expect(body).toBeInstanceOf(Array);
  });

  describe('Get note by id', () => {
    it('should return 200 when get note by id and an object type', async () => {
      expect.assertions(2);

      const randomNoteNumber = faker.number.int({
        min: 0,
        max: generatedNotes.length - 1,
      });
      const { body, status } = await supertest(app).get(
        `/notes/${generatedNotes[randomNoteNumber].id}`,
      );

      expect(status).toStrictEqual(200);
      expect(body).toBeInstanceOf(Object);
    });

    it('should return 404 when note not found', async () => {
      const { status } = await supertest(app).get(
        `/notes/${faker.string.uuid()}`,
      );

      expect(status).toStrictEqual(404);
    });
  });

  describe('Create note', () => {
    it('should return 201 when create a note', async () => {
      const { status } = await supertest(app)
        .post('/notes')
        .send({
          title: faker.lorem.words(3),
          content: faker.lorem.paragraph(),
        });

      expect(status).toStrictEqual(201);
    });

    it('should return 400 when create a note with invalid body', async () => {
      expect.assertions(1);

      const { status } = await supertest(app)
        .post('/notes')
        .send({
          title: faker.lorem.words(3),
        });

      expect(status).toStrictEqual(400);
    });
  });

  describe('Update note', () => {
    it('should return 204 when update a note', async () => {
      const randomNoteNumber = faker.number.int({
        min: 0,
        max: generatedNotes.length - 1,
      });
      const { status } = await supertest(app)
        .put(`/notes/${generatedNotes[randomNoteNumber].id}`)
        .send({
          title: faker.lorem.words(3),
          content: faker.lorem.paragraph(),
        });

      expect(status).toStrictEqual(204);
    });

    it('should return 400 when update a note with invalid body', async () => {
      const randomNoteNumber = faker.number.int({
        min: 0,
        max: generatedNotes.length - 1,
      });
      const { status } = await supertest(app)
        .put(`/notes/${generatedNotes[randomNoteNumber].id}`)
        .send({
          title: faker.lorem.words(102),
        });

      expect(status).toStrictEqual(400);
    });

    it('should return 404 when note not found', async () => {
      const { status } = await supertest(app)
        .put(`/notes/${faker.string.uuid()}`)
        .send({
          title: faker.lorem.words(3),
          content: faker.lorem.paragraph(),
        });

      expect(status).toStrictEqual(404);
    });
  });

  describe('Delete note', () => {
    it('should return 204 when delete a note', async () => {
      const randomNoteNumber = faker.number.int({
        min: 0,
        max: generatedNotes.length - 1,
      });
      const { status } = await supertest(app).delete(
        `/notes/${generatedNotes[randomNoteNumber].id}`,
      );

      expect(status).toStrictEqual(204);
    });

    it('should return 404 when note not found', async () => {
      const { status } = await supertest(app).delete(
        `/notes/${faker.string.uuid()}`,
      );

      expect(status).toStrictEqual(404);
    });
  });
});
