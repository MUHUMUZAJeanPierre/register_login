import userSchema from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from  'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { email, fullName, password } = req.body;
        const user = await userSchema.findOne({ email:req.body.email });

        if (user) {
            return res.status(400).json({ message: 'User already exists', status: false, });
        } else {
            const hashPassword = bcrypt.hashSync(password, 10);
            const newUser = new userSchema({
                email,
                fullName,
                password: hashPassword
            });

            await newUser.save();  // Use save method to create and save the user

            return res.status(201).json({ message: 'User registered successfully', status: true, data:newUser });
        }
    } catch (error) {
        console.error(error);  // Logging error to console
        return res.status(500).json({ message: error.message, status: false });
    }
};

export const login = async (req, res) => {
    try {
        const already = await userSchema.findOne({email:req.body.email});
        if(already){
            const match = bcrypt.compareSync(req.body.password, already.password);
            if(match){
                const token = jsonwebtoken.sign({ userId: already._id }, 'jdkfbdjkfjkdjfk');
                return res.status(200).json({ message: 'Logged in successfully', status: true, token });
            }else{
                return res.status(400).json({ message: 'Invalid credentials', status: false });
            }
        }
    } catch (error) {
        res.status(500).json({ message:"internal server error", status: false });
        console.log(error)
    }
}


