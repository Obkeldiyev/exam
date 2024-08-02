const { fetchData } = require("../utils/postgres")

const getAllAdmins = async (req, res) => {
    try {
        const admins = await fetchData("SELECT * FROM users WHERE role='admin'");

        res.send({
            success: true,
            message: "All admins",
            data: admins
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const createAdmin = async (req, res) => {
    try {
        const { username, password, fullname, company_id } = req.body;

        const admins = await fetchData("SELECT * FROM users");

        const check = admins.find(el => el.username === username);

        if(check){
            res.status(409).send({
                success: false,
                message: "This username has been taken"
            })
        }else{
            await fetchData("INSERT INTO users(username, password, fullname, company_id, role) VALUES($1, $2, $3, $4, $5)", username, password, fullname, company_id, 'admin');

            res.send({
                success: true,
                message: "Admin created successfully"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const searchAdmin = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await fetchData("SELECT * FROM users WHERE username=$1", username);

        res.send({
            success: true,
            message: "Found it",
            data: user
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllAdmins,
    createAdmin,
    searchAdmin
}