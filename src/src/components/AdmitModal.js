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
  TextArea,
  ModalDescription,
  ModalActions
} from 'semantic-ui-react'
import handleSubmission from "./Submit";

const AdmitModal = ({ fourthOpen, setFourthOpen, doctorList }) => {
  const options = [
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [grievance, setGrievance] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [disabled, setDisabled] = useState(true); // Initially disabled
  const [doctorOptions, setDoctorOptions] = useState([]);

  // Function to check if all fields have some input
  const areAllFieldsFilled = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      age.trim() !== "" &&
      gender !== "" &&
      grievance.trim() !== "" &&
      selectedDoctor !== null &&
      termsAgreed
    );
  };
  const [submitOpen, setSubmitOpen] = useState(false)


  // Effect to enable/disable button based on form completion
  useEffect(() => {
    setDisabled(!areAllFieldsFilled());
  }, [firstName, lastName, age, gender, grievance, selectedDoctor, termsAgreed]);

  useEffect(() => {
    // Extract unique text values from doctorList
    const uniqueDoctors = doctorList.reduce((acc, current) => {
      if (!acc.some(item => item.text === current.text)) {
        acc.push(current);
      }
      return acc;
    }, []);

    setDoctorOptions(uniqueDoctors);
  }, [doctorList]);

  const handleSubmit = () => {
    handleSubmission({
      "firsName":firstName,
      "lastName":lastName,
      "Phone":age,
      "gender":gender,
      "grievance":grievance,
      "specialityReq":selectedDoctor
    })
    setSubmitOpen(true)
  };

  return (
    <Modal
      onClose={() => setFourthOpen(false)}
      closeOnEscape
      dimmer='blurring'
      open={fourthOpen}
      header='Book an appointment'
      content='Please fill the following'
    >
      <ModalHeader style={{textAlign:"center"}}>Get Admitted</ModalHeader>
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
              label='Your Phone'
              placeholder='Your Phone'
              value={age}
              onChange={(e, { value }) => setAge(value)}
            />
            <Dropdown
              style={{ marginTop: 25, marginBottom: 25, flex: 1 }}
              placeholder='Select Gender'
              fluid
              selection
              options={options}
              value={gender}
              onChange={(e, { value }) => setGender(value)}
            />
          </FormGroup>
          <h3>Please describe your grievance</h3>
          <TextArea
            label='Please explain your grievance'
            value={grievance}
            onChange={(e, { value }) => setGrievance(value)}
          />
          <FormGroup>
            <Dropdown
              style={{ marginTop: 25, marginBottom: 25 }}
              placeholder='Required Consultancy'
              fluid
              selection
              options={doctorOptions}
              value={selectedDoctor}
              onChange={(e, { value }) => setSelectedDoctor(value)}
            />
          </FormGroup>
          <div style={{ alignItems: "center", textAlign: "center", justifyContent: "center" }}>
            <FormCheckbox
              label='I agree to the Terms and Conditions'
              checked={termsAgreed}
              onChange={(e, { checked }) => setTermsAgreed(checked)}
            />
            <Button disabled={disabled} style={{ width: "80%", alignSelf: "center", backgroundColor: "#219ebc", color: "white" }} type='submit'>Submit</Button>
          </div>
        </Form>
        <Modal
          centered={false}
          open={submitOpen}
          onClose={() => setSubmitOpen(false)}
          onOpen={() => setSubmitOpen(true)}
        >
          <ModalHeader>Thank you!</ModalHeader>
          <ModalContent>
            <ModalDescription>
              Your form has been submitted. Our team and doctors will reach out very soon!
            </ModalDescription>
          </ModalContent>
          <ModalActions>
            <Button onClick={() => setSubmitOpen(false)}>OK</Button>
          </ModalActions>
        </Modal>
      </ModalContent>
    </Modal>
  )
}

export default AdmitModal;
