import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaWhatsapp,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2874f0, #1e5bc8);
  color: white;
  padding: 4rem 0 2rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 0.5rem;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 2px;
      background: #ffd700;
    }
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterListItem = styled(motion.li)`
  margin-bottom: 0.8rem;

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
      color: white;
      transform: translateX(5px);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .icon {
    font-size: 2rem;
    color: #ffd700;
  }

  .text {
    h4 {
      margin: 0;
      font-size: 1rem;
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;

const Newsletter = styled.div`
  margin-top: 1rem;
`;

const NewsletterInput = styled.div`
  display: flex;
  gap: 0.5rem;

  input {
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    flex: 1;
  }

  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 5px;
    background: #ffd700;
    color: #2874f0;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background: #fff;
    }
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FeatureGrid>
          <Feature>
            <FaTruck className="icon" />
            <div className="text">
              <h4>Free Shipping</h4>
              <p>On orders over $100</p>
            </div>
          </Feature>
          <Feature>
            <FaShieldAlt className="icon" />
            <div className="text">
              <h4>Secure Payment</h4>
              <p>100% secure payment</p>
            </div>
          </Feature>
          <Feature>
            <FaWhatsapp className="icon" />
            <div className="text">
              <h4>24/7 Support</h4>
              <p>Dedicated support</p>
            </div>
          </Feature>
        </FeatureGrid>

        <FooterGrid>
          <FooterSection>
            <h3>About Us</h3>
            <FooterList>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Our Story</a>
              </FooterListItem>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Careers</a>
              </FooterListItem>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Press</a>
              </FooterListItem>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Blog</a>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <h3>Customer Service</h3>
            <FooterList>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Help Center</a>
              </FooterListItem>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Returns</a>
              </FooterListItem>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Shipping Info</a>
              </FooterListItem>
              <FooterListItem whileHover={{ scale: 1.02 }}>
                <a href="#">Contact Us</a>
              </FooterListItem>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <h3>Stay Connected</h3>
            <SocialLinks>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedinIn />
              </SocialIcon>
            </SocialLinks>
            <Newsletter>
              <h3>Newsletter</h3>
              <NewsletterInput>
                <input type="email" placeholder="Enter your email" />
                <button>Subscribe</button>
              </NewsletterInput>
            </Newsletter>
          </FooterSection>
        </FooterGrid>

        <Copyright>
          <p>
            © 2024 MiniFlipkart. Made with{" "}
            <FaHeart style={{ color: "#ff4757" }} /> by Mudit Tiwari
          </p>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
