import { check } from "express-validator";
import validateResult from "../../../middleware/validation/validateResult.js";

/*
 * Validates register request
 */

const validateChangeTaskStatus = [
    check('toStatus')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('draggedTaskId')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export default validateChangeTaskStatus;
