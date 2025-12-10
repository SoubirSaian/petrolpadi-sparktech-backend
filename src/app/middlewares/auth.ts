import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utilities/catchasync';
import ApiError from '../../error/ApiError';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
// import { TUserRole } from '../modules/user/user.interface';
import  UserModel  from '../module/User/User.model';
// import { USER_ROLE } from '../modules/user/user.constant';
// import NormalUser from '../modules/normalUser/normalUser.model';
// import SuperAdmin from '../modules/superAdmin/superAdmin.model';
import { verifyToken } from '../../helper/jwtHelper';
import { ENUM_USER_ROLE } from '../../utilities/enum';

// Helper function to fetch profile data based on role
// const getProfileByRole = async (role: string, userId: string) => {
//   if (role === USER_ROLE.user) {
//     return NormalUser.findOne({ user: userId }).select('_id');
//   } else if (role === USER_ROLE.superAdmin) {
//     return SuperAdmin.findOne({ user: userId }).select('_id');
//   }
//   return null;
// };

// const auth = (...requiredRoles: TUserRole[]) => {

//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req?.headers?.authorization;
//     if (!token) {
//       throw new ApiError(401, 'You are not authorized');
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(
//         token,
//         config.jwt.secret as string,
//       ) as JwtPayload;
//     } catch (err) {
//       throw new ApiError(401, 'Token is expired');
//     }

//     const { userId, role } = decoded;

//     if (!decoded) {
//       throw new ApiError(401, 'Token is not valid');
//     }

//     // Fetch user and profile data in parallel using Promise.all
//     const userPromise = UserModel.findById(userId).select('isVerified status isDeleted');
//     const profilePromise = getProfileByRole(role, userId);

//     // Wait for both user and profile data
//     const [user, profileData] = await Promise.all([
//       userPromise,
//       profilePromise,
//     ]);

//     if (!user) {
//       throw new ApiError(404, 'This user does not exist');
//     }

//     if (user.isDeleted || user.status === 'blocked' || !user.isVerified) {
//       throw new ApiError(403,'User is either deleted, blocked, or not verified');
//     }

//     if (!profileData) {
//       throw new ApiError( 404,'Unauthorized, user profile not found');
//     }

//     decoded.profileId = profileData._id;
//     req.user = decoded as JwtPayload;

//     // Check if the user has required roles
//     if (requiredRoles && !requiredRoles.includes(role)) {
//       throw new ApiError(401, 'You are not authorized');
//     }

//     next();
//   });
// };

// export default auth;

const auth =
  (roles: string[], isAccessible = true) => async (req: Request, res: Response, next: NextFunction) => {

    const tokenWithBearer = req.headers.authorization;
    
    if (!tokenWithBearer && !isAccessible) return next();
    
    if (!tokenWithBearer){

      throw new ApiError(401,"You are not authorized for this role");
    }
    
    try {

      if (tokenWithBearer.startsWith("Bearer")) {

        const token = tokenWithBearer.split(" ")[1];

        const verifyUser = verifyToken(token, config.jwt.secret as Secret);

        req.user = verifyUser;
        // console.log(verifyUser);

        const isExist = await UserModel.findById(verifyUser?.userId);

        if (!Object.values(ENUM_USER_ROLE).includes(verifyUser.role) || !isExist) {

          throw new ApiError(401, "You are not authorized");
        }

        // console.log(roles.length);

        if (roles.length && !roles.includes(verifyUser.role)){

          throw new ApiError(403,"Access Forbidden: You do not have permission to perform this action");
        }

        next();
      }
    } catch (error) {
      next(error);
    }
  };

  export default auth;
