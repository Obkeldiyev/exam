const { verify } = require("../utils/jwt");
const { fetchData } = require("../utils/postgres")

const getAllTasks = async (req, res) => {
    try {
        const tasks = await fetchData("SELECT * FROM tasks");

        res.send({
            success: true,
            message: "All tasks",
            data: tasks
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        let { token } = req.headers;

        let { id } = verify(token)

        const [manager] = await fetchData("SELECT * FROM users WHERE id=$1", id);
        
        await fetchData("INSERT INTO tasks(title, description, company_id) VALUES($1, $2, $3)", title, description, manager.company_id);

        res.send({
            success: true,
            message: "Created successfully"
        })

    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const task = await fetchData("SELECT * FROM tasks WHERE id=$1", id);

        console.log(task);

        if(task){
            await fetchData("UPDATE tasks SET title=$1, description=$2, company_id=$3 WHERE id=$4", title || task.title, description || task.description, task.company_id, id);

            res.send({
                success: true,
                message: "Task updated successfully"
            })
        }else{
            res.status(404).send({
                success: false, 
                message: "This task is not exists"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await fetchData("SELECT * FROM tasks WHERE id=$1", id);

        console.log(task);

        if(task){
            await fetchData("DELETE FROM tasks WHERE id=$1", id);

            res.send({
                success: true,
                message: "Task deleted successfully"
            })
        }else{
            res.status(404).send({
                success: false, 
                message: "This task is not exists"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.body;

        const [task] = await fetchData("SELECT * FROM tasks WHERE id=$1", id);

        if(task){
            res.send({
                success: true,
                message: "Found it",
                data: task
            })
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

const getByCompanyId = async (req, res) => {
    try {
        const { company_id } = req.body;

        const tasks = await fetchData("SELECT * FROM tasks WHERE company_id=$1", company_id);

        if(tasks.length > 0){
            res.send({
                success: true,
                message: "Found it",
                data: tasks
            })
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

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    getByCompanyId
}