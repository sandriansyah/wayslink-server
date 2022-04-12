const req = require('express/lib/request');
const res = require('express/lib/response');


const {groupLink,link} = require('../../models')

exports.creteGroupLink = async(req,res)=>{
    try {
        const data = req.body

        const createGroup= await groupLink.create({
            ...data,
            image: req.file.filename,
            idUser: req.user.id,
            viewCount: 0,
        })

        const dataGroup = await groupLink.findOne({
            where:{
                id: createGroup.id
            },attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            dataGroup
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getGroups = async (req,res)=>{
    try {
        
        let getData = await groupLink.findAll({
            where:{
                idUser: req.user.id
            },attributes:{
                exclude:["createdAt","updatedAt"]
            },include:{
                model:link,
                as:"link",
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            }
        })

        getData = JSON.parse(JSON.stringify(getData))

        const path = "http://localhost:5000/uploads/"

        getData = getData.map((data)=>{
            return{
                ...data,
                image: path + data.image,
            }
        })


        res.send({
            status:"success",
            getData
        })

    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.getGroup = async (req,res)=>{
    try {

        const {id} = req.params

        let getData = await groupLink.findOne({
            where:{
                uniqueLink: id
            },attributes:{
                exclude:["createdAt","updatedAt"]
            },include:{
                model:link,
                as:"link",
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            }
        })

        getData = JSON.parse(JSON.stringify(getData))
        const path = "http://localhost:5000/uploads/"
        getData = {
            ...getData,
            image: path + getData.image
        }

        res.send({
            status:"success",
            getData
        })

    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.editGroup = async (req,res)=>{
    const {id} = req.params
    const dataEdit = req.body
    try {

        const getData = await groupLink.update({
            ...dataEdit,
            image : req.file.filename
        },{
            where:{
                id: id
            }
        })

        const finding = await groupLink.findOne({
            where:{
                id: id
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }

        })

        res.send({
            status:"success",
            finding
        })

    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.deleteGroup = async (req,res)=>{
    try {

        const {id} = req.params

        const getData = await groupLink.destroy({
            where:{
                id: id
            }
        })

        res.send({
            status:"success",
            getData
        })

    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.viewAcount =async (req,res)=>{
    try {
        const {id} = req.params
        const findData = await groupLink.findOne({
            where:{
                id: id
            }
        })
        console.log(findData.viewCount);
        const addView = {
            viewCount: findData.viewCount + 1}
        const data = await groupLink.update(addView,{
            where:{
                id:id
            }
        })

        res.send({
            status:"success",
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}