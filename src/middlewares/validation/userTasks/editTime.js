const Joi = require("joi");

const editTimeUserTaskSchema = Joi.object().keys({
    days: Joi.number()
})

module.exports = editTimeUserTaskSchema