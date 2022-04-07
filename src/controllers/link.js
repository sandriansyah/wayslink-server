const {link} = require('../../models')

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
        const {idGroup} = req.body
        const dataAdd = await link.findAll({
            where:{
                idGroup: idGroup
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

exports.editLink = async (req,res)=>{
    try {
        const {id} = req.params
        const data = req.body 
        const editLink = await link.update(data,{
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