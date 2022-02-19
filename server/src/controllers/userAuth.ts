import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";

const login = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ message: "email or password is missing" });
    }
    // Validate if user exist in our database
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "email is incorrect" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(process.env.TOKEN_Time);
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY ?? "",
        {
          expiresIn: process.env.TOKEN_Time,
        }
      );

      // user
      res.status(200).json({
        success: true,
        jwt: token,
      });
    } else {
      res.status(400).json({ message: "invalid crendtial" });
    }
  } catch (err) {
    console.log(err);

    return res.status(400).json({ message: "somrthing Went Wrong" });
  }
  // Our register logic ends here
};

const register = async (req: express.Request, res: express.Response) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res
        .status(400)
        .json({ success: false, message: "email or password is missing" });
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({
      email: email,
    });

    if (oldUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database

    const createdUser = await User.create({
      email: email,
      password: encryptedPassword,
    });

    console.log("created User", createdUser);

    // return new user

    return res.status(201).json({
      message: "Account is created",
      user: {
        id: createdUser._id,
        email: createdUser.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "something Went Wrong" });
  }
};

export { login, register };
