import React, { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./Slider.css";

const Slider = ({ slidesData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const slideListRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay, slidesData]);

  useEffect(() => {
    const slideList = slideListRef.current;
    const handleTransitionEnd = () => {
      if (currentSlide === slidesData.length) {
        setCurrentSlide(0);
        slideList.style.transition = "none";
        slideList.style.transform = `translateX(0px)`;
      } else if (currentSlide === -1) {
        setCurrentSlide(slidesData.length - 1);
        slideList.style.transition = "none";
        slideList.style.transform = `translateX(-${(slidesData.length - 1) * 100}%)`;
      } else {
        slideList.style.transition = "transform .5s";
        slideList.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    };

    slideList.addEventListener("transitionend", handleTransitionEnd);
    return () => slideList.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentSlide, slidesData]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleControlClick = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setCurrentX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    setCurrentX(event.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const move = startX - currentX;
    if (move > 100) {
      nextSlide();
    } else if (move < -100) {
      previousSlide();
    } else {
      setCurrentSlide(currentSlide);
    }
  };

  const handleTouchStart = (event) => {
    setIsDragging(true);
    setStartX(event.touches[0].clientX);
    setCurrentX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    setCurrentX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const move = startX - currentX;
    if (move > 100) {
      nextSlide();
    } else if (move < -100) {
      previousSlide();
    } else {
      setCurrentSlide(currentSlide);
    }
  };

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      }, 3000);
    }
  };

  return (
    <div className="wrapper">
      <div
        className="slide-wrapper"
        data-slide="wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="slide-nav-button slide-nav-previous fas fa-chevron-left" onClick={previousSlide}></button>
        <button className="slide-nav-button slide-nav-next fas fa-chevron-right" onClick={nextSlide}></button>
        <div
          className="slide-list"
          ref={slideListRef}
          data-slide="list"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slidesData.map((slide, index) => (
            <div className="slide-item" data-slide="item" key={index}>
              <div className="slide-content">
                <img className="slide-image" src={slide.src} alt={slide.alt} />
                <div className="slide-description">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="slide-controls" data-slide="controls-wrapper">
          {slidesData.map((_, index) => (
            <button
              key={index}
              className={`slide-control-button fas fa-circle ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleControlClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
