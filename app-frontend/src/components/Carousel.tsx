import {Carousel} from "react-bootstrap";
import "../css/carousel.css";
export const CarouselBS = () => {
    return (
        <div>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="src/assets/battery.jpg"
                    alt="First slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="src/assets/pv.jpg"
                    alt="Second slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="src/assets/smart.jpg"
                    alt="Third slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="src/assets/grid.jpg"
                    alt="Third slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="src/assets/city.jpg"
                    alt="Third slide"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
            </Carousel.Item>
        </Carousel>
        </div>
    )
}
