import {
  address,
  createAddress,
  createUser,
  updateUser,
  update_address,
  userDelete,
  user_address,
  user_get,
} from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { otpChecking, otpSaving } from "../models/otpModel.js";
import unirest from "unirest";

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);
//     if (!email || email === "" || !password || password === "") {
//       return errorHandler(400, "All Fields are required");
//     }
//     const data = await loginUser(email, password);
//     if (!data.success) {
//       return res.status(400).json({ message: data.message });
//     }
//     console.log(data.user);
//     if (data.success) {
//       const token = jwt.sign(
//         {
//           id: data.user.id,
//           email: data.user.email,
//           mobile: data.user.mobile,
//         },
//         process.env.JWT_SECRET
//       );
//       const { password: pass, ...user } = data.user;
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           httpOnly: true,
//         })
//         .json({ user, message: data.message, success: data.success });
//     }
//   } catch (error) {
//     console.log("login function error", error.message);
//     next(error);
//   }
// };

export const signUp = async (req, res, next) => {
  console.log("this is signup function");
  try {
    const { mobile } = req.body;
    console.log(req.body);
    console.log(typeof mobile);

    // Input validation
    if (!mobile || mobile === "" || mobile.length < 10) {
      return next(errorHandler(400, "Enter the Correct Number"));
    }
    // Token creation
    const token = jwt.sign({ mobile }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token created");

    // OTP generation
    const randome = Math.floor(Math.random() * 9000) + 1000;
    const number = parseInt(randome);
    console.log("This is your OTP:", number);

    // Sending OTP
    try {
      const req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

      req.headers({
        authorization: process.env.FAST_TWO_SMS_API,
      });

      req.form({
        message: `Welcome to E-Shop, This is your otp -${number}. Valid for 1 mins. Do not share with anyone-EShop`,
        language: "english",
        route: "q",
        numbers: mobile,
      });

      req.end(async function (response) {
        if (response.error) {
          console.error("Error in OTP process:", response.error);
          return next(errorHandler(500, "Failed to send OTP"));
        }

        // console.log("SMS response:", response.body);

        if (response.body.return) {
          // Adjust the condition based on the actual API response structure
          const otpSaveResult = await otpSaving(randome);
          if (otpSaveResult.success) {
            return res
              .status(200)
              .cookie("access_token", token, { httpOnly: true })
              .json({ success: true, message: "OTP sent successfully" });
          } else {
            return next(errorHandler(500, "Failed to save OTP"));
          }
        } else {
          console.error("Fast2SMS Error:", response.body.message);
          return next(errorHandler(500, "Failed to send OTP"));
        }
      });
    } catch (err) {
      console.error("Error in OTP process:", err.message);
      return next(errorHandler(500, "Failed to send OTP"));
    }
  } catch (error) {
    console.error("Create user error:", error.message);
    return next(errorHandler(500, "Internal Server Error"));
  }
};

export const signup_Otpvalidation = async (req, res, next) => {
  console.log("this is the sign up otp validation function");
  try {
    const { otp } = req.body;
    let userData = {};
    console.log(otp, "its a otp");

    const toke = req.cookies.access_token;

    if (!toke) {
      return next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(toke, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return next(errorHandler(401, "Unauthorized"));
      }
      userData = user;

      console.log(user, "user details");

      const data = await otpChecking(otp);

      if (data.success) {
        const result = await createUser(user.mobile);
        if (result.success) {
          const token = jwt.sign(
            {
              id: result.user.id,
              mobile: result.user.mobile,
            },
            process.env.JWT_SECRET
          );
          res.status(200).cookie("access_token", token).json({
            success: true,
            message: "Login Successfully",
            user: result.user,
          });
        } else {
          return res
            .status(400)
            .json({ success: result.success, message: result.message });
        }
      } else {
        return next(errorHandler(400, "Invalid OTP"));
      }
    });

    res;
  } catch (error) {
    console.error("signup otp validation error", error.message);
    next(error);
  }
};

export const userUpdate = async (req, res, next) => {
  try {
    const { id } = req.user;
    const userId = parseInt(id);
    const { username, email, mobile } = req.body;
    console.log(req.body, id);

    if (mobile) {
      if (mobile.length < 10) {
        return next(errorHandler(400, "Mobile must be at least 10 numbers"));
      }
    }
    if (username) {
      if (username.length < 6 || username.length > 20) {
        return next(
          errorHandler(400, "Username must be between 6 and 20 characters")
        );
      }
      if (username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contain spaces"));
      }
      if (username !== username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
      }
    }

    const data = await updateUser(userId, username, email, mobile);

    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    } else {
      return next(errorHandler(400, "user not found"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not allowed to delete this account")
    );
  }
  try {
    const data = await userDelete(req.params.userId);
    if (data.success) {
      return res.status(200).json(data.message);
    } else {
      return next(
        errorHandler(403, "you are not allowed to delete this account")
      );
    }
  } catch (error) {
    next(error);
  }
};

export const get_user = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user_id = parseInt(userId);
    const data = await user_get(user_id);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    return res
      .status(200)
      .json({ success: data.success, message: data.message, user: data.user });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    console.log("logout function");
    res
      .clearCookie("access_token")
      .status(200)
      .json({ success: true, message: "Signout Successfully" });
  } catch (error) {
    next(error);
  }
};

export const addAddress = async (req, res, next) => {
  console.log("this is the address crete function");
  try {
    let {
      houseNo,
      flatNo,
      address,
      district,
      state,
      pincode,
      landmark,
      saveAs,
      username,
      mobile,
    } = req.body;
    const { id } = req.params;
    const user_Id = parseInt(id);
    console.log(req.body, user_Id);
    const data = await createAddress(
      (houseNo = houseNo ? houseNo : null),
      (flatNo = flatNo ? flatNo : null),
      address,
      district,
      state,
      pincode,
      landmark,
      saveAs,
      user_Id,
      username,
      mobile
    );

    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, message: data.message });
    }
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const getAddress = async (req, res, next) => {
  console.log("this is getaddress function");
  try {
    const { id } = req.params;
    const data = await address(id);
    if (data.success) {
      return res
        .status(200)
        .json({ success: data.success, address: data.address });
    } else {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
  } catch (error) {
    next(error);
  }
};

export const single_address = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { id } = req.body;
    const user_id = parseInt(userId);
    console.log(user_id);
    console.log(userId, id);
    const data = await user_address(user_id, id);
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    return res.status(200).json({
      success: data.success,
      message: data.message,
      address: data.address,
    });
  } catch (error) {
    next(error);
  }
};

export const address_update = async (req, res, next) => {
  try {
    const {
      houseNo,
      flatNo,
      address,
      district,
      state,
      pincode,
      landmark,
      saveAs,
      username,
      id,
    } = req.body;
    console.log(req.body);
    const { userId } = req.params;
    const user_Id = parseInt(userId);
    console.log(user_Id);
    const data = await update_address(
      houseNo,
      flatNo,
      address,
      district,
      state,
      pincode,
      landmark,
      username,
      saveAs,
      user_Id,
      id
    );
    if (!data.success) {
      return res
        .status(400)
        .json({ success: data.success, message: data.message });
    }
    return res
      .status(200)
      .json({ success: data.success, message: data.message });
  } catch (error) {
    next(error);
  }
};
