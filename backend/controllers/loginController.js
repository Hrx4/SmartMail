const asyncHandler = require("express-async-handler");
const { get_access_token } = require("../utils/oauth");
const jwt = require("jsonwebtoken");
// const { startEmailWatcher } = require("../imapManager");
// const xoauth2 = require("xoauth2");
const userModel = require("../models/userModel");

// const makeXoauth2 =  (user , accessToken) => {
//     const authToken = `user=${user}\x01auth=Bearer ${accessToken}\x01\x01`
//       console.log(authToken);
//     return Buffer.from(authToken).toString("base64");
// }

// dXNlcj1kcmFna2FtYWw3MUBnbWFpbC5jb20BYXV0aD1CZWFyZXIgeWEyOS5BMEFTM0g2TnlxUnB2c3pkWlRtWFBuNHN0M3paX0hzN3VjekZBUjZpM2NjM2FaVDlybjE2LXZpTmw3dH
// A3eHctMUd1eVNDdVJQYnlRbG0tTUYyaTlVUXFVdHFpczdYdzF4dkRRZ0ZHaWU4RkVwUEhIOFNyanlEdnF1d3dJNnUwWVdPUGp0RHN6ODVPMUtYWHRHYzYwVjEwT3BEZDV0MWNwSzNa
// MnZzSUJHVzZ0bmNoYk5DU0hyeE5rMDVqaFZpZUZybDhDdW41cG9hQ2dZS0FaTVNBUmNTRlFIR1gyTWl5WWRDWlBodkRJWGJ2UHFwRjNpTGpnMDIwNgEB

// 

// const makeXoauth2 = (user, accessToken , refreshToken) => {
//     const res =  xoauth2.createXOAuth2Generator({
//         user: user,
//         accessToken: accessToken,
//         refreshToken: refreshToken,
    
//     }).getToken((err, token) => {
//         if (err) {
//             console.log(err);
//             return null;
//         }
//         return token;
//     });
//     console.log(res);
//     return res;
// }



const userLogin = asyncHandler(
    async (req, res) => {
            const authorization_token = req.query.code;

            // const reqAccessToken = req.cookies.access_token;

            // if (reqAccessToken) {
            //     res.status(200).json(reqAccessToken);
            //     return;
            // }

            const response = await get_access_token(authorization_token);

            
            const { access_token, refresh_token, expires_in , email,picture } = response;
            console.log(response);
           const user = await userModel.findOneAndUpdate({
                mainEmail: email
            },{
                $set:{
                    access_token,
                    refresh_token,
                    expires_in,
                    picture
                }
            },
        {
            new: true,
            upsert: true, // Create a new document if one doesn't exist
        });

        const token = jwt.sign({
            email: email,
            picture: picture,
            access_token: access_token,
        } , process.env.JWT_SECRET, { expiresIn: '1h' });


            res.cookie('jwt_token', token, { maxAge: 3600*1000 , httpOnly: true , sameSite: 'lax' })
            res.status (200).json (user );
    }
)

module.exports = { userLogin };