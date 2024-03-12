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
} from 'semantic-ui-react'
import MainModal from '../components/Mainmodal'
import axios from 'axios'

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const HomepageHeading = ({ mobile }) => {
  const [open, setOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const [thirdOpen, setThirdOpen] = useState(false)
  const [fourthOpen, setFourthOpen] = useState(false)
  const [fifthOpen, setFifthOpen] = useState(false)
  const [newData, setNewData] = useState(false)

  const doctorList = [
    {
      key: 'Jenny Hess',
      text: 'Jenny Hess',
      value: 'Jenny Hess',
      image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: 'Elliot Fu',
      text: 'Elliot Fu',
      value: 'Elliot Fu',
      image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
      key: 'Stevie Feliciano',
      text: 'Stevie Feliciano',
      value: 'Stevie Feliciano',
      image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
    {
      key: 'Christian',
      text: 'Christian',
      value: 'Christian',
      image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
    },
    {
      key: 'Matt',
      text: 'Matt',
      value: 'Matt',
      image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
    },
    {
      key: 'Justen Kitsune',
      text: 'Justen Kitsune',
      value: 'Justen Kitsune',
      image: { avatar: true, src: '../assets/docIcon.jpg' },
    },
  ]

  useEffect(() => {
    axios.get('http://localhost:3000/doctors')
      .then(response => {
        console.log(response)
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

const DesktopContainer = ({ children }) => {
  const [fixed, setFixed] = useState(false);

  const toggleFixedMenu = (inView) => setFixed(!inView);

  return (
    <Media greaterThan='mobile'>
      <InView onChange={toggleFixedMenu}>
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
              <Menu.Item as='a'>Help</Menu.Item>
              <Menu.Item as='a'>Our Doctors</Menu.Item>
              <Menu.Item as='a'>Contact Us</Menu.Item>
              <Menu.Item position='right'>
                <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                  Register
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
          
        </Segment>
      </InView>

      {children}
    </Media>
  );
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const MobileContainer = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  const handleSidebarHide = () => setSidebarOpened(false);
  const handleToggle = () => setSidebarOpened(true);

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
          <Menu.Item as='a'>Help</Menu.Item>
          <Menu.Item as='a'>Our Doctors</Menu.Item>
          <Menu.Item as='a'>Contact Us</Menu.Item>
          <Menu.Item as='a'>Register</Menu.Item>
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
                  <Button as='a' inverted>
                    Register
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile/>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  );
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <MediaContextProvider>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Homepage = () => {

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
            <h3 style={{color:"#219ebc"}}>Our Vision</h3>
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
              <Grid.Column width={3}>
                <Header inverted as='h4' content='About' />
                <List link inverted>
                  <List.Item as='a'>Contact Us</List.Item>
                  <List.Item as='a'>Our Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as='h4' content='Services' />
                <List link inverted>
                  <List.Item as='a'>DNA FAQ</List.Item>
                  <List.Item as='a'>How To Access</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
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
    </ResponsiveContainer>
  )
}

export default Homepage
