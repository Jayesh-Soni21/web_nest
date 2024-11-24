import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/datauri.js";
import { Company } from "../models/company.model.js";

export const registerComapany= async (req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            res.status(400).json({
                message:"company name is required",
                success:false
            });
        }
        let company= await Company.findOne({name});
        if(company){
            return res.status(400).json({
                message: "you cannot register same company",
                success: false,
            });
        }
        company= await Company.create({
            name:name,
            userId:req.id
        });
        return res.status(201).json({
            message: "company registered successfully",
            company,
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req,res)=>{
    try {
        const userId=req.id;//logged in user ne jo companies register kri hai vhi dekhni hai 
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success: "false"
            })
        }
        return res.status(200).json({
            message: "companies found",
            companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}
//get company by id
export const getCompanyById= async (req,res)=>{
    try {
        const companyId=req.params.id;
        const company= await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success: "false"
            })
        }
        return res.status(200).json({
            message:"company found",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany= async(req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        
        const file=req.file;//cloudinary
        //idhar cloudinary aayega
        const fileUri=getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        const logo=cloudResponse.secure_url;

        const updateData={name,description,website,location,logo};
        const company= await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});//new true krne se updated data milega
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"company data updated",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}