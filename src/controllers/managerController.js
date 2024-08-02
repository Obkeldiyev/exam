const { fetchData } = require("../utils/postgres")

const getAllManagers = async (req, res) => {
    try {
        let managers = await fetchData("SELECT * FROM users WHERE role='manager'");

        res.send({
            success: true,
            message: "All managers",
            data: managers
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const createManager = async (req, res) => {
    try {
        const { username, password, fullname, company_id } = req.body;

        const users = await fetchData("SELECT * FROM users");

        const check = users.find(el => el.username === username);
        const thecondCheck = users.find(el => el.company_id == company_id)

        if(check){
            res.status(409).send({
                success: false,
                message: "This username has been taken"
            })
        }else if(thecondCheck){
            res.status(409).send({
                succes: false,
                message: "This company has a manager"
            })
        }else{
            await fetchData("INSERT INTO users(username, password, fullname, company_id, role) VALUES($1, $2, $3, $4, $5)", username, password, fullname, company_id, 'manager');

            res.send({
                success: true,
                message: "Manager created successfully"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const editManager = async (req, res) => {
    try {
        const { username, password, fullname, company_id } = req.body;

        const { id } = req.params;
        
        const users = await fetchData("SELECT * FROM users WHERE role='manager'");

        const check = users.find(el => el.id == id);

        if(check){
            await fetchData("UPDATE users SET username=$1, password=$2, fullname=$3, company_id=$4, role=$5 WHERE id=$6", username || check.username, password || check.password, fullname || check.fullname, company_id || check.company_id, check.role, id);

            res.send({
                success: true,
                message: "Manager edited successfully"
            });
        }else{
            res.status(404).send({
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

const deleteManager = async (req, res) => {
    try {
        const { id } = req.params;
        
        const users = await fetchData("SELECT * FROM users WHERE role='manager'");

        const check = users.find(el => el.id == id);

        if(check){
            await fetchData("DELETE FROM users WHERE id=$1", id);

            res.send({
                success: true,
                message: "Manager deleted successfully"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const searchManager = async (req, res) => {
    try {
        const { username } = req.body;

        const manager = await fetchData("SELECT * FROM users WHERE username=$1", username);

        res.send({
            succes: true,
            message: "Found it",
            data: manager
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    getAllManagers,
    createManager,
    editManager,
    deleteManager,
    searchManager
}