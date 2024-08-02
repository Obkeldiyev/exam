const Joi = require("joi");

const editManagerSchema = Joi.object().keys({
    username: Joi.string().min(4).max(100),
    password: Joi.string().min(4).max(100),
    fullname: Joi.string().max(200),
    company_id: Joi.number()
});

module.exports = editManagerSchema