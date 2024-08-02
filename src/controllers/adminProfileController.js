const { verify } = require("../utils/jwt");
const { fetchData } = require("../utils/postgres");

const getAdminProfile = async (req, res) => {
    try {
        let { token } = req.headers;

        const { id } = verify(token);

        const users = await fetchData("SELECT * FROM users WHERE role='admin'");

        const check = users.find(el => el.id == id);

        if(check){
            res.send({
                success: true,
                message: "Your profile datas",
                data: check
            })
        }else{
            res.send({
                success: false,
                message: "Not found"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const editAdminProfile = async (req, res) => {
    try {
        const { username, password, fullname, company_id } = req.body;

        let { token } = req.headers;

        const { id } = verify(token);

        const users = await fetchData("SELECT * FROM users WHERE role='admin'");

        const check = users.find(el => el.id == id);

        if(check){
            await fetchData("UPDATE users SET username=$1, password=$2, fullname=$3, company_id=$4, role=$5 WHERE id=$6", username || check.username, password || check.password, fullname || check.fullname, company_id || check.company_id, check.role, id)
            res.send({
                success: true,
                message: "Your profile updated"
            })
        }else{
            res.send({
                success: false,
                message: "Not found"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const deleteAdminProfile = async (req, res) => {
    try {
        let { token } = req.headers;

        const { id } = verify(token);

        const users = await fetchData("SELECT * FROM users WHERE role='admin'");

        const check = users.find(el => el.id == id);

        if(check){
            await fetchData("DELETE FROM users WHERE id=$1", id)
            res.send({
                success: true,
                message: "Your profile deleted"
            })
        }else{
            res.send({
                success: false,
                message: "Not found"
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
    getAdminProfile,
    editAdminProfile,
    deleteAdminProfile
}