import React from 'react'
import './Bootstrap.css'
//Before writing the import below, we install the react-bootstrap package with 'npm install react-bootstrap'
import { Carousel } from 'react-bootstrap'

//import images for our Carousel
import image from '../../images/background.jpg'
import image2 from '../../images/background2.jpg'
import image3 from '../../images/background3.jpg'

export default function Bootstrap() {
  return (
    <section className='bootstrap'>
        <main>
            <Carousel controls={false} fade>
                <Carousel.Item>
                    {/* image and .Caption are placed inside the .Item */}
                    <img src={image} alt='First Slide' className='d-block w-100' />
                    <Carousel.Caption>
                        <h3>First Slide</h3>
                        <p>This is an example caption</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* image and .Caption are placed inside the .Item */}
                    <img src={image2} alt='Second Slide' className='d-block w-100' />
                    <Carousel.Caption>
                        <h3>Second Slide</h3>
                        <p>This is an example caption</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    {/* image and .Caption are placed inside the .Item */}
                    <img src={image3} alt='Third Slide' className='d-block w-100' />
                    <Carousel.Caption>
                        <h3>Third Slide</h3>
                        <p>This is an example caption</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </main>
    </section>
  )
}
