const Joi = require("joi");

const createUserTaskSchema = Joi.object().keys({
    user_id: Joi.number().required(),
    task_id: Joi.number().required(),
    days: Joi.number().required()
})

module.exports = createUserTaskSchema