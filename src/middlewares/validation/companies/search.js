const Joi = require("joi");

const companySearchSchema = Joi.object().keys({
    name: Joi.string().required()
})

module.exports = companySearchSchema