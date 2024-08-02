const { fetchData } = require("../utils/postgres")

const getAllWorkers = async (req, res) => {
    try {
        let workers = await fetchData("SELECT * FROM users WHERE role='worker'");

        res.send({
            success: true,
            message: "All managers",
            data: workers
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const createWorker = async (req, res) => {
    try {
        const { username, password, fullname, company_id } = req.body;

        const users = await fetchData("SELECT * FROM users");

        const check = users.find(el => el.username === username);

        if(check){
            res.status(409).send({
                success: false,
                message: "This username has been taken"
            })
        }else{
            await fetchData("INSERT INTO users(username, password, fullname, company_id, role) VALUES($1, $2, $3, $4, $5)", username, password, fullname, company_id, 'worker');

            res.send({
                success: true,
                message: "Worker created successfully"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const editWorker = async (req, res) => {
    try {
        const { username, password, fullname, company_id } = req.body;

        const { id } = req.params;
        
        const users = await fetchData("SELECT * FROM users WHERE role='worker'");

        const check = users.find(el => el.id == id);

        if(check){
            await fetchData("UPDATE users SET username=$1, password=$2, fullname=$3, company_id=$4, role=$5 WHERE id=$6", username || check.username, password || check.password, fullname || check.fullname, company_id || check.company_id, check.role, id);

            res.send({
                success: true,
                message: "Worker edited successfully"
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

const deleteWorker = async (req, res) => {
    try {
        const { id } = req.params;
        
        const users = await fetchData("SELECT * FROM users WHERE role='worker'");

        const check = users.find(el => el.id == id);

        if(check){
            await fetchData("DELETE FROM users WHERE id=$1", id);

            res.send({
                success: true,
                message: "Worker deleted successfully"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const searchWorker = async (req, res) => {
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
    getAllWorkers,
    createWorker,
    editWorker,
    deleteWorker,
    searchWorker
}