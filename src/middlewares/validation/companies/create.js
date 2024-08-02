const Joi = require("joi");

const companyCreateSchema = Joi.object().keys({
    name: Joi.string().required()
})

module.exports = companyCreateSchema