import axios from "axios";

import { useState } from "react";

import styled from "styled-components";

export const Lunch = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    experience: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { ...formData };
    try {
      await axios.post(
        "https://hook.eu2.make.com/9gphyruy4ss7e1ovweo38tsqtgmjrhse",
        data
      );
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInputGroup>
          <StyledGroupLabel>
            Prénom:
            <StyledInput
              type="text"
              name="firstName"
              placeholder="Entrez votre prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </StyledGroupLabel>
          <StyledGroupLabel>
            Nom:
            <StyledInput
              type="text"
              name="lastName"
              placeholder="Entrez votre nom"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </StyledGroupLabel>
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledGroupLabel>
            Titre:
            <StyledInput
              type="text"
              name="position"
              placeholder="Entrez votre titre"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </StyledGroupLabel>
          <StyledGroupLabel>
            Entreprise:
            <StyledInput
              name="experience"
              onChange={handleChange}
              placeholder="Entrez vos années d'expérience"
              required
              type="text"
              value={formData.experience}
            />
          </StyledGroupLabel>
        </StyledInputGroup>
        <StyledLabel>
          Adresse email:
          <StyledInput
            name="email"
            onChange={handleChange}
            placeholder="Entrez votre adresse email"
            required
            type="email"
            value={formData.email}
          />
        </StyledLabel>
        <StyledLabel>
          Numéro de téléphone:
          <StyledInput
            name="phone"
            onChange={handleChange}
            placeholder="Entrez votre numéro de téléphone"
            required
            type="tel"
            value={formData.phone}
          />
        </StyledLabel>
        <StyledButton type="submit">
          Recevoir mon invitation personelle
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default Lunch;

const StyledContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin: auto;
  max-width: 400px;
  padding-top: 35px;
  padding: 40px;
  position: relative;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledInputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledLabel = styled.label`
  color: #fff;
  display: block;
`;

const StyledGroupLabel = styled.label`
  color: #fff;
  width: 50%;
`;

const StyledInput = styled.input`
  border-color: #fff;
  border-radius: 16px;
  border-width: 1px;
  box-sizing: border-box;
  padding: 15px 20px;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: rgba(96, 125, 139, 0.7);
  border-radius: 16px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  padding: 15px;
  transition: background-color 0.3s;
  width: 100%;
  &:hover {
    background-color: #455a64;
  }
`;
