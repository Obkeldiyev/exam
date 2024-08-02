const validation = (schema, typeSchema = "body") => {
    return async (req, res, next) => {
        try {
          const validated = await schema.validateAsync(req[typeSchema])
          next()
        } catch (error) {
           res.status(error.status || 403).send({
            success: false,
            message: error.message
           })
        }
    }
}

module.exports = validation