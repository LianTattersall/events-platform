import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export default function EventSlider({ events, parentWidth }) {
  const [currIndex, setCurrIndex] = useState(0);

  const timeRef = useRef(null);

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      goToNext();
    }, 3000);

    return () => clearTimeout(timeRef.current);
  }, [currIndex]);

  function getSlideStyles(index) {
    return {
      height: "100%",
      width: `${parentWidth}px`,

      backgroundPosition: "centre",
      backgroundSize: "cover",
      backgroundImage:
        events.length != 0 ? `url(${events[index].images.url})` : "",
    };
  }

  const sliderStyles = { height: "100%", position: "relative" };

  const labelStyle = {
    color: "white",
    fontSize: "15px",
    padding: "5px",
    fontWeight: "200",
    backgroundColor: "black",
    width: "fit-content",
  };

  const arrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0 , -60%)",
    color: "#fff",
    cursor: "pointer",
    zIndex: 1,
    fontSize: "30px",
  };

  const dotsContainer = {
    display: "flex",
    justifyContent: "center",
  };

  const dotStyle = {
    margin: "10px",
    fontSize: "10px",
    cursor: "pointer",
  };

  const slideContainerStyles = {
    display: "flex",
    height: "100%",
    transition: "transform ease-out 0.4s",
  };

  const overflowStyles = {
    height: "100%",
    overflow: "hidden",
  };

  function getContainerSlidesWithWidth() {
    return {
      ...slideContainerStyles,
      width: `${parentWidth * events.length}px`,
      transform: `translateX(${-(currIndex * parentWidth)}px)`,
    };
  }

  function goToPrevious() {
    setCurrIndex((curr) => (curr - 1) % 5);
  }

  function goToNext() {
    setCurrIndex((curr) => (curr + 1) % 5);
  }

  if (events.length != 0) {
    return (
      <div style={sliderStyles}>
        <div style={{ ...arrowStyles, right: "10px" }} onClick={goToNext}>
          ❯
        </div>
        <div style={{ ...arrowStyles, left: "10px" }} onClick={goToPrevious}>
          ❮
        </div>
        <div style={overflowStyles}>
          <div style={getContainerSlidesWithWidth()}>
            {events.map((event, index) => (
              <div key={index} style={getSlideStyles(index)}>
                <Link
                  to={`/externalEvent/${event.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <p style={labelStyle}>{event.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div style={dotsContainer}>
          {events.map((_, index) => {
            const color = currIndex == index ? "black" : "#d1d5d5";
            return (
              <div
                key={index}
                style={{
                  ...dotStyle,
                  color,
                }}
                onClick={() => {
                  setCurrIndex(index);
                }}
              >
                ⬤
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
