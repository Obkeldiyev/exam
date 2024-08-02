const Joi = require("joi");

const companyEditSchema = Joi.object().keys({
    name: Joi.string().required()
})

module.exports = companyEditSchema