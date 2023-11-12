import { validateAndTransform } from '../../lib/input-validator-middleware';
import router from '../../lib/router';
import {
  CreateNoteDto,
  DeleteNoteByIdDto,
  GetNoteByIdDto,
  UpdateNoteDto,
} from './dto';
import { NotesController } from './notes.controller';

router.get('/', async (req, res) => {
  const notesController = await NotesController.getInstance();

  await notesController.all(req, res);
});

router.get(
  '/:id',
  validateAndTransform({ params: GetNoteByIdDto }),
  async (req, res) => {
    const notesController = await NotesController.getInstance();

    await notesController.getById(req, res);
  },
);

router.post(
  '/',
  validateAndTransform({ body: CreateNoteDto }),
  async (req, res) => {
    const notesController = await NotesController.getInstance();

    await notesController.create(req, res);
  },
);

router.put(
  '/:id',
  validateAndTransform({ body: UpdateNoteDto, params: GetNoteByIdDto }),
  async (req, res) => {
    const notesController = await NotesController.getInstance();

    await notesController.update(req, res);
  },
);

router.delete(
  '/:id',
  validateAndTransform({ params: DeleteNoteByIdDto }),
  async (req, res) => {
    const notesController = await NotesController.getInstance();

    await notesController.delete(req, res);
  },
);

export default router;
