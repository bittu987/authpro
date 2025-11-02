import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- Validation Logic ---
  const validate = (name, value, updatedForm) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email.";
        break;
      case "password":
        if (!value.trim()) error = "Password is required.";
        else if (value.length < 6)
          error = "Password must be at least 6 characters.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    const allValid =
      updatedForm.email.trim() &&
      updatedForm.password.trim() &&
      Object.values({ ...errors, [name]: error }).every((err) => err === "");
    setIsValid(allValid);
  };

  // --- Handle Input Change ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    validate(name, value, updatedForm);
  };

  // --- Handle Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!storedUser) {
      toast.error("User not found! Please sign up first.");
      return;
    }

    if (
      form.email === storedUser.email &&
      form.password === storedUser.password
    ) {
      dispatch(loginSuccess(storedUser));
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f7fa 0%, #f1f8e9 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: 360,
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          mb={3}
          sx={{
            fontWeight:600,
            color: "#2e7d32",
            textShadow: "0 1px 1px rgba(0,0,0,0.1)",
          }}
        >
          Login to Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            size="small"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            size="small"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1,
              borderRadius: 2,
              background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
              color: "#fff",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
              },
            }}
          >
            Login
          </Button>

          <Typography mt={3} textAlign="center" variant="body2">
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: "#1565c0", fontWeight: 500 }}>
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
