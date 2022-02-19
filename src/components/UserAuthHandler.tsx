import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { emailRegex } from "../constants/regex";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

function UserAuthHandler({ isRegister = true }: { isRegister?: boolean }) {
  const navigate = useNavigate();
  const { mutateAsync: userAuthHandler } = useAuth(isRegister);

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .matches(emailRegex, "Incorrect Email")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must be more than 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      await userAuthHandler(values);

      if (isRegister) {
        navigate("/signin");
      } else {
        navigate("/");
      }
    },
  });

  const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid style={{ alignItems: "center" }}>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>{isRegister ? "Sign Up" : "Sign In"}</h2>
          <Typography variant="caption" gutterBottom>
            {isRegister
              ? "Please fill this form to create an account !"
              : "Please fill in credentials to login"}
          </Typography>
        </Grid>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                fullWidth
                label="Password"
                placeholder="Enter your password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item sm={12}>
              <Button type="submit" variant="contained" color="primary">
                {isRegister ? "Sign up" : "Sign In"}
              </Button>
            </Grid>

            <Grid item sm={12}>
              {isRegister ? (
                <>
                  Already have an account ?<Link to="/signin">Sign In</Link>
                </>
              ) : (
                <>
                  Don't have an account ? Create One{" "}
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default UserAuthHandler;
