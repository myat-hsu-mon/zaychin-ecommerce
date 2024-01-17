import React from 'react'
import HomeLayout from '../../../components/HomeLayout'
import { Container, Row, Col, ListGroup, Button, Modal } from 'react-bootstrap'

export default function FullStackDeveloperJobPage() {
  const [showModal, setShowModal] = React.useState(false)
  function hideModal() {
    setShowModal(false)
  }
  return (
    <HomeLayout>
      <div className='border-bottom py-3 mb-4'>
        <Container>
          <h6 className='mb-0'>Jobs</h6>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md={8}>
            <h2 className='en'>Full Stack Developer</h2>
            <p className='en'>
              We are actively looking for a Full Stack Developer to join our
              product development team's expansion.
            </p>

            <p className='en'>
              You will join our development team to deliver new features,
              improve existing ones, and maintain the old system. You will be a
              part of the evolution of our internal systems and processes.
              Ideally, you will be comfortable working on consumer-facing
              products as well as internal software and tools.
            </p>

            <p className='en'>
              We use Javascript primarily ReactJs, React Native, NodeJs, and
              Laravel (for the old system). As a full stack developer, you will
              working on developing and improving our app, frontend web, backend
              system and other internal tools such as Inventory Management and
              Fulfilment system.
            </p>

            <h4 className='en'>Requirements</h4>
            <ul className='en'>
              <li>
                At least 3 years of experience as a developer, writing
                Javascript
              </li>
              <li>Required experience building React based apps</li>
              <li>
                Required experience building server-side apps based on NodeJS
              </li>
              <li>Willing to learn new things</li>
            </ul>
            <h4 className='en'>Not required but a plus</h4>
            <ul className='en'>
              <li>PHP, Laravel</li>
              <li>E-commerce Experience</li>
              <li>Odoo, Python</li>
            </ul>
          </Col>
          <Col md={4}>
            {/* <h4 className='en'>Company</h4> */}
            <ListGroup>
              <ListGroup.Item>
                <small className='en text-uppercase'>Address</small>
                <p className='en mb-0'>
                  Building 15, 5th Aye Yeik Mon Street, Hlaing Township, Yangon
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <small className='en text-uppercase'>Office Hour</small>
                <p className='en mb-0'>Monday - Saturday (9:00AM to 5:00PM)</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='en'
                  block
                  size='lg'
                  onClick={() => setShowModal(true)}
                >
                  Apply
                </Button>
                <Modal show={showModal} onHide={hideModal}>
                  <Modal.Body>
                    <p className='en'>
                      Please send CV/Resume with your
                      <ul className='list-unstyled'>
                        <li>salary expectation,</li>
                        <li>previous experience / portfolio</li>
                        <li>anything related to this opportunity</li>
                      </ul>
                      to hein@zaychin.com
                    </p>
                  </Modal.Body>
                </Modal>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </HomeLayout>
  )
}
