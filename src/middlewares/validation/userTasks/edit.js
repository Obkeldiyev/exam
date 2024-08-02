const Joi = require("joi");

const editUserTaskSchema = Joi.object().keys({
    user_id: Joi.number(),
    task_id: Joi.number(),
})

module.exports = editUserTaskSchema