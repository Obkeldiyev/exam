const { verify } = require("../utils/jwt");
const { fetchData } = require("../utils/postgres");

const getUserTasks = async (req, res) => {
    try {
        const userTasks = await fetchData(
            "SELECT ut.id AS user_task_id, u.id AS user_id, u.username, t.id AS task_id, t.title, ut.start_at, ut.ends_at, ut.status FROM user_tasks ut JOIN users u ON ut.user_id = u.id JOIN tasks t ON ut.task_id = t.id"
        );

        res.send({
            success: true,
            message: "All tasks for users",
            data: userTasks
        });
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const createUserTask = async (req, res) => {
    try {
        const { user_id, task_id, start_at, days } = req.body;

        const startAt = start_at ? new Date(start_at) : new Date();
        const endsAt = new Date(startAt);
        endsAt.setDate(startAt.getDate() + days);

        let status;
        const now = new Date();

        if (now > endsAt) {
            status = 'expired';
        } else {
            status = 'in process';
        }

        const formattedStartAt = startAt.toISOString();
        const formattedEndsAt = endsAt.toISOString();

        const [check] = await fetchData("SELECT * FROM users WHERE id=$1", user_id);
        const [taskCheck] = await fetchData("SELECT * FROM tasks WHERE id=$1", task_id);

        if (check && taskCheck) {
            await fetchData(
                "INSERT INTO user_tasks (user_id, task_id, start_at, ends_at, status) VALUES ($1, $2, $3, $4, $5)",
                user_id, task_id, formattedStartAt, formattedEndsAt, status
            );

            res.send({
                success: true,
                message: "Created successfully"
            });
        } else {
            res.send({
                success: false,
                message: "Data is not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};


const editUserTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, task_id } = req.body;

        const [user_task] = await fetchData("SELECT * FROM user_tasks WHERE id=$1", id);

        if (user_task) {
            await fetchData(
                "UPDATE user_tasks SET user_id=$1, task_id=$2 WHERE id=$3",
                user_id || user_task.user_id, task_id || user_task.task_id, id
            );

            res.send({
                success: true,
                message: "User task edited successfully"
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const editTime = async (req, res) => {
    try {
        const { id } = req.params;
        const { days } = req.body;

        const [user_task] = await fetchData("SELECT * FROM user_tasks WHERE id=$1", id);

        if (user_task) {
            const startAt = user_task.start_at ? new Date(user_task.start_at) : new Date();
            const endsAt = new Date(startAt);
            endsAt.setDate(startAt.getDate() + days);

            const formattedEndsAt = endsAt.toISOString();

            await fetchData("UPDATE user_tasks SET ends_at=$1 WHERE id=$2", formattedEndsAt, id);

            res.send({
                success: true,
                message: "Date updated successfully"
            });
        } else {
            res.status(404).send({
                success: false,
                message: "This user task does not exist"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const deleteUserTask = async (req, res) => {
    try {
        const { id } = req.params;

        const [user_task] = await fetchData("SELECT * FROM user_tasks WHERE id=$1", id);

        if (user_task) {
            await fetchData("DELETE FROM user_tasks WHERE id=$1", id);

            res.send({
                success: true,
                message: "Deleted successfully"
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const getUserTaskByTask = async (req, res) => {
    try {
        const { task_id } = req.body;

        const user_tasks = await fetchData("SELECT * FROM user_tasks WHERE task_id=$1", task_id);

        if (user_tasks.length > 0) {
            res.send({
                success: true,
                message: "Found it",
                data: user_tasks
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const getUserTaskByUser = async (req, res) => {
    try {
        const { user_id } = req.body;

        const user_tasks = await fetchData("SELECT * FROM user_tasks WHERE user_id=$1", user_id);

        if (user_tasks.length > 0) {
            res.send({
                success: true,
                message: "Found it",
                data: user_tasks
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const getUserTaskById = async (req, res) => {
    try {
        const { id } = req.body;

        const user_tasks = await fetchData("SELECT * FROM user_tasks WHERE id=$1", id);

        if (user_tasks.length > 0) {
            res.send({
                success: true,
                message: "Found it",
                data: user_tasks
            });
        } else {
            res.status(404).send({
                success: false,
                message: "Not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const getUserTaskForUser = async (req, res) => {
    try {
        const { token } = req.headers;

        const { id } = verify(token);

        const data = await fetchData(
            "SELECT ut.id AS user_task_id, ut.start_at, ut.ends_at, ut.status, t.title, t.description FROM user_tasks ut JOIN tasks t ON ut.task_id = t.id WHERE ut.user_id = $1",
            id
        );

        res.send({
            success: true,
            message: "Your tasks",
            data: data
        });
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

const markAsDone = async (req, res) => {
    try {
        const { id } = req.params;

        const [user_task] = await fetchData("SELECT * FROM user_tasks WHERE id=$1", id);

        if (user_task) {
            const now = new Date();

            if (user_task.status === "in process" && new Date(user_task.ends_at) > now) {
                await fetchData("UPDATE user_tasks SET status=$1 WHERE id=$2", "DONE", id);

                res.send({
                    success: true,
                    message: "You did it"
                });
            } else if (user_task.status === "expired" && new Date(user_task.ends_at) < now) {
                res.send({
                    success: false,
                    message: "The task was expired"
                });
            } else {
                res.status(403).send({
                    success: false,
                    message: "Wrong status"
                });
            }
        } else {
            res.status(404).send({
                success: false,
                message: "The user task not found"
            });
        }
    } catch (error) {
        res.status(403).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getUserTasks,
    createUserTask,
    editUserTask,
    editTime,
    deleteUserTask,
    getUserTaskById,
    getUserTaskByTask,
    getUserTaskByUser,
    getUserTaskForUser,
    markAsDone
};
