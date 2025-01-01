import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBitcoin,
  FaEdit,
} from "react-icons/fa";
import { useGetUserProfile } from "../services/query/ProductQuery";
import LoadingIndicator from "../components/Common/LoadingIndicator";

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const ProfileHeader = styled.div`
  position: relative;
  background: linear-gradient(135deg, #2874f0, #1e5bc8);
  border-radius: 20px;
  padding: 3rem 2rem;
  color: white;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.1) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%);
  background-size: 20px 20px;
  opacity: 0.1;
`;

const ProfileImage = styled(motion.div)`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
  border: 4px solid white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled(motion.h1)`
  text-align: center;
  margin: 1rem 0;
  font-size: 2.5rem;
  font-weight: 700;
`;

const ProfileRole = styled(motion.div)`
  text-align: center;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
  margin: 0 auto;
  font-weight: 500;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Section = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    color: #2874f0;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  background: #f8f9fa;
  overflow: hidden;

  span {
    color: #666;
  }

  strong {
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const EditButton = styled(motion.button)`
  background: none;
  border: none;
  color: #2874f0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #f0f7ff;
  }
`;

const CryptoSection = styled(Section)`
  background: linear-gradient(135deg, #1a237e, #0d47a1);
  color: white;

  ${SectionHeader} {
    border-bottom-color: rgba(255, 255, 255, 0.1);

    h2 {
      color: white;
    }
  }

  ${InfoItem} {
    background: rgba(255, 255, 255, 0.1);

    span,
    strong {
      color: white;
    }
  }
`;

const ErrorText = styled.p`
  color: #ff416c;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
`;

function Profile() {
  const {
    data: userData,
    error,
    isLoading,
    refetch,
    isError,
  } = useGetUserProfile();

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorText>{error.message}</ErrorText>;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <BackgroundPattern />
        <ProfileImage
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={userData?.image}
            alt={`${userData?.firstName} ${userData?.lastName}`}
          />
        </ProfileImage>

        <ProfileName
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {userData?.firstName} {userData?.lastName}
        </ProfileName>

        <ProfileRole
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {userData?.company.title} at {userData?.company.name}
        </ProfileRole>
      </ProfileHeader>

      <ContentGrid>
        <Section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <SectionHeader>
            <h2>
              <FaUser /> Personal Information
            </h2>
            <EditButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaEdit /> Edit
            </EditButton>
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <span>Age:</span>
              <strong>{userData?.age}</strong>
            </InfoItem>
            <InfoItem>
              <span>Birth Date:</span>
              <strong>{userData?.birthDate}</strong>
            </InfoItem>
            <InfoItem>
              <span>Blood Group:</span>
              <strong>{userData?.bloodGroup}</strong>
            </InfoItem>
            <InfoItem>
              <span>Height:</span>
              <strong>{userData?.height} cm</strong>
            </InfoItem>
            <InfoItem>
              <span>Weight:</span>
              <strong>{userData?.weight} kg</strong>
            </InfoItem>
          </InfoGrid>
        </Section>

        <Section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <SectionHeader>
            <h2>
              <FaEnvelope /> Contact Information
            </h2>
            <EditButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaEdit /> Edit
            </EditButton>
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <span>Email:</span>
              <strong>{userData?.email}</strong>
            </InfoItem>
            <InfoItem>
              <span>Phone:</span>
              <strong>{userData?.phone}</strong>
            </InfoItem>
          </InfoGrid>
        </Section>

        <CryptoSection
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <SectionHeader>
            <h2>
              <FaBitcoin /> Crypto Wallet
            </h2>
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <span>Coin:</span>
              <strong>{userData?.crypto?.coin}</strong>
            </InfoItem>
            <InfoItem>
              <span>Wallet:</span>
              <strong>{userData?.crypto?.wallet.substring(0, 8)}...</strong>
            </InfoItem>
            <InfoItem>
              <span>Network:</span>
              <strong>{userData?.crypto?.network}</strong>
            </InfoItem>
          </InfoGrid>
        </CryptoSection>

        <Section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <SectionHeader>
            <h2>
              <FaMapMarkerAlt /> Address
            </h2>
            <EditButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FaEdit /> Edit
            </EditButton>
          </SectionHeader>
          <InfoGrid>
            <InfoItem>
              <span>Street:</span>
              <strong>{userData?.address?.address}</strong>
            </InfoItem>
            <InfoItem>
              <span>City:</span>
              <strong>{userData?.address?.city}</strong>
            </InfoItem>
            <InfoItem>
              <span>State:</span>
              <strong>{userData?.address?.state}</strong>
            </InfoItem>
            <InfoItem>
              <span>Country:</span>
              <strong>{userData?.address?.country}</strong>
            </InfoItem>
          </InfoGrid>
        </Section>
      </ContentGrid>
    </ProfileContainer>
  );
}

export default Profile;
