const Joi = require("joi");

const createManagerSchema = Joi.object().keys({
    username: Joi.string().min(4).max(100).required(),
    password: Joi.string().min(4).max(100).required(),
    fullname: Joi.string().max(200).required(),
    company_id: Joi.number().required()
});

module.exports = createManagerSchema