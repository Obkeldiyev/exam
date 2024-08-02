const Joi = require("joi");

const getByIdUserTaskSchema = Joi.object().keys({
    id: Joi.number().required()
})

module.exports = getByIdUserTaskSchema