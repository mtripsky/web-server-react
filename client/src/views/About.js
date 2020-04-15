import React from 'react';
import { Card } from 'react-bootstrap';

const About = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>About</h1>

      <Card className='flex-row' bg='Dark'>
        <Card.Header style={{ width: '50%' }}>Header</Card.Header>
        <Card.Body>
          Body
          <Card.Title>Title</Card.Title>
          <Card.Text>Text</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;

{
  /* <div class="card flex-sm-row">
  <div class="card-body">
    <h4 class="card-title">Right image</h4>
    <p class="card-text">Example text</p>
  </div><img class="card-img-bottom card-img-sm-right" src="/postboot/assets/img/thumbnail.jpg"/>
</div> */
}
