import db from '../models'
import CRUDService from '../services/CRUDService'

let getHomePage = async (req, res) => {

    try {
        let data = await db.User.findAll()
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }

}

let getCRUD = async (req, res) => {
    try {
        return res.render('crud.ejs')
    } catch (e) {
        console.log(e)
    }
}

let postCRUD = (req, res) => {
    CRUDService.createNewUser(req.body)
    return res.send('post crud')
}


let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('display-CRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    let userData
    if (userId) {
        userData = await CRUDService.getUserInfoById(userId)


        return res.render('edit-CRUD.ejs', {
            user: userData
        })
    } else {
        return res.send("User not found!")
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('display-CRUD.ejs', {
        dataTable: allUsers
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    let allUsers
    if (userId) {
        allUsers = await CRUDService.deleteUserById(userId)
        return res.render('display-CRUD.ejs', {
            dataTable: allUsers
        })
    }
    else {
        return res.send('delete not found id')
    }

}

module.exports = {
    getHomePage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
}