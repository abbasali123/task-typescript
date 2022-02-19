import React from "react";
import { Assignment } from "@material-ui/icons";
import { Nav, NavbarContainer, MenuLink } from "../styles/navbar";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../services/localStorage";

function Navbar(): React.ReactElement {
  const navigate = useNavigate();
  React.useEffect(() => {
    let localStorage = getLocalStorage();

    if (!localStorage?.jwt) {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <Nav>
      <NavbarContainer>
        <div>
          <MenuLink to="/">
            <Assignment />
          </MenuLink>
        </div>
        <div>
          <MenuLink to="/create-task">Create Task</MenuLink>
          <MenuLink to="/bulk-delete">Delete Tasks</MenuLink>
          <MenuLink to="/signin" onClick={() => localStorage.clear()}>
            Logout
          </MenuLink>
        </div>
      </NavbarContainer>
    </Nav>
  );
}

export default Navbar;
