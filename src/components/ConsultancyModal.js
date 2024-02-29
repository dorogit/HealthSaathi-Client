import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormInput,
  Dropdown,
  Modal,
  ModalHeader,
  ModalContent,
  FormCheckbox,
} from 'semantic-ui-react';

const ConsultancyModal = ({ thirdOpen, setThirdOpen, doctorList }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [disabled, setDisabled] = useState(true); // Initially disabled
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  useEffect(() => {
    // Check if all fields have values
    if (firstName && lastName && age && gender && selectedDoctor && termsAgreed) {
      setDisabled(false); // Enable the button if all fields are filled
    } else {
      setDisabled(true); // Otherwise, disable the button
    }
  }, [firstName, lastName, age, gender, selectedDoctor, termsAgreed]);

  useEffect(() => {
    // Extract unique specialties from doctorList
    const uniqueSpecialties = doctorList.reduce((acc, current) => {
      if (!acc.includes(current.text)) {
        acc.push(current.text);
      }
      return acc;
    }, []);

    setSpecialtyOptions(uniqueSpecialties);
  }, [doctorList]);

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <Modal
      onClose={() => setThirdOpen(false)}
      closeOnEscape
      dimmer='blurring'
      open={thirdOpen}
    >
      <ModalHeader style={{ textAlign: "center" }}>Consult a Doctor</ModalHeader>
      <ModalContent style={{ padding: 20 }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup widths={2}>
            <FormInput
              label='Your First name'
              placeholder='Your First name'
              value={firstName}
              onChange={(e, { value }) => setFirstName(value)}
            />
            <FormInput
              label='Your Last name'
              placeholder='Your Last name'
              value={lastName}
              onChange={(e, { value }) => setLastName(value)}
            />
          </FormGroup>
          <FormGroup widths={2}>
            <FormInput
              label='Your Age'
              placeholder='Your Age'
              value={age}
              onChange={(e, { value }) => setAge(value)}
            />
            <FormInput
              label='Your Gender'
              placeholder='Your Gender'
              value={gender}
              onChange={(e, { value }) => setGender(value)}
            />
          </FormGroup>
          <Dropdown
            style={{ marginTop: 25, marginBottom: 25 }}
            placeholder='Select Specialty'
            fluid
            selection
            options={specialtyOptions.map(specialty => ({
              key: specialty,
              text: specialty,
              value: specialty,
            }))}
            value={selectedSpecialty}
            onChange={(e, { value }) => setSelectedSpecialty(value)}
          />
          <Dropdown
            style={{ marginTop: 25, marginBottom: 25 }}
            placeholder='Required Consultancy'
            fluid
            selection
            options={doctorList.filter(doctor => doctor.text === selectedSpecialty).map(doctor => ({
              key: doctor.key,
              text: doctor.key,
              value: doctor.key, // Update value to doctor's key
              image: doctor.image
            }))}
            value={selectedDoctor}
            onChange={(e, { value }) => setSelectedDoctor(value)}
          />
          <div style={{ alignItems: "center", textAlign: "center", justifyContent: "center" }}>
            <FormCheckbox
              label='I agree to the Terms and Conditions'
              checked={termsAgreed}
              onChange={(e, { checked }) => setTermsAgreed(checked)}
            />
            <Button disabled={disabled} style={{ width: "80%", alignSelf: "center", backgroundColor:"#219ebc", color:"white" }} type='submit'>Submit</Button>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  );
};

export default ConsultancyModal;
