const { verify } = require("../utils/jwt")
const { fetchData } = require("../utils/postgres")

const verifyToken = () => {
   return async(req, res, next) => {
    let { token } = req.headers

    if(!token){
        res.status(403).send({
            success: false,
            message: "Token not found. Please give token"
        })
        return
    }

    let { id } = verify(token)

    let [user] = await fetchData("Select * from users where id = $1", id)

    if(user){
      req.userId = user.id
      next()
    } else {
        res.status(403).send({
            success: false,
            message: "Wrong token"
        })
    }
   }
}

module.exports = verifyToken