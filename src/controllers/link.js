const {link} = require('../../models')
const { patch } = require('../routes')

exports.addLink = async (req,res)=>{
    try {
        const data = req.body 
        const createLink = await link.create({
            ...data,
            imageLink: req.file.filename,
        })

        const dataAdd = await link.findOne({
            where:{
                id: createLink.id
            },attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            dataAdd
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"faild",
            message:"server error"
        })
    }
}

exports.getLinks = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id);
        let dataAdd = await link.findAll({
            where:{
                idGroup: id
            },attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        // dataAdd = JSON.parse(JSON.stringify(dataAdd))

        // const path = "http://localhost:5000/uploads/"
        // dataAdd = dataAdd.map((item)=>{
        //     return{
        //         ...item,
        //         imageLink: path + item.imageLink
        //     }
        // })

        res.send({
            status:"success",
            dataAdd
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"faild",
            message:"server error"
        })
    }
}

exports.editLink = async (req,res)=>{
    try {
        const {id} = req.params
        const data = req.body 
        console.log(req.file);
        const editLink = await link.update({
            ...data,
            imageLink: req.file.filename,
        },{
            where: {
                id:id
            }
        })

        res.send({
            status:"success",
            editLink
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"faild",
            message:"server error"
        })
    }
}

exports.deleteLink = async (req,res)=>{
    try {
        const {id} = req.params 
        const delLink = await link.destroy({
            where: {
                id:id
            }
        })

        res.send({
            status:"success",
            delLink
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"faild",
            message:"server error"
        })
    }
}