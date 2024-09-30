const { UserModal } = require("../modal/User")
const TokenModel = require('../modal/Token')
const sendResponse = require("../utils/sendResponse")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sendVerificationEmail, sendForgotPasswordVerificationLink } = require('../utils/sendMail')
const dotenv = require('dotenv')
dotenv.config({ path: "config.env" })


const register = (req, res) => {
    if (req.body) {
        bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
            if (err) {
                sendResponse(req, res, false, "Error encrypting password: " + err, null);
                return
            }

            UserModal.findOne({ email: req.body.email })
                .then(dbUser => {
                    if (dbUser) {
                        sendResponse(req, res, false, "The Email Already exists, try another one ", err);
                        return
                    } else {
                        let user = new UserModal({
                            username: req.body.username,
                            email: req.body.email,
                            password: hashPassword,
                            phone: req.body.phone,
                            profileImage: req.body.profileImage,
                            status: req.body.status,
                            role: req.body.role,
                            isAdmin: false,
                            isVerified: false
                        });

                        user.save()
                            .then(data => {
                                const token = new TokenModel({
                                    userID: user._id,
                                    token: crypto.randomBytes(16).toString('hex')
                                });

                                token.save()
                                    .then(savedToken => {
                                        const link = `${process.env.FRONTEND_URL}/api/verify?token=${savedToken.token}&user=${user._id}`;
                                        sendVerificationEmail(req.body.email, link);
                                        sendResponse(req, res, true, "A verification email is sent to your account, please verify from Gmail", user);
                                    })
                                    .catch(tokenError => {
                                        sendResponse(req, res, false, "Error adding token: " + tokenError, null);
                                    });
                            })
                            .catch(err => {
                                sendResponse(req, res, false, "Error adding user: " + err, null);
                            });
                    }
                })
                .catch(err => {
                    sendResponse(req, res, false, "Error finding user: " + err, null);
                });
        });
    } else {
        sendResponse(req, res, false, "No data found in your request", null);
    }
};

const forgotPassword = (req, res) => {
    if (req.body) {

        UserModal.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    const token = new TokenModel({
                        userID: user._id,
                        token: crypto.randomBytes(16).toString('hex')
                    });

                    token.save()
                        .then(savedToken => {
                            const link = `${process.env.FRONTEND_URL}/api/verifyForPassword?token=${savedToken.token}&user=${user._id}`;
                            // sendVerificationEmail(req.body.email, link);
                            sendForgotPasswordVerificationLink(req.body.email, link)
                            sendResponse(req, res, true, "A verification email is sent to your account, please verify from Gmail", user);
                        })
                        .catch(tokenError => {
                            sendResponse(req, res, false, "Error adding token: " + tokenError, null);
                        });

                } else {
                    sendResponse(req, res, false, "This email account does not found, Please create your account to continue", err);
                    return
                }
            })
            .catch(err => {
                sendResponse(req, res, false, "Error finding user: " + err, null);
            });
    } else {
        sendResponse(req, res, false, "No data found in your request", null);
    }
};

const verfiyAccount = async (req, res) => {
    try {
        const { token, user } = req.query;

        // Find the user with the given user id
        const dbuser = await UserModal.findOne({ _id: user });
        if (!dbuser) {
            sendResponse(req, res, false, "Invalid verification Link", null)
        }
        // get and check if the token is registered in db which is sent by the user 
        const dbtoken = await TokenModel.findOne({
            userID: dbuser._id,
            token: token
        })

        if (!dbtoken) {
            // sendResponse(req, res, false, "Invalid verification Link", null)
            res.send('<h1>Sky-scalp</h1><br><h5>We are Sorry! This link may be invalid or expired, Please Sign up again to continue</h5>')
            return
        }

        await UserModal.updateOne({ _id: user }, { $set: { isVerified: true } });
        await TokenModel.deleteOne({ _id: dbtoken._id });

        // sendResponse(req, res, true, "Email verified successfully", null)
        let frontendUrl = process.env.FRONTEND_URL;
        res.send(`<h1>Verification Successfull!</h1><h5>Your acount verification is successfull, <a href="${frontendUrl}/login">Click here</a> to login</h5>`)

    } catch (error) {
        console.error(error);
        sendResponse(req, res, false, "Internal Server Error", null)
    }
}
const verfiyAccountForPassword = async (req, res) => {
    try {
        const { token, user } = req.query;
        //user mn user id ha

        // Find the user with the given user id
        const dbuser = await UserModal.findOne({ _id: user });
        if (!dbuser) {
            sendResponse(req, res, false, "Invalid verification Link", null)
        }
        // get and check if the token is registered in db which is sent by the user 
        const dbtoken = await TokenModel.findOne({
            userID: dbuser._id,
            token: token
        })

        if (!dbtoken) {
            // sendResponse(req, res, false, "Invalid verification Link", null)
            res.send('<h1>Sky-scalp</h1><br><h5>We are Sorry! This link may be invalid or expired, Please Sign up again to continue</h5>')
            return
        }

        await UserModal.updateOne({ _id: user }, { $set: { isVerified: true } });
        await TokenModel.deleteOne({ _id: dbtoken._id });

        // sendResponse(req, res, true, "Email verified successfully", null)
        let frontendUrl = process.env.FRONTEND_URL;
        res.send(`<h1>Verification Successfull!</h1><h5>Your acount verification is successfull, <a href="${frontendUrl}/update-password?uid=${user}">Click here</a> to update Password</h5>`)

    } catch (error) {
        console.error(error);
        sendResponse(req, res, false, "Internal Server Error", null)
    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return sendResponse(req, res, false, "ID not found", null);
        }

        bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
            if (err) {
                sendResponse(req, res, false, "Error encrypting password: " + err, null);
                return
            }
            UserModal.findOneAndUpdate({ _id: id }, { password: hashPassword })
                .then(response => {
                    if (response) {
                        sendResponse(req, res, true, "User password updated successfully", null)
                    }
                    else {
                        sendResponse(req, res, false, "Error updating User password ", null)
                    }
                })
                .catch(err => {
                    sendResponse(req, res, false, "Error proceeding your request", null)

                })

        })

    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error Proceeding Request, try again", null)
    }
}

