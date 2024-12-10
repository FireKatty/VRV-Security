
import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardContent, TextField, Link as MuiLink, Modal, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { KeyboardArrowUp } from "@mui/icons-material"; // For scroll-to-top button
import { Box } from "@mui/material"; 
import Login from "./login";
import Signup from "./signup"


// Styled Components
const Root = styled('div')({
  backgroundColor: "#121212",
  color: "#fff",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  fontFamily: "'Roboto', sans-serif",
  overflowX: "hidden",  // Prevent horizontal scroll
});

const Header = styled('header')({
  
  padding: "20px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #333",
  position: "sticky",
  top: 0,
  zIndex: 100,
  backgroundColor: "#121212",
  width: "100%", // Ensure header fits screen width
});

const HeaderLinks = styled('div')({
    marginRight: "114px",
  display: "flex",
  gap: "20px",
});

const HeaderLink = styled(MuiLink)({
  color: "#00bcd4",
  textDecoration: "none",
  fontSize: "1rem",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#008c9e",
  },
});

const Hero = styled('section')({
  position: "relative",
  textAlign: "center",
  height: "80vh", 
  background: "url(https://vrvsecurity.in/static/media/4.f35312466d6e3457f39e.png) center/cover no-repeat",
  color: "#fff",
});

const HeroOverlay = styled('div')({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

const HeroText = styled(Typography)({
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "20px",
  textShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
});

const StyledButton = styled(Button)({
  backgroundColor: "#00bcd4",
  color: "#fff",
  fontSize: "1.2rem",
  padding: "10px 30px",
  borderRadius: "5px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#008c9e",
    transform: "scale(1.05)",
  },
});

const ScrollTopButton = styled(IconButton)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#00bcd4",
  color: "#fff",
  zIndex: 200,
  "&:hover": {
    backgroundColor: "#008c9e",
  },
});

const ServiceCards = styled('section')({
  padding: "50px 20px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
});

const StyledCard = styled(Card)({
  backgroundColor: "#1a1a1a",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  width: "300px",
  textAlign: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
  },
});

const Footer = styled('footer')({
  backgroundColor: "#121212",
  padding: "20px 0",
  textAlign: "center",
  color: "#aaa",
  fontSize: "0.9rem",
  borderTop: "1px solid #333",
});

// About Section Styles
const AboutSection = styled('section')({
    padding: "60px 20px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
  });
  
  const AboutHeading = styled(Typography)({
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "30px",
  });
  
  const AboutContent = styled('div')({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "30px",
  });
  
  const AboutItem = styled('div')({
    backgroundColor: "#444",
    padding: "20px",
    borderRadius: "8px",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#555",
    },
    textAlign: "left",
  });
  
  const AboutItemHeading = styled(Typography)({
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  });
  
  const AboutItemText = styled(Typography)({
    fontSize: "1rem",
    color: "#ccc",
  });

// Contact Form Section Styles
const ContactFormSection = styled('section')({
  padding: "60px 20px",
  backgroundColor: "#1a1a1a",
  color: "#fff",
  textAlign: "center",
});

const ContactFormHeading = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "30px",
});

// FAQ Section Styles
const FAQSection = styled('section')({
  padding: "60px 20px",
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center",
});

const FAQItem = styled('div')({
  backgroundColor: "#444",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "8px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#555",
  },
});

const FAQAnswer = styled(Typography)({
  display: "none",
  marginTop: "10px",
  fontSize: "1rem",
  color: "#ccc",
});


