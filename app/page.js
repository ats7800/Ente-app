"use client";
import { useState, useEffect } from "react";
import Backdrop from "./backdrop";
const MemeGallery = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMemeIndex, setSelectedMemeIndex] = useState(null);
  const [after, setAfter] = useState("");

  useEffect(() => {
    fetchMemes();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    const targetElement = document.querySelector(".load-more");
    observer.observe(targetElement);
    return () => {
      observer.unobserve(targetElement);
    };
  }, [memes]);

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchMoreMemes();
      }
    });
  }

  const fetchMoreMemes = async () => {
    const response = await fetch(
      `https://www.reddit.com/r/memes.json?after=${after}`
    );
    const data = await response.json();
    let newArr = memes.concat(data.data.children);
    setMemes(newArr);
    setAfter(data.data.after);
    console.log("memes.length: ", memes.length);
  };
  const fetchMemes = async () => {
    try {
      const response = await fetch("https://www.reddit.com/r/memes.json");
      const data = await response.json();
      setMemes(data.data.children.slice(1));
      setAfter(data.data.after);
      // console.log(data.data.children[0].data.preview.images[0].resolutions[1].url);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedMemeIndex(index);
  };

  const handleCloseBackdrop = () => {
    setSelectedMemeIndex(null);
  };
  const handleLeft = () => {
    setSelectedMemeIndex(selectedMemeIndex - 1);
  };
  const handleRight = () => {
    setSelectedMemeIndex(selectedMemeIndex + 1);
  };
  return (
    <div className="container">
      <h1>Meme Gallery</h1>
      <div className="gallery">
        {memes.map((meme, index) => (
          <div key={index} className="thumbnail-container">
            <img
              src={meme.data.url}
              alt={meme.data.title}
              onClick={() => handleThumbnailClick(memes.indexOf(meme))}
              className="thumbnail"
            />
          </div>
        ))}
      </div>
      {(selectedMemeIndex || selectedMemeIndex === 0) && (
        <Backdrop
          selectedMemeIndex={selectedMemeIndex}
          handleLeft={handleLeft}
          handleRight={handleRight}
          memes={memes}
          handleCloseBackdrop={handleCloseBackdrop}
        />
      )}
      <h4 className="load-more">loading...</h4>
    </div>
  );
};

export default MemeGallery;
