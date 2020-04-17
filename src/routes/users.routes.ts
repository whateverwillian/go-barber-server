import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

routes.use(ensureAuthenticated);

routes.patch('/avatar', upload.single('avatar'), async (request, response) => {
  const UpdateUserAvatar = new UpdateUserAvatarService();

  await UpdateUserAvatar.execute({
    user_id: request.user.id,
    avatar_filename: request.file.filename,
  });

  return response.json({ message: 'Updated.' });
});

export default routes;
