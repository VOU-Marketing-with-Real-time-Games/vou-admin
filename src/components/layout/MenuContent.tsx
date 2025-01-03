import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import paths from "../../constants/paths";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, link: paths.HOME },
  { text: "Campaigns", icon: <CampaignRoundedIcon />, link: paths.CAMPAIGNS },
  { text: "Accounts", icon: <PeopleRoundedIcon />, link: paths.ACCOUNTS },
  { text: "Brands", icon: <StoreRoundedIcon />, link: paths.BRANDS },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon />, link: "/" },
  { text: "About", icon: <InfoRoundedIcon />, link: "/" },
  { text: "Feedback", icon: <HelpRoundedIcon />, link: "/" },
];

export default function MenuContent() {
  const location = useLocation();
  const currentPath = location.pathname;

  const selectedIndex = mainListItems.findIndex(item => item.link === currentPath);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} sx={{ display: "block", mt: "10px", px: "5px" }}>
            <ListItemButton selected={index === selectedIndex} href={item.link}>
              <ListItemIcon sx={{ py: "10px" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton href={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}