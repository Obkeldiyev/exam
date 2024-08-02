const Joi = require("joi");

const getByUserTaskSchema = Joi.object().keys({
    user_id: Joi.number().required(),
})

module.exports = getByUserTaskSchema