function Front() {
  
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("login"); // Default to "login"
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  

  const [faqOpen, setFaqOpen] = useState(null);
  
  const [scrollVisible, setScrollVisible] = useState(false);
  

  // Scroll-to-Top Button Visibility
  const handleScroll = () => {
    setScrollVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  

  // Handle Modal Open/Close
  const handleModalOpen = (type) => {
    setModalContent(type); // Set modal type ("login" or "signup")
    setOpenModal(true);
  };

  const handleModalClose = () => setOpenModal(false);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("All fields are required!");
      return;
    }
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  // Handle FAQ Item Click
  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Handle Scroll-to-Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Root>
      <Header>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img 
            src="https://vrvsecurity.in/static/media/favicon.cc3b0694d956aaccd51d.ico" 
            alt="VRV Security Logo" 
            style={{ borderRadius: "50%", height: "40px", width: "40px" }} 
          />
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            VRV Security
          </Typography>
        </div>
        <HeaderLinks>
          <HeaderLink href="#about">About Us</HeaderLink>
          <HeaderLink href="#contact">Contact</HeaderLink>
          <HeaderLink href="#faq">FAQs</HeaderLink>
          <HeaderLink href="#" onClick={() => handleModalOpen("login")}>Login</HeaderLink>
          <HeaderLink href="#" onClick={() => handleModalOpen("signup")}>SignUp</HeaderLink>
        </HeaderLinks>
      </Header>

      <Hero>
        <HeroOverlay>
          <HeroText>Protect Your Digital World</HeroText>
          <StyledButton onClick={() => handleModalOpen("login")}>Get Started</StyledButton>
        </HeroOverlay>
      </Hero>

      {/* Modal for Login/Signup */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
              {modalContent === "login" ? (
                <Login onSwitch={() => setModalContent("signup")} />
              ) : (
                <Signup onSwitch={() => setModalContent("login")} />
              )}
        </Box>
      </Modal>

      {/* About Us Section */}
      <AboutSection id="about">
        <AboutHeading>About Us</AboutHeading>
        <AboutContent>
          <AboutItem>
            <AboutItemHeading>Extensive Global Presence</AboutItemHeading>
            <AboutItemText>Operating across multiple continents to meet diverse client needs.</AboutItemText>
          </AboutItem>
          <AboutItem>
            <AboutItemHeading>Focused on Protection</AboutItemHeading>
            <AboutItemText>Committed to safeguarding businesses with reliable, scalable, and efficient solutions.</AboutItemText>
          </AboutItem>
          <AboutItem>
            <AboutItemHeading>Experienced Team</AboutItemHeading>
            <AboutItemText>Skilled professionals dedicated to maintaining high standards in digital security.</AboutItemText>
          </AboutItem>
          <AboutItem>
            <AboutItemHeading>Innovative Technology</AboutItemHeading>
            <AboutItemText>We leverage AI and cloud technologies to combat modern cyber threats.</AboutItemText>
          </AboutItem>
          <AboutItem>
            <AboutItemHeading>Global Leader in Cybersecurity</AboutItemHeading>
            <AboutItemText>VRV Security delivers advanced, AI-driven cybersecurity solutions worldwide.</AboutItemText>
          </AboutItem>
        </AboutContent>
      </AboutSection>

      <ServiceCards >
        {["Extensive Global Presence", "Focused on Protection", "Experienced Team", "Innovative Technology", "Global Leader in Cybersecurity"].map((title) => (
          <StyledCard key={title}>
            <CardContent>
              <Typography variant="h6">{title}</Typography>
              <Typography>{`Details about ${title.toLowerCase()}`}</Typography>
            </CardContent>
          </StyledCard>
        ))}
      </ServiceCards>

      {/* Contact Form */}
      <ContactFormSection id="contact">
        <ContactFormHeading>Contact Us</ContactFormHeading>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
          <StyledButton type="submit">Send Message</StyledButton>
        </form>
      </ContactFormSection>

      {/* FAQ Section */}
      <FAQSection id="faq">
        <Typography variant="h5" style={{ marginBottom: "20px" }}>FAQs</Typography>
        {[ 
          { question: "What is VRV Security?", answer: "VRV Security is a cybersecurity company focused on providing AI-driven protection to businesses and individuals." },
          { question: "How does it work?", answer: "We use advanced AI and cloud technologies to safeguard against modern cyber threats." },
          { question: "Why choose VRV Security?", answer: "We offer a tailored approach to cybersecurity with a focus on innovation and protection." },
          { question: "What services do you offer?", answer: "We provide a range of cybersecurity services including threat detection, incident response, and protection solutions." }
        ].map((faq, index) => (
          <FAQItem key={index} onClick={() => toggleFAQ(index)}>
            <Typography variant="h6">{faq.question}</Typography>
            <FAQAnswer style={{ display: faqOpen === index ? "block" : "none" }}>
              {faq.answer}
            </FAQAnswer>
          </FAQItem>
        ))}
      </FAQSection>

      {/* Scroll-to-Top Button */}
      {scrollVisible && (
        <ScrollTopButton onClick={scrollToTop}>
          <KeyboardArrowUp />
        </ScrollTopButton>
      )}

      {/* Footer */}
      <Footer>
        <Typography>© 2024 VRV Security. All rights reserved.</Typography>
      </Footer>
    </Root>
  );
}

export default Front;



