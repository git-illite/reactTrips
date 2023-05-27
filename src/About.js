import React from 'react'
import Card from 'react-bootstrap/Card'

export default function About() {
  return (
      <>
    <Card className="About">
        <Card.Header>
            <h1>About</h1>
            <p>All about me - the developer</p>
        </Card.Header>
    <Card.Body style={{position:'left'}}>
        <Card.Text>
        My name is Abdalla Aden and I am student at Seneca College in the Computer Programming and Analysis course. This is  React Web App for my Web422 class
        </Card.Text>
    </Card.Body>
    </Card>
    </>
  );
}
