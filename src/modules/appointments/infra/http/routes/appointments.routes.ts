// libs
import Router from 'express';

// middlewares
import enforceAuthentication from '@modules/users/infra/http/middlewares/enforceAuthentication';

import AppointmentsController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(enforceAuthentication);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
