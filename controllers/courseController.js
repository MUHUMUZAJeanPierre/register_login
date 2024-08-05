import course  from "../models/courseModel.js";
export const createCourse = async(req,res) => {
    try {
        const course = new course(req.body);
        await course.save();
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        })
}catch (error) {
   res.status(500).json({message: error.message})
}
} 

export const getCourse = async(req, res)=>{
    try {
        const getCourse = await course.find();
        res.status(201).json({success: true, message: "successfully retrieved course", data: getCourse})
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}
