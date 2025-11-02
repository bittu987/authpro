import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // --- Validation Logic ---
  const validate = (name, value, updatedForm) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email.";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 6)
          error = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (!value) error = "Confirm password is required.";
        else if (value !== updatedForm.password)
          error = "Passwords do not match.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));

    // Check form validity after each input
    const allValid =
      updatedForm.name.trim() &&
      updatedForm.email.trim() &&
      updatedForm.password.length >= 6 &&
      updatedForm.confirmPassword === updatedForm.password &&
      Object.values({ ...errors, [name]: error }).every((err) => err === "");

    setIsValid(allValid);
  };

  // --- Handle Change ---
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
      toast.error("Please fill all fields correctly before signing up.");
      return;
    }

    localStorage.setItem("registeredUser", JSON.stringify(form));
    toast.success("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd, #e8f5e9)",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: 380,
          p: 4,
          borderRadius: 3,
          bgcolor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(5px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          mb={1}
          sx={{
            fontWeight: 700,
            color: "#2e7d32",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            letterSpacing: "0.5px",
          }}
        >
          Create Your Account
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          mb={3}
          sx={{ color: "#555", opacity: 0.9 }}
        >
          Join us today 
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            margin="normal"
            size="small"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            size="small"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            value={form.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1,
              fontWeight: 600,
              borderRadius: "8px",

            }}
          >
            Sign Up
          </Button>

          <Typography mt={2} textAlign="center" variant="body2">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#2e7d32", fontWeight: 600 }}>
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
