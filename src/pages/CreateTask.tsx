import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import Navbar from "../components/Navbar";
import { useCreateTask } from "../hooks";
import { useNavigate } from "react-router-dom";

function CreateTask(): React.ReactElement {
  const navigate = useNavigate();

  const { mutateAsync: createTask } = useCreateTask();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      const response = await createTask(values);
      console.log(response);

      navigate("/");
    },
  });

  const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
  const headerStyle = { margin: 0 };

  return (
    <>
      <Navbar />
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid style={{ alignItems: "center" }}>
            <h2 style={headerStyle}>Create Task</h2>
            <Typography variant="caption" gutterBottom>
              Enter the task name to create
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Task Name"
                  placeholder="Enter Task Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>

              <Grid item sm={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create Task
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default CreateTask;
