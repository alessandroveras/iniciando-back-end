// libs
import { Router } from 'express';

// app -> middlewares
import enforceAuthentication from '../middlewares/enforceAuthentication';

// app -> controllers
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use('/', enforceAuthentication);

profileRouter.get('/', profileController.show);

profileRouter.put('/', profileController.update);

export default profileRouter;
