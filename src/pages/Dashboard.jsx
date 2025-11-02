import React from "react";
import { Box, Paper, Typography, Button, Divider, Avatar, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("You have been logged out.");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 4,
          width: 420,
          borderRadius: 3,
          textAlign: "center",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease-in-out",
          "&:hover": { transform: "translateY(-5px)", boxShadow: "0 6px 25px rgba(0,0,0,0.15)" },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "#1976d2",
              width: 70,
              height: 70,
              fontSize: 32,
            }}
          >
            <AccountCircleIcon fontSize="large" />
          </Avatar>

          <Typography variant="h5" fontWeight={600}>
            Welcome, {user?.name || "User"} 👋
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here’s your dashboard overview.
          </Typography>

          <Divider sx={{ width: "100%", my: 2 }} />

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#f5f7fa",
              width: "100%",
            }}
          >
            <Typography
              variant="subtitle1"
              color="primary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
            >
              <DashboardIcon /> Account Details
            </Typography>
            <Typography variant="body2" mt={1}>
              <strong>Name:</strong> {user?.name || "N/A"}
            </Typography>
            <Typography variant="body2">
              <strong>Email:</strong> {user?.email || "N/A"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="error"
            endIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              mt: 2,
              px: 4,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;
