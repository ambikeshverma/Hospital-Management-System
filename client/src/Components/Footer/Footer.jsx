import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0f172a", // dark blue/gray
        color: "#fff",
        mt: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Brand / About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Hospital Management System
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              A modern platform to manage patients, doctors, appointments, and
              hospital operations efficiently.
            </Typography>
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" underline="hover" color="inherit">
                Home
              </Link>
              <Link href="/about" underline="hover" color="inherit">
                About Us
              </Link>
              <Link href="/" underline="hover" color="inherit">
                Services
              </Link>
              <Link href="/contact" underline="hover" color="inherit">
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Copyright Strip */}
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

      <Box sx={{ py: 2, textAlign: "center" }}>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} Hospital Management System. All rights
          reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
