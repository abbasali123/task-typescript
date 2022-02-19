import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateTask from "../pages/CreateTask";
import DeleteTasks from "../pages/DeleteTasks";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import SignupPage from "../pages/SignupPage";
import SigninPage from "../pages/SigninPage";

function Main() {
  // const { data: userData } = useGetUserInfo();

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signin" element={<Signin />} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/list-tasks" element={<HomePage />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/bulk-delete" element={<DeleteTasks />} />
        {/* <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/updatepass/:email/:id" element={<UpdatePassword />} /> */}
      </Routes>
    </>
  );
}

export default Main;
