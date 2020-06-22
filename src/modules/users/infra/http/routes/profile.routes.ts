// libs
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

// app -> middlewares

import enforceAuthentication from '../middlewares/enforceAuthentication';

// app -> controllers
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use('/', enforceAuthentication);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