const login = async (req, res) => {
    try {
        if (!req.body) {
            return sendResponse(req, res, false, "No data found in your request", null);
        }

        let user = await UserModal.findOne({ email: req.body.email });

        if (!user) {
            return sendResponse(req, res, false, "User with this email not found", null);
        }

        if (!user.status) {
            return sendResponse(req, res, false, "User status is currently inactive", null);
        }

        // see the user email is verified ?
        if (!user.isVerified) {
            const tokenResult = await TokenModel.findOne({ userID: user._id });

            // if the user id with token is present in tokens collection means that email is not verified yet 
            if (tokenResult) {
                return sendResponse(req, res, false, "User email is not verified. Verify your email to continue.", null);
            }
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return sendResponse(req, res, false, "Invalid Password", null);
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        req.session.jwt = token;

        const userData = {
            userID: user._id,
            isAdmin: user.isAdmin, 
            profileImage: user.profileImage,
            email: user.email,
            username: user.username,
            phone: user.phone,
            token: token ,
            status: user.status
        };
        // Login successful
        sendResponse(req, res, true, "Login Successful", userData);
    } catch (error) {
        // Handle any unexpected errors
        console.log(error)
        sendResponse(req, res, false, "An error occurred during login", error);
    }
};


const getUserById = (req, res) => {
    const id = req.params.id;
    if (id) {
        UserModal.findOne({ _id: id })
            .then(response => {
                if (response) {
                    sendResponse(req, res, true, 'User found successfully', response)
                }
                else {
                    sendResponse(req, res, false, 'User not found', null)
                }
            })
            .catch(err => {
                sendResponse(req, res, false, 'Error fetching User', err)
            })
    }
    else {
        sendResponse(req, res, false, 'Id not found', null)
    }
}


const getAllUsers = (req, res) => {
    UserModal.find()
        .then(response => {
            if (response) {
                sendResponse(req, res, true, "Users found successfully", response)
            }
            else {
                sendResponse(req, res, false, 'Users not found', null)
            }
        })
}

const updateUserInfo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendResponse(req, res, false, "User id not found", null);
        }

        let response = await UserModal.findOneAndUpdate({ _id: id }, req.body)
        if (response) {
            sendResponse(req, res, true, "User updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating user ", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error Proceeding Request, try again", null)
    }
}


const updateUserStaus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        if (!id || !status) {
            return sendResponse(req, res, false, "User id or status not found", null);
        }

        let response = await UserModal.findOneAndUpdate({ _id: id }, { status: status })
        if (response) {
            sendResponse(req, res, true, "User status updated successfully", null)
        }
        else {
            sendResponse(req, res, false, "Error updating User status ", null)
        }
    }
    catch (err) {
        console.log(err)
        sendResponse(req, res, false, "Error Proceeding Request, try again", null)
    }
}


const deleteUserAccount = (req, res) => {
    try {

    }
    catch (err) {

    }
}


module.exports =
{
    register,
    forgotPassword,
    updatePassword,
    login,
    verfiyAccount,
    verfiyAccountForPassword,
    getUserById,
    getAllUsers,
    updateUserInfo,
    updateUserStaus
}