const {user} = require('../../models')

exports.getUser = async (req,res)=>{
    try {
        const findUser = await user.findOne({
            where:{
                id:req.user.id
            },attributes:{
                exclude:["password","createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            findUser
        })
    } catch (error) {
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.editUser = async (req,res)=>{
    try {

        const data = req.body

        const edit = await user.update(data,{
            where:{
                id:req.user.id
            },attributes:{
                exclude:["password","createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            edit
        })
    } catch (error) {
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.deleteUser = async (req,res)=>{
    try {

        const data = await user.destroy({
            where:{
                id:req.user.id
            },attributes:{
                exclude:["password","createdAt","updatedAt"]
            }
        })

        res.send({
            status:"success",
            data
        })
    } catch (error) {
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}

