const { Router } = require("express");
const { login } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const verifyRole = require("../middlewares/verifyRole");
const { getAllCompanies, createCompany, editCompany, deleteCompany, searchCompany } = require("../controllers/companyController");
const validation = require("../middlewares/validation/validation");
const companyCreateSchema = require("../middlewares/validation/companies/create");
const companyEditSchema = require("../middlewares/validation/companies/edit");
const companySearchSchema = require("../middlewares/validation/companies/search");
const { getAdminProfile, editAdminProfile, deleteAdminProfile } = require("../controllers/adminProfileController");
const editAdminProfileSchema = require("../middlewares/validation/adminProfile/edit");
const { getAllAdmins, createAdmin, searchAdmin } = require("../controllers/adminController");
const createAdminSchema = require("../middlewares/validation/admins/create");
const { getAllManagers, createManager, editManager, deleteManager, searchManager } = require("../controllers/managerController");
const createManagerSchema = require("../middlewares/validation/managers/create");
const editManagerSchema = require("../middlewares/validation/managers/edit");
const { getManagerProfile, editManagerProfile, deleteManagerProfile } = require("../controllers/managerProfileController");
const { getAllWorkers, createWorker, editWorker, deleteWorker } = require("../controllers/workerController");
const createWorkerSchema = require("../middlewares/validation/workers/create");
const editWorkerSchema = require("../middlewares/validation/workers/edit");
const { getWorkerProfile, editWorkerProfile, deleteWorkerProfile } = require("../controllers/workerProfileController");
const { getAllTasks, createTask, updateTask, deleteTask, getTaskById, getByCompanyId } = require("../controllers/taskController");
const taskCreateSchema = require("../middlewares/validation/tasks/create");
const taskEditSchema = require("../middlewares/validation/tasks/edit");
const { getUserTasks, editUserTask, createUserTask, editTime, deleteUserTask, getUserTaskById, getUserTaskByTask, getUserTaskByUser, getUserTaskForUser, markAsDone } = require("../controllers/user_taskController");
const createUserTaskSchema = require("../middlewares/validation/userTasks/create");
const editTimeUserTaskSchema = require("../middlewares/validation/userTasks/editTime");
const editUserTaskSchema = require("../middlewares/validation/userTasks/edit");

const router = Router();

router.post("/login", login);

router.get("/companies", verifyToken(), verifyRole("admin"), getAllCompanies);
router.post("/companies/create", verifyToken(), verifyRole("admin"), validation(companyCreateSchema), createCompany);
router.patch("/companies/edit/:id", verifyToken(), verifyRole("admin"), validation(companyEditSchema), editCompany);
router.delete("/companies/delete/:id", verifyToken(), verifyRole("admin"), deleteCompany);
router.post("/companies/search", verifyToken(), verifyRole("admin"), validation(companySearchSchema), searchCompany);

router.get("/admins", verifyToken(), verifyRole("admin"), getAllAdmins);
router.post("/admins/create", verifyToken(), verifyRole("admin"), validation(createAdminSchema), createAdmin);
router.post("/admins/search", verifyToken(), verifyRole("admin"), searchAdmin);

router.get("/admins/profile", verifyToken(), verifyRole("admin"), getAdminProfile);
router.patch("/admins/profile/edit", verifyToken(), verifyRole("admin"), validation(editAdminProfileSchema), editAdminProfile);
router.delete("/admins/profile/delete", verifyToken(), verifyRole("admin"), deleteAdminProfile);

router.get("/managers", verifyToken(), verifyRole("manager", "admin"), getAllManagers);
router.post("/managers/create", verifyToken(), verifyRole("admin"), validation(createManagerSchema), createManager);
router.patch("/managers/edit/:id", verifyToken(), verifyRole("admin"), validation(editManagerSchema), editManager);
router.delete("/managers/delete/:id", verifyToken(), verifyRole("admin"), deleteManager);
router.post("/managers/search", verifyToken(), verifyRole("manager", "admin"), searchManager);

router.get("/managers/profile", verifyToken(), verifyRole("manager"), getManagerProfile);
router.patch("/managers/profile/edit", verifyToken(), verifyRole("manager"), validation(editManagerSchema), editManagerProfile);
router.delete("/managers/profile/delete", verifyToken(), verifyRole("manager"), deleteManagerProfile);

router.get("/workers", verifyToken(), verifyRole("manager"), getAllWorkers);
router.post("/workers/create", verifyToken(), verifyRole("manager"), validation(createWorkerSchema), createWorker);
router.patch("/workers/edit/:id", verifyToken(), verifyRole("manager"), validation(editWorkerSchema), editWorker);
router.delete("/workers/delete/:id", verifyToken(), verifyRole("manager"), deleteWorker);

router.get("/workers/profile", verifyToken(), verifyRole("worker"), getWorkerProfile);
router.patch("/workers/profile/edit", verifyToken(), verifyRole("worker"), validation(editWorkerSchema), editWorkerProfile);
router.delete("/workers/profile/delete", verifyToken(), verifyRole("worker"), deleteWorkerProfile);

router.get("/tasks", getAllTasks);
router.post("/tasks/create", verifyToken(), verifyRole("manager"), validation(taskCreateSchema), createTask);
router.patch("/tasks/edit/:id", verifyToken(), verifyRole("manager"), validation(taskEditSchema), updateTask);
router.delete("/tasks/delete/:id", verifyToken(), verifyRole("manager"), deleteTask);
router.post("/tasks/search/by/id", getTaskById);
router.post("/tasks/search/by/company", getByCompanyId);

router.get("/users/tasks", getUserTasks);
router.post("/users/task/create", verifyToken(), verifyRole("manager"), validation(createUserTaskSchema), createUserTask);
router.patch("/users/task/edit/:id", verifyToken(), verifyRole("manager"), validation(editUserTaskSchema), editUserTask)
router.patch("/users/task/editTime/:id", verifyToken(), verifyRole("manager"), validation(editTimeUserTaskSchema), editTime);
router.delete("/users/task/delete/:id", verifyToken(), verifyRole("manager"), deleteUserTask);
router.post("/users/task/search/byid", getUserTaskById);
router.post("/users/task/search/bytask", getUserTaskByTask);
router.post("/users/task/search/byuser", getUserTaskByUser);

router.get("/users/task/worker", verifyToken(), verifyRole("worker"), getUserTaskForUser);
router.post("/users/task/worker/done/:id", verifyToken(), verifyRole("worker"), markAsDone);

module.exports = router