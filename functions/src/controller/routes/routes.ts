import * as express from 'express';
import { signup, login, getParts, addParts, countParts, removeParts } from '../handlers/handlers'

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);

router.route('/parts')
    .get(getParts)
    .post(addParts)
    .put(countParts)
    .delete(removeParts)

export default router