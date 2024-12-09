import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import "../Sidebar.css";
import ManageUsers from "./ManageUsers";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <List>
        <ListItem button >
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Roles" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Permissions" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import { List, ListItem, ListItemText } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "../Sidebar.css";

// const Sidebar = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   return (
//     <div className="sidebar">
//       <List>
//         <ListItem button onClick={() => handleNavigation("/manage-users")}>
//           <ListItemText primary="Manage Users" />
//         </ListItem>
//         <ListItem button onClick={() => handleNavigation("/roles")}>
//           <ListItemText primary="Roles" />
//         </ListItem>
//         <ListItem button onClick={() => handleNavigation("/permissions")}>
//           <ListItemText primary="Permissions" />
//         </ListItem>
//       </List>
//     </div>
//   );
// };

// export default Sidebar;
