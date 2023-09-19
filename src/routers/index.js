const express = require("express")
const router = express.Router()
const UserModel = require("../models/user")

router.post("/", async (req, res) => {
    try {
        const userData = new UserModel({
            name: req.body.name,
            address: req.body.address,
        })
        const createUser = await userData.save()
        console.log(createUser)
        return res.json({
            success: true,
            message: "Crete User Success",
            results: createUser
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err?.message
        })
    } 
})

router.get("/", async(req, res) => {
    try {
        const usersData = await UserModel.find()
        if(!usersData){
            return res.status(404).json({
                success: true,
                message: "User data not found",
            })
        }
        return res.json({
            success: true,
            message: "Get users data success",
            results: usersData
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err?.message
        })
    }
})

router.get("/:id", async(req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const usersData = await UserModel.findOne({_id: id})
        if(!usersData){
            return res.status(404).json({
                success: true,
                message: "User data not found",
            })
        }
        return res.json({
            success: true,
            message: "Get users data success",
            results: usersData
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err?.message
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const findUser = await UserModel.findOne({_id: id})
        if(!findUser){
            return res.status(404).json({
                success: true,
                message: "User not found",
            })
        }
        await UserModel.updateOne({_id: id}, {
            name: req.body.name,
            address: req.body.address
        })
        
        return res.json({
            success: true,
            message: "Update success",
        })
        
    } catch (error) {
        return res.json({
            success: false,
            message: err?.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const {id: userId} = req.params
        const findUser = await UserModel.findOne({_id: userId})
        if(!findUser){
            return res.status(404).json({
                success: true,
                message: "User not found",
            })
        }
        const dltUser = await UserModel.deleteOne({_id: userId})
        return res.json({
            success: true,
            message: "Delete success",
            results: dltUser
        })
    } catch (error) {
        return res.json({
            success: false,
            message: err?.message
        })
    }
})



module.exports = router