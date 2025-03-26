import { useState } from "react";
import { CapitalizeFullName } from "../../utils";
import { PageTitle } from "../PageTitle";
import { useAuth } from "../../contexts/AuthContext";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Chip,
  Grid2,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import placeholder from "../../assets/avatar-placeholder.png";
import { EditProfile } from "./EditProfile";
import { CustomTabPanel, TabProps } from "./CustomTabPanel";
import { ProfileTextField } from "./ProfileTextField";

function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <PageTitle title="Profile" />
      {!user && <h2>No Active User</h2>}
      {user && (
        <>
          <Grid2
            container
            direction={{ xs: "column", md: "row" }}
            alignItems={"stretch"}
            spacing={3}
            sx={{
              pt: 3,
              px: { xs: 0, md: 7 },
            }}
          >
            <Grid2 size={{ md: 3 }} sx={{ display: "flex" }}>
              <Card variant="outlined" sx={{ width: "100%" }}>
                <Grid2
                  container
                  direction="column"
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Grid2 textAlign={"center"} py={3}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <PhotoCameraIcon
                          sx={{
                            border: "5px solid white",
                            backgroundColor: "#ffffff",
                            borderRadius: "50%",
                            padding: ".2rem",
                            width: 35,
                            height: 35,
                          }}
                          // TODO: Image upload feature...
                        ></PhotoCameraIcon>
                      }
                    >
                      <Avatar
                        sx={{ width: 100, height: 100, mb: 1.5 }}
                        alt={user.name}
                        src={placeholder}
                      ></Avatar>
                    </Badge>
                    <Typography variant="h4" component="h4">
                      {CapitalizeFullName(user.name)}
                    </Typography>
                    <Typography variant="h6" component={"h6"}>
                      {user.id}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Card>
            </Grid2>
            <Grid2 size={{ md: 9 }}>
              <Card variant="outlined">
                <br></br>
                <Tabs value={tab} onChange={handleChange}>
                  <Tab label="Profile" {...TabProps(0)} />
                  <Tab label="Edit" {...TabProps(1)} />
                </Tabs>
                <CustomTabPanel value={tab} index={0}>
                  <Box p={3} sx={{ textAlign: { xs: "center", md: "start" } }}>
                    <Typography variant={"h6"} component={"h6"}>
                      User Details
                    </Typography>
                    <Grid2
                      container
                      direction={{ xs: "column", md: "row" }}
                      columnSpacing={5}
                      rowSpacing={3}
                    >
                      <Grid2 size={{ xs: 6 }}>
                        <ProfileTextField
                          id="firstName"
                          name={"firstName"}
                          title={"First Name"}
                          value={String(user.name)}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <ProfileTextField
                          id="lastName"
                          name={"lastName"}
                          title={"Last Name"}
                          value={"To do..."}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 6 }}>
                        <ProfileTextField
                          id="email"
                          name={"email"}
                          title={"Email Address"}
                          value={String(user.email)}
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12 }}>
                        <Box>
                          <label style={{ fontWeight: "bold" }}>Roles</label>
                          <Stack direction={"row"}>
                            {user.roles.map((role) => (
                              <Chip
                                key={role}
                                variant={"outlined"}
                                label={CapitalizeFullName(role)}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={tab} index={1}>
                  <EditProfile />
                </CustomTabPanel>
              </Card>
            </Grid2>
          </Grid2>
        </>
      )}
    </>
  );
}

export { Profile };
