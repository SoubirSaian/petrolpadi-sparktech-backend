import ApiError from "../../../error/ApiError";
import { TLoginUser } from "../auth/auth.interface";
import AdminModel from "./Admin.model";
import { IAdmin } from "./Dashboard.interface";
import config from "../../../config";
import { JwtPayload,Secret, SignOptions } from "jsonwebtoken";
import { createToken } from "../../../helper/jwtHelper";



const registerAdminService = async (payload: IAdmin) => {
    const {name, email,password,phone} = payload;

    const admin = await AdminModel.create({
        name: name,
        email: email.toLowerCase(),
        password: password,
        phone: phone
    });

    if(!admin){
        throw new ApiError(500,"Failed to create new Admin");
    }

    return {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        role: admin.role
    }
}

const loginAdminService = async (payload: TLoginUser) => {

    const {email,password} = payload;

    // Service logic goes here
    const admin = await AdminModel.findOne({ email: email });

    if (!admin) {
        throw new ApiError(404, 'This admin does not exist');
    }
    
    if (admin.isBlocked) {
        throw new ApiError(403, 'This admin is blocked');
    }
    // if (!user.isVerified) {
    //     throw new ApiError(
    //         403,
    //         'You are not verified user . Please verify your email'
    //     );
    // }

    // checking if the password is correct ----
    // if (user.password && !(await UserModel.isPaswordMatched(password, user.password))) {
    //     throw new ApiError(403, 'Password do not match');
    // }

    // if(!comparePassword(password,user.password)){
    //     throw new ApiError(403,'Password do not match');
    // }

    if(password !== admin.password){
        throw new ApiError(403,'Password do not match');
    }


    //generate token
    const tokenPayload = {
        userId: admin?._id as string,
        profileId: admin?.profile as string,
        role: admin?.role,
        email: admin?.email
    };

    const accessToken: string =  createToken(
        tokenPayload,
        config.jwt.secret as Secret,
        config.jwt.expires_in as SignOptions["expiresIn"]
    );


    const newUser : object = {
        name: admin?.name,
        email: admin?.email,
        phone: admin?.phone,
        role: admin.role,
        
    }

    return {user: newUser,accessToken};
}

const DashboardService = {
    registerAdminService,
    loginAdminService
}

export default DashboardService;

