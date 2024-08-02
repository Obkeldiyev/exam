const Joi = require("joi");

const getByTaskUserTaskSchema = Joi.object().keys({
    task_id: Joi.number().required()
})

module.exports = getByTaskUserTaskSchema