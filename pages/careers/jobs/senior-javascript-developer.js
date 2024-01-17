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
            <h2 className='en'>Senior NodeJs Developer</h2>
            <p className='en'>
              We are actively looking for a senior nodejs developer to join
              our product development team's expansion.
            </p>

            <p className='en'>
              We use Javascript primarily ReactJs, React Native, NodeJs, and
              Laravel (for the old system). As a nodejs developer, you will
              working on developing and improving our backend
              system and other internal tools such as Inventory Management and
              Fulfilment system with NodeJs.
            </p>

            <h4 className='en'>Your qualifications include:</h4>
            <ul className='en'>
              <li>NodeJs (NestJS)</li>
              <li>API</li>
              <li>MySQL</li>
              <li>MongoDB</li>
              <li>Unit Testing</li>
              <li>Git</li>
              <li>
                5+ years of experience as freelancer or full-time employee
              </li>
              <li>
                You were at least once responsible for a medium/large scale
                backend application
              </li>
              <li>
                You can work on your own, but you love to share your knowledge
                and work with the team
              </li>
              <li>
                Willing to learn new things and keeping up with the industry
              </li>
            </ul>
            <h4 className='en'>
              Not required but plus if you have these knowledges
            </h4>
            <ul className='en'>
              <li>PHP (Laravel)</li>
              <li>Socket.io</li>
              <li>Typescript</li>
              <li>ReactJs</li>
              <li>E-commerce Experience</li>
            </ul>
            <h4 className='en'>Your responsibilities will include:</h4>
            <ul className='en'>
              <li>Develop and improve our application</li>
              <li>Help fix issues with the application</li>
              <li>Mentor junior developers</li>
            </ul>
            <h4 className='en'>Why join?</h4>
            <ul className='en'>
              <li>
                Incredible chance to develop large-scale backend application
                from scratch
              </li>
              <li>
                See a direct impact of your work and value you created for
                customers and internal staffs
              </li>
              <li>Provide direct input on technical decisions</li>
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
