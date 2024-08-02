const { sign } = require("../utils/jwt");
const { fetchData } = require("../utils/postgres");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        let users = await fetchData("SELECT * FROM users");

        let check = users.find(el => el.username === username && el.password === password);

        if(check){
            let token = sign({id: check.id});

            res.send({
                success: true,
                message: "Welcome",
                token: token
            })
        }else{
            res.status(404).send({
                success: false,
                message: "Username or password is incorrect"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    login
}