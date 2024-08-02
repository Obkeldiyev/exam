const Joi = require("joi");

const taskCreateSchema = Joi.object().keys({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(1000).required()
});

module.exports = taskCreateSchema