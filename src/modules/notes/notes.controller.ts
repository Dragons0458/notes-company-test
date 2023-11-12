import { Request, Response } from 'express';
import { QueryError } from '../../lib/query-error';
import { NotesService } from './notes.service';

/**
 * The NoteController class is responsible for handling the requests.
 */
export class NotesController {
  /**
   * The instance of the NoteController class.
   * @private
   */
  private static noteControllerInstance: NotesController;

  /**
   * The noteService property is an instance of the NoteService class.
   * @private
   */
  private noteService!: NotesService;

  private constructor() {}

  /**
   * Returns an instance of the NoteController class.
   */
  static async getInstance(): Promise<NotesController> {
    if (!this.noteControllerInstance) {
      this.noteControllerInstance = new NotesController();
      this.noteControllerInstance.noteService =
        await NotesService.getInstance();
    }

    return this.noteControllerInstance;
  }

  /**
   * The all method is responsible for handling the GET /notes request.
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   */
  async all(req: Request, res: Response) {
    const notes = await this.noteService.all();

    res.status(200).json(notes);
  }

  /**
   * The getById method is responsible for handling the GET /notes/:id request.
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   */
  async getById(req: Request, res: Response) {
    try {
      const note = await this.noteService.getById(req.params.id);

      res.status(200).json(note);
    } catch (e) {
      if (!(e instanceof QueryError)) throw e;

      res.status(e.code).send();
    }
  }

  /**
   * The create method is responsible for handling the POST /notes request.
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   */
  async create(req: Request, res: Response) {
    const noteId = await this.noteService.create(req.body);

    res.status(201).json(noteId);
  }

  /**
   * The update method is responsible for handling the PUT /notes/:id request.
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   */
  async update(req: Request, res: Response) {
    try {
      await this.noteService.update(+req.params.id, req.body);

      res.status(204).send();
    } catch (e) {
      if (!(e instanceof QueryError)) throw e;

      res.status(e.code).send();
    }
  }

  /**
   * The delete method is responsible for handling the DELETE /notes/:id request.
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   */
  async delete(req: Request, res: Response) {
    try {
      await this.noteService.delete(+req.params.id);

      res.status(204).send();
    } catch (e) {
      if (!(e instanceof QueryError)) throw e;

      res.status(e.code).send();
    }
  }
}
