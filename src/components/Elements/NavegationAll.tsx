import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import FeedIcon from "@mui/icons-material/Feed";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { Admin, Menu, Route } from "./NavegationState";

const NavegationAll = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState<string>();

  const navegate = useNavigate();
  const location = useLocation();

  const [route] = useState<Route>(
    user.role === "ADMIN"
      ? Admin
      : user.role === "PAI"
      ? Menu
      : { urlDefault: "", urls: [], namePage: [], nameNavegation: [] }
  );

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const Page = (index: number) => {
    route.nameNavegation.map((_, b): any => {
      if (index == 0) {
        return navegate("/" + route.urlDefault);
      }

      if (index == route.nameNavegation.length - 1) {
        logout();
        return navegate("/");
      }

      if (b == index) {
        return navegate("/" + route.urlDefault + "/" + route.urls[b - 1]);
      }
    });
  };

  useEffect(() => {
    const urlStage = location.pathname.split("/")[2];
    if (urlStage === undefined) {
      setPagination(route.namePage[0]);
    } else if (urlStage === "cardapio") {
      setPagination(route.namePage[1]);
    } else {
      setPagination(route.namePage[2]);
    }
  }, [location.pathname]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Divider />
      <List>
        {route.nameNavegation.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => Page(index)}>
              <ListItemIcon>
                {index === 0 ? (
                  <FeedIcon />
                ) : index === 1 ? (
                  <RestaurantMenuIcon />
                ) : (
                  <AccountCircleIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div className="flex items-center relative right-4 mb-2">
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </Button>
        <p className="">{pagination}</p>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </>
  );
};

export default NavegationAll;
