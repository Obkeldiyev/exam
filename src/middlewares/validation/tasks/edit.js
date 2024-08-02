const Joi = require("joi");

const taskEditSchema = Joi.object().keys({
    title: Joi.string().max(100),
    description: Joi.string().max(1000)
});

module.exports = taskEditSchema