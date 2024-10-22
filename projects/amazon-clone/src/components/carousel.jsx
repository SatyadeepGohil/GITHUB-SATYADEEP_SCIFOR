import React, { useState, useEffect } from "react";

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/images/carousel-img-1.jpg",
        "/images/carousel-img-2.jpg",
        "/images/carousel-img-3.jpg",
        "/images/carousel-img-4.jpg",
        "/images/carousel-img-5.jpg",
        "/images/carousel-img-6.png",
        "/images/carousel-img-7.jpg"
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, 10000)

        return () => clearTimeout(timer)
    }, [currentIndex]);

    return (
       <div id="carousel-wrapper">
             <div id="hero-carousel">
                <button onClick={prevSlide} id="carousel-previous">&lt;</button>
                <button onClick={nextSlide} id="carousel-next">&gt;</button>
                <img id="carousel-img" src={images[currentIndex]} alt={`Slide ${currentIndex}`}/>
            </div>
       </div>
    )
}

export default Carousel;