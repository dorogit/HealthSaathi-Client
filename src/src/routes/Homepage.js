import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  List,
  Menu,
  Segment,
  Sidebar,
  Icon,
  MenuItem,
  SidebarPushable,
  SidebarPusher,
  Accordion,
  TransitionGroup,
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions
} from 'semantic-ui-react'
import MainModal from '../components/Mainmodal'
import axios from 'axios'
import FloatingChatbot from '../components/FloatingChatbot'; // Import the FloatingChatbot component

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})


const HomepageHeading = ({ mobile, doctorList }) => {
  const [open, setOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const [thirdOpen, setThirdOpen] = useState(false)
  const [fourthOpen, setFourthOpen] = useState(false)
  const [fifthOpen, setFifthOpen] = useState(false)
  const [newData, setNewData] = useState(false)


  useEffect(() => {
    axios.get('https://healthsaathi-backend.vercel.app/doctors')
      .then(response => {
        // Transform response data to match the doctorList structure
        console.log(response)
        const transformedData = response.data.map(doctor => ({
          key: doctor.Name,
          text: doctor.Speciality,
          value: doctor.District,
          location:doctor.Location,
          image: { avatar: true, src: require('../assets/docIcon.jpg') }, // Assuming the image link is static
          // Add additional properties here if needed (Specialty, District, Location, etc.)
        }));
  
        console.log('All doctors:', transformedData);
        setNewData(transformedData)
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  return (
    <Container text>
      <Header
        as='h1'
        content='HealthSaathi!'
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Get medical attention at a moments notice'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1em',
        }}
      />
      <Button onClick={() => setOpen(true)} primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
      <MainModal 
        doctorList={newData} 
        open={open} 
        setOpen={setOpen} 
        secondOpen={secondOpen} 
        setSecondOpen={setSecondOpen} 
        thirdOpen={thirdOpen}
        setThirdOpen={setThirdOpen}
        fourthOpen={fourthOpen}
        setFourthOpen={setFourthOpen}
        fifthOpen={fifthOpen}
        setFifthOpen={setFifthOpen}
      />
    </Container>
  )
}

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

const DesktopContainer = ({ children, sidebarOpened,setSidebarOpened ,doctorList }) => {
  const [fixed, setFixed] = useState(false);
  const handleSidebarHide = () => setSidebarOpened(false);

  const [doctorModal, setDoctorModal] = useState(false)

  const toggleFixedMenu = (inView) => setFixed(!inView);

  return (
    <Media as={Sidebar.Pushable} greaterThan='mobile'>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          width='very wide'
          animation='push'
          direction='right'
          inverted
          onHide={handleSidebarHide} // Close the sidebar when clicking outside the menu
          vertical
          visible={sidebarOpened}
        >
          {/*script here*/}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  Home
                </Menu.Item>
                <Menu.Item as='a' onClick={() => window.scrollTo({top: document.documentElement.scrollHeight,behavior: 'smooth'})}>Help</Menu.Item>
                <Menu.Item onClick={() => setDoctorModal(true)} as='a'>Our Doctors</Menu.Item>
                <Menu.Item position='right'>
                  <Button href="mailto:healthsaathi27@gmail.com" as='a'  inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    Contact Us
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
          <Modal
  open={doctorModal}
  onClose={() => setDoctorModal(false)}
  onOpen={() => setDoctorModal(true)}
>
  <Modal.Header>Our Doctors</Modal.Header>
  <Modal.Content scrolling>
    <Modal.Description>
      <Grid style={{marginLeft:60}} textAlign='center' columns={3} stackable>
        {doctorList.map(doctor => (
          <Grid.Column key={doctor.key}>
              <div style={{flexDirection:"row", display:"flex",}}>
                <img height={60} width={50} src={doctor.image.src} alt={doctor.key} />
                <div></div>
                <Header.Content>
                {doctor.key}
                <Header.Subheader>{doctor.value}</Header.Subheader>
                <Header.Subheader>{doctor.text}</Header.Subheader>
              </Header.Content>
              </div>
          </Grid.Column>
        ))}
      </Grid>
    </Modal.Description>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={() => setDoctorModal(false)}>Close</Button>
  </Modal.Actions>
</Modal>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
};

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MobileContainer = ({ children ,doctorList }) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);
  const [fixed, setFixed] = useState(false);

  const [doctorModal, setDoctorModal] = useState(false)

  const toggleFixedMenu = (inView) => setFixed(!inView);


  return (
    <Media as={Sidebar.Pushable} at='mobile'>
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation='overlay'
          inverted
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as='a' active>
            Home
          </Menu.Item>
          <Menu.Item onClick={() => setDoctorModal(true)} as='a'>Our Doctors</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 350, padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button href="mailto:healthsaathi27@gmail.com" as='a' inverted style={{ marginLeft: '0.5em' }}>
                    Contact Us
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile/>
          </Segment>
          <Modal
  open={doctorModal}
  onClose={() => setDoctorModal(false)}
  onOpen={() => setDoctorModal(true)}
>
  <Modal.Header>Our Doctors</Modal.Header>
  <Modal.Content scrolling>
    <Modal.Description>
      <Grid style={{marginLeft:60}} textAlign='center' columns={3} stackable>
        {doctorList.map(doctor => (
          <Grid.Column key={doctor.key}>
              <div style={{flexDirection:"row", display:"flex",}}>
                <img height={60} width={50} src={doctor.image.src} alt={doctor.key} />
                <div></div>
                <Header.Content>
                {doctor.key}
                <Header.Subheader>{doctor.value}</Header.Subheader>
                <Header.Subheader>{doctor.text}</Header.Subheader>
              </Header.Content>
              </div>
          </Grid.Column>
        ))}
      </Grid>
    </Modal.Description>
  </Modal.Content>
  <Modal.Actions>
    <Button onClick={() => setDoctorModal(false)}>Close</Button>
  </Modal.Actions>
</Modal>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [doctorList, setDoctorList] = useState([]); // Add state for doctorList

  const handleToggle = () => {
    if (sidebarOpened == true) {
      setSidebarOpened(false)
    } else {
      setSidebarOpened(true)
    }
  };

  // Fetch doctorList data and update state
  useEffect(() => {
    axios.get('https://healthsaathi-backend.vercel.app/doctors')
      .then(response => {
        const transformedData = response.data.map(doctor => ({
          key: doctor.Name,
          text: doctor.Speciality,
          value: doctor.District,
          location: doctor.Location,
          image: { avatar: true, src: require('../assets/docIcon.jpg') },
        }));
        setDoctorList(transformedData);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  return (
    <MediaContextProvider>
      <DesktopContainer
        setSidebarOpened={setSidebarOpened}
        sidebarOpened={sidebarOpened}
        handleToggle={handleToggle}
        doctorList={doctorList} // Pass doctorList as prop to DesktopContainer
      >
        {children}
      </DesktopContainer>
      <MobileContainer 
      setSidebarOpened={setSidebarOpened}
      sidebarOpened={sidebarOpened}
      handleToggle={handleToggle}
      doctorList={doctorList} // Pass doctorList as prop to DesktopContainer
      >{children}</MobileContainer>
    </MediaContextProvider>
  );
};


ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Homepage = () => {
  const [showChatbox, setShowChatbox] = useState(false);

  const handleFloatingButtonClick = () => {
    setShowChatbox(true);
  };

  const handleChatboxClose = () => {
    setShowChatbox(false);
  };

  const panels = [
    {
      key: 'what-is-dog',
      title: 'What is HealthSaathi?',
      content: [
        'HealthSaathi is a healthcare platform designed by a small team with a big ambition. It aims to provide ease of access in terms of healthcare.',
      ].join(' '),
    },
    {
      key: 'kinds-of-dogs',
      title: 'How can I contact a doctor?',
      content: [
        'Please click on the Get Started button and proceed as per your liking!',
      ].join(' '),
    },
    {
      key: 'teamcontact',
      title: 'How can I contact HealthSaathi team?',
      content:[
        'Feel free to mail us at healthsaathi27@gmail.com so we can hear what you have to say!',
      ].join(' '),
    },
  ]

  return (
    <ResponsiveContainer>
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em', textAlign: "center" }}>
            Helping Patients, one at a time
          </Header>
          <p style={{ fontSize: '1.33em', textAlign: "center" }}>
            HealthSaathi is a revolutionary platform designed to seamlessly connect patients with healthcare providers,
            ensuring swift and efficient access to medical assistance. Through HealthSaathi,
            individuals can easily schedule appointments, seek medical advice, and access a wide network of qualified doctors and specialists.
          </p>

          <Divider
            as='h4'
            className='header'
            horizontal
            style={{ margin: '3em 0em', textTransform: 'uppercase' }}
          >
            <h3 style={{ color: "#219ebc" }}>Our Vision</h3>
          </Divider>

          <Header as='h3' style={{ fontSize: '2em', textAlign: "center" }}>
            Convenience at a moments notice
          </Header>
          <p style={{ fontSize: '1.33em', textAlign: "center" }}>
            By leveraging cutting-edge technology, HealthSaathi simplifies the healthcare journey, empowering patients to take
            control of their well-being with ease and convenience. Whether it's booking an appointment with a preferred physician or seeking urgent medical assistance,
            HealthSaathi is committed to providing a hassle-free experience, making healthcare more accessible and responsive to the needs of every individual.
          </p>
        </Container>
      </Segment>

      <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={2}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Our Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
              <Header inverted as='h4' content='FAQs' />
                <Accordion inverted defaultActiveIndex={0} panels={panels} />
              </Grid.Column>
              <Grid.Column width={4}>
                <Header as='h4' inverted>
                  HealthSaathi
                </Header>
                <p>
                  Made as a hackathon project in SGT CodeSangam 24'
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
      {/* Chatbox */}
    </ResponsiveContainer>
  );
};

export default Homepage
