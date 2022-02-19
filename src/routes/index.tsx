import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";

function Root(): React.ReactElement {
  return (
    <Router>
      <main>
        <section className="relative w-full py-20 h-full  min-h-screen ">
          <Routes>
            <Route path="/*" element={<Main />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default Root;
