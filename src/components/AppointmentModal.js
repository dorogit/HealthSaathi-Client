import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  Dropdown,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  FormInput,
  FormCheckbox,
  TextArea
} from 'semantic-ui-react'

const AppointmentModal = ({ secondOpen, setSecondOpen, doctorList }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);

  useEffect(() => {
    setDisabled(!areAllFieldsFilled());
  }, [firstName, lastName, age, gender, termsAgreed]);

  useEffect(() => {
    if (!selectedSpecialty) return; // No need to filter if no specialty selected

    // Filter doctor list by selected specialty
    const filteredDoctors = doctorList.filter(doctor => doctor.text === selectedSpecialty);

    // Extract unique districts from filtered doctors
    const uniqueDistricts = [...new Set(filteredDoctors.map(doctor => doctor.value))];
    
    setDistrictOptions(uniqueDistricts.map(district => ({
      key: district,
      text: district,
      value: district
    })));
  }, [selectedSpecialty, doctorList]);

  useEffect(() => {
    // Extract unique specialties from doctor list
    const uniqueSpecialties = [...new Set(doctorList.map(doctor => doctor.text))];

    setSpecialtyOptions(uniqueSpecialties.map(specialty => ({
      key: specialty,
      text: specialty,
      value: specialty
    })));
  }, [doctorList]);

  const areAllFieldsFilled = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      age.trim() !== "" &&
      gender !== "" &&
      termsAgreed
    );
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  const genders = [
    {
      key: 'Male',
      text: 'Male',
      value: 'Male',
      image: { src: require('../assets/male.png') },
    },
    {
      key: 'Female',
      text: 'Female',
      value: 'Female',
      image: { src: require('../assets/female.png') },
    },
    {
      key: 'Other',
      text: 'Other',
      value: 'Other',
      image: { src: require('../assets/unisex.png') },
    },
  ]

  return (
    <Modal
      onClose={() => setSecondOpen(false)}
      closeOnEscape
      dimmer={'blurring'}
      open={secondOpen}
      header='Book an appointment'
      content='Please fill the following'
    >
      <ModalHeader>Book an Appointment</ModalHeader>
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
            <Dropdown
              style={{ marginTop: 25, marginBottom: 25, flex: 1 }}
              placeholder='Select Gender'
              fluid
              selection
              options={genders}
              value={gender}
              onChange={(e, { value }) => setGender(value)}
            />
          </FormGroup>
          <Dropdown
            style={{ marginTop: 25, marginBottom: 25 }}
            placeholder='Select Specialty'
            fluid
            selection
            value={selectedSpecialty}
            onChange={(e, { value }) => setSelectedSpecialty(value)}
            options={specialtyOptions}
          />
          {selectedSpecialty && (
            <Dropdown
              style={{ marginTop: 25, marginBottom: 25 }}
              placeholder='Select District'
              fluid
              selection
              value={selectedDistrict}
              onChange={(e, { value }) => setSelectedDistrict(value)}
              options={districtOptions}
            />
          )}
          {selectedSpecialty && selectedDistrict && (
            <Dropdown
              style={{ marginTop: 25, marginBottom: 25 }}
              placeholder='Select Doctor'
              fluid
              selection
              value={selectedDoctor}
              onChange={(e, { value }) => setSelectedDoctor(value)} // Update selectedDoctor state here
              options={doctorList.filter(doctor => doctor.text === selectedSpecialty && doctor.value === selectedDistrict).map(doctor => ({
                key: doctor.key,
                text: doctor.key,
                value: doctor.key, // Update value to doctor's key
                image: doctor.image
              }))}
            />
          )}
          <div style={{ alignItems: "center", textAlign: "center", justifyContent: "center" }}>
            <FormCheckbox
              label='I agree to the Terms and Conditions'
              checked={termsAgreed}
              onChange={(e, { checked }) => setTermsAgreed(checked)}
            />
            <Button disabled={disabled} style={{ width: "80%", alignSelf: "center", backgroundColor: "#219ebc", color: "white" }} type='submit'>Submit</Button>
          </div>
        </Form>
      </ModalContent>
    </Modal>
  )
}

export default AppointmentModal;
