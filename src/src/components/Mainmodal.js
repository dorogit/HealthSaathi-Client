import React from "react";
import {
  Button,
  Grid,
  Modal,
  ModalActions,
  ModalContent,
  GridRow, 
  GridColumn, 
  CardHeader,
  CardContent,
  Card,
  Image,
  ModalHeader
} from 'semantic-ui-react'
import AppointmentModal from "./AppointmentModal";
import ConsultancyModal from "./ConsultancyModal";
import AdmitModal from "./AdmitModal";
import EmergencyModal from "./EmergencyModal";

const MainModal = ({ 
    doctorList, 
    open, 
    setOpen, 
    secondOpen, 
    setSecondOpen, 
    thirdOpen, 
    setThirdOpen, 
    fourthOpen, 
    setFourthOpen,
    fifthOpen,
    setFifthOpen
  }) => {

    const fontSize = window.innerWidth > 768 ? '' : '10px'; // Adjust font size based on screen width

    return (
      <Modal
        onClose={() => setOpen(false)}
        closeOnEscape
        dimmer={'blurring'}
        open={open}
        header='How can we help you?'
        content='Please select one of the following'
      >
        <ModalHeader style={{ textAlign: "center" }}>How can we help you?</ModalHeader>
        {window.innerWidth > 768 ? 
        <ModalContent>
          <Grid verticalAlign='middle' columns={4} centered>
            <GridRow ridRow>
              <GridColumn>
                <Button onClick={() => setFifthOpen(true)} as={Card}>
                  <Image src={require('../assets/asset1.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Emergency</CardHeader>
                    {/* Emergency Modal */}
                    <EmergencyModal fifthOpen={fifthOpen} setFifthOpen={setFifthOpen} />
                  </CardContent>
                </Button>
              </GridColumn>
              <GridColumn>
                <Button onClick={() => setSecondOpen(true)} as={Card}>
                  <Image src={require('../assets/asset2.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Book Appointment</CardHeader>
                    {/* Appointment Modal */}
                    <AppointmentModal secondOpen={secondOpen} setSecondOpen={setSecondOpen} doctorList={doctorList} />
                  </CardContent>
                </Button>
                <Button onClick={() => setThirdOpen(true)} as={Card}>
                  <Image src={require('../assets/asset3.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Consultancy</CardHeader>
                    {/* Consultancy Modal */}
                    <ConsultancyModal thirdOpen={thirdOpen} setThirdOpen={setThirdOpen} doctorList={doctorList} />
                  </CardContent>
                </Button>
              </GridColumn>
              <GridColumn>
                <Button onClick={() => setFourthOpen(true)} as={Card}>
                  <Image src={require('../assets/asset4.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Admit</CardHeader>
                    {/* Admission Modal */}
                    <AdmitModal fourthOpen={fourthOpen} setFourthOpen={setFourthOpen} doctorList={doctorList} />
                  </CardContent>
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </ModalContent> 
        : 
        <ModalContent>
          <Grid verticalAlign='middle' columns={4} centered>
            <GridRow ridRow>
              <GridColumn>
                <Button onClick={() => setFifthOpen(true)} as={Card}>
                  <Image src={require('../assets/asset1.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Emergency</CardHeader>
                    {/* Emergency Modal */}
                    <EmergencyModal fifthOpen={fifthOpen} setFifthOpen={setFifthOpen} />
                  </CardContent>
                </Button>
              </GridColumn>
              <GridColumn>
                <Button onClick={() => setSecondOpen(true)} as={Card}>
                  <Image src={require('../assets/asset2.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Appointment</CardHeader>
                    {/* Appointment Modal */}
                    <AppointmentModal secondOpen={secondOpen} setSecondOpen={setSecondOpen} doctorList={doctorList} />
                  </CardContent>
                </Button>
              </GridColumn>
              <GridColumn>
              <Button onClick={() => setThirdOpen(true)} as={Card}>
                  <Image src={require('../assets/asset3.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Consultancy</CardHeader>
                    {/* Consultancy Modal */}
                    <ConsultancyModal thirdOpen={thirdOpen} setThirdOpen={setThirdOpen} doctorList={doctorList} />
                  </CardContent>
                </Button>
              </GridColumn>
              <GridColumn>
                <Button onClick={() => setFourthOpen(true)} as={Card}>
                  <Image src={require('../assets/asset4.jpg')} wrapped ui={false} />
                  <CardContent>
                    <CardHeader style={{ fontSize }}>Admit</CardHeader>
                    {/* Admission Modal */}
                    <AdmitModal fourthOpen={fourthOpen} setFourthOpen={setFourthOpen} doctorList={doctorList} />
                  </CardContent>
                </Button>
              </GridColumn>
            </GridRow>
          </Grid>
        </ModalContent>
        }
        <ModalActions>
          <Button
            content="Nevermind"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </ModalActions>
      </Modal>
    );
};


export default MainModal;