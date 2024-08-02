const { fetchData } = require("../utils/postgres")

const getAllCompanies = async(req, res) => {
    try {
        let companies = await fetchData("SELECT * FROM companies");

        res.send({
            success: true,
            message: "All companies",
            data: companies
        })
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const createCompany = async (req, res) => {
    try {
        const { name } = req.body;

        const companies = await fetchData("SELECT * FROM companies");

        const check = companies.find(el => el.name === name);

        if(check){
            res.status(409).send({
                success: false,
                message: "Name has been taken"
            })
        }else{
            await fetchData("INSERT INTO companies(name) VALUES($1)", name);

            res.send({
                success: true,
                message: "Created successfully"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const editCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const companies = await fetchData("SELECT * FROM companies");

        const check = companies.find(el => el.id == id);

        if(check){
            await fetchData("UPDATE companies SET name=$1 WHERE id=$2", name, id);

            res.send({
                success: true,
                message: "Edited successfully"
            })
        }else{
            res.status(404).send({
                success: false,
                message: "This company does not exists"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const companies = await fetchData("SELECT * FROM companies");

        const check = companies.find(el => el.id == id);

        if(check){
            await fetchData("DELETE FROM companies WHERE id=$1", id);

            res.send({
                success: true,
                message: "Deleted successfully"
            })
        }else{
            res.status(404).send({
                success: false,
                message: "This company does not exists"
            })
        }
    } catch (error) {
        res.status(error.status || 403).send({
            success: false,
            message: error.message
        })
    }
}

const searchCompany = async (req, res) => {
    try {
        const { name } = req.body;

        const companies = await fetchData("SELECT * FROM companies");

        const company = companies.find(el => el.name === name);

        if(company){
            res.send({
                success: true,
                message: "Found",
                data: company
            })
        }else{
            res.send({
                success: false,
                message: "This named company does not exists"
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
    getAllCompanies,
    createCompany,
    editCompany,
    deleteCompany,
    searchCompany
}