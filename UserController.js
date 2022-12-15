import {StatusCodes} from 'http-status-codes'
import { userSchema } from '../../validation/SchemaValidation.js';
import userModel from "../Models/UserSchema.js";

let sortB;
 export async function  saveUser( req, res){
   
     const  addimage=req.file.filename
   // console.log("addimage----------> "+addimage);
       try {
               req.body['dob']= new Date(req.body.dob);
                  const userEmail= await userModel.findOne({email:req.body.email})
                 if(userEmail){
                    res.status(StatusCodes.BAD_REQUEST).json({message:"Email already exist"}) 
                 }
                else{
                  let arr = [];
                      arr= req.body['hobbies']
                       let x = arr.split(',')
                       console.log("yyyyyyyyyyyyyyy-----------"+x)
                       req.body['hobbies'] = x;



                    const user= new  userModel({
                     name:req.body.name,
                     dob:req.body.dob,
                     city:req.body.city,
                     gender:req.body.gender,
                     email:req.body.email,
                     desc:req.body.desc,
                     mobile:req.body.mobile,
                     userimage:addimage,
                     hobbies:req.body.hobbies
                     })

                    console.log(user)
                    const SavedUser= await user.save();
                    res.status(StatusCodes.OK).json(SavedUser)
                 }
          
        }
      
    catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
      }
   }


 export async function getAllUser(req, res){
    try {
       const allUser= await userModel.find();
       res.status(StatusCodes.OK).json(allUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
    }
}
export async function getUserById(req, res){
  try {
     const userById= await userModel.findById(req.params.id);
     res.status(StatusCodes.OK).json(userById)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
  }
}

export async function deleteUser(req, res){
 try {
    await userModel.findByIdAndDelete(req.params.id)
    res.status(StatusCodes.NO_CONTENT).json({})
 } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}

export async function updateUser(req, res){
 try {
    const id= req.params.id
      const data=req.body;
      req.body['userimage']= req.file.filename
       console.log(data)
     const updateduser= await userModel.findByIdAndUpdate(id, data);
   
      console.log(updateduser)
     res.status(StatusCodes.OK).json(updateduser)

 } catch (error) {
    console.log(error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
 }
}


export async function searchAPI(req, res){
   var searchBar;
  var total;
   
   try {
     
      var username=req.query.name
      var usercity=req.query.city
      var userhobbies= req.query.hobbies
      var usergender= req.query.gender
      var sortBy= req.query.sortBy

            
     const page= req.query.page ;
     const limit= req.query.limit
      const skip= (page-1)*limit

      if(username==undefined){
         username=""
      }
      if(usercity==undefined){
         usercity=""
      }
      if(userhobbies==undefined){
         userhobbies=""
      }
      if(usergender==undefined){
         usergender=''
      }
      if(sortBy==undefined){
         sortBy="name"
      }

      const sort={}
      sort[sortBy]=1;
      
      // console.log("%%%%"+sort)
      console.log("page---"+page)
      console.log("limit----"+limit)
      console.log("skip----"+skip)
      console.log("city----"+usercity)
      console.log("name----"+username)
      console.log("hobbies----"+userhobbies)
      console.log("gender----"+usergender)
      console.log("sort by----"+sortBy)
         searchBar= await userModel.find({$or:[{city:{$regex:usercity},name:{$regex:username} ,hobbies:{$regex:userhobbies} ,gender:{$regex:usergender}}]}).sort(sort).skip(skip).limit(limit) ;
      
         total= await userModel.find().countDocuments()

      res.status(StatusCodes.OK).json({data:searchBar, totalCount:total})
     
      
        
      
     
      
   } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
   }
}


// export async function selectAPI(req, res){
//    try {
//       const field= req.params.field;
//       const key=req.params.key
//       // console.log(field)
//       console.log(key)
//       const selectBar= await userModel.find({
        
//       $or:[{name:{$regex:key}},{city:{$regex:key}},{hobbies:{$regex:key}},]
//    });
//       res.status(StatusCodes.OK).json(selectBar)
//    } catch (error) {
//        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"somthing went wrong"})
//    }
// }





