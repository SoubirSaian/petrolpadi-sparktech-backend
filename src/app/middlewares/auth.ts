import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utilities/catchasync';
import ApiError from '../../error/ApiError';
import jwt,{ JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';
// import { TUserRole } from '../modules/user/user.interface';
import  UserModel  from '../module/User/User.model';
// import { USER_ROLE } from '../modules/user/user.constant';
// import SuperAdmin from '../modules/superAdmin/superAdmin.model';
import { verifyToken } from '../../helper/jwtHelper';
import { ENUM_USER_ROLE } from '../../utilities/enum';
import { AuthRequest } from '../../interface/authRequest';
import { IJwtPayload } from '../../interface/jwt.interface';

export const auth =
  (roles: string[], isAccessible = true) => async (req: Request, res: Response, next: NextFunction) => {

    const tokenWithBearer = req.headers.authorization;
    
    if (!tokenWithBearer && !isAccessible) return next();
    
    if (!tokenWithBearer){

      throw new ApiError(401,"You are not authorized for this role");
    }
    
    try {

      if (tokenWithBearer.startsWith("Bearer")) {

        const token = tokenWithBearer.split(" ")[1];
        // let decoded;
 
            // try {
            //     decoded = jwt.verify(
            //         token,
            //         config.jwt.secret as string
            //     ) as JwtPayload;
            // } catch (err) {
            //     throw new ApiError(401, 'Token is expired');
            // }

        const decoded = verifyToken(token, config.jwt.secret as Secret);
        if(!decoded){
          throw new ApiError(404,"No user found after jwt verification.");
        }


        (req as AuthRequest).user = decoded as IJwtPayload;
        // (req as AuthRequest).user = {
        //   userId: decoded.userId,
        //   profileId: decoded.profileId,
        //   role: decoded.role,
        //   email: decoded.email,
        // };
        // console.log(decoded);

        // const isExist = await UserModel.findById(decoded?.userId);

        // if (!Object.values(ENUM_USER_ROLE).includes(decoded.role) ) {

        //   throw new ApiError(401, "You are not authorized");
        // }

        // console.log(roles.length);

        if (roles.length && !roles.includes(decoded.role)){

          throw new ApiError(403,"Access Forbidden: You do not have permission to perform this action");
        }

        next();
      }
    } catch (error) {
      next(error);
    }
  };


export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {

    const tokenWithBearer = req.headers.authorization;
    
    // if (!tokenWithBearer && !isAccessible) return next();
    
    if (!tokenWithBearer){

      throw new ApiError(401,"You are not authorized to perform this action.");
    }
    
    try {

      if (tokenWithBearer.startsWith("Bearer")) {

        const token = tokenWithBearer.split(" ")[1];

        const decoded = verifyToken(token, config.jwt.secret as Secret);
        if(!decoded){
          throw new ApiError(404,"No user found after jwt verification.");
        }


        (req as AuthRequest).user = decoded as IJwtPayload;

        next();
      }
    } catch (error) {
      next(error);
    }
  };

  // export default auth;

/* eslint-disable no-unused-vars */
// import { NextFunction, Request, Response } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import catchAsync from '../../utilities/catchasync';
// import ApiError from '../../error/ApiError';
// import config from '../../config';
// import UserModel from '../module/User/User.model';

// // make costume interface

// const auth = (...requiredRoles: string[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     let token = req?.headers?.authorization;

//     if (!token) {
//       throw new ApiError(401, 'You are not authorized');
//     }

//     if (token.startsWith('Bearer ')) {
//       token = token.slice(7, token.length);
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
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { id, role, iat } = decoded;

//     if (!decoded) {
//       throw new ApiError(401, 'Token is expired');
//     }
//     // get the user if that here ---------
//     const user = await UserModel.findById(id).select(
//       'isDeleted isBlocked isVerified passwordChangedAt',
//     );
//     // if (!user) {
//     //   throw new ApiError(httpStatus.NOT_FOUND, 'You are not authorized');
//     // }
//     // if (user.isDeleted) {
//     //   throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted');
//     // }
//     // if (user.isBlocked) {
//     //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
//     // }
//     // if (!user?.isVerified) {
//     //   throw new AppError(httpStatus.BAD_REQUEST, 'You are not verified user');
//     // }

//     // if (user?.passwordChangedAt && iat) {
//     //   const passwordChangeTime =
//     //     new Date(user?.passwordChangedAt).getTime() / 1000;
//     //   if (passwordChangeTime > iat) {
//     //     throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized 2');
//     //   }
//     // }
//     // if (requiredRoles && !requiredRoles.includes(role)) {
//     //   throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authorized 3');
//     // }
//     // add those properties in req
//     req.user = decoded as JwtPayload;
//     next();
//   });
// };

// export default auth;
 
