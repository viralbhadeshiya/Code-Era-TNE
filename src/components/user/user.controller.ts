import { Request, Response, NextFunction } from 'express';
import { createNewUser } from './user.DAL';
import { IUser } from './user.model';

class UsersController {
    /**
     * Sign up new user and send mail to them
     * @param {Request} req => Express Request
     * @param {Response} res => Express Repponse
     * @param {NextFunction} next => Express next function
     */
    async signUpUser(req: Request, res: Response, next: NextFunction) {
        try {
            // Getting data from body and creating new user
            const { firstName, lastName, emailId, planType, mobileNo, password } = req.body;
            const userObject: Partial<IUser> = {
                firstName,
                lastName,
                emailId,
                planType,
                mobileNo,
                password,
            };
            const user = await createNewUser(userObject);

            // sending mail to New user email
            // sendMail(user.emailId, req.log);

            return res.status(200).json({ _id: user._id });
        } catch (err) {
            return next(err);
        }
    }
}

export default UsersController;
