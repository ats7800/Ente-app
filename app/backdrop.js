import React, { useEffect } from "react";

const Backdrop = (props) => {
  let {
    selectedMemeIndex,
    handleCloseBackdrop,
    memes,
    handleLeft,
    handleRight,
  } = props;
  let selectedMeme = memes[selectedMemeIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedMemeIndex < memes.length - 1 && event.key == "ArrowRight") {
        handleRight();
      } else if (selectedMemeIndex > 0 && event.key == "ArrowLeft") {
        handleLeft();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleLeft, handleRight]);

  return (
    <>
      <div className="backdrop" onClick={handleCloseBackdrop}></div>
      <div className="selected-meme">
        <img
          src={selectedMeme.data.url}
          alt={selectedMeme.data.title}
          className="meme-image"
        />
        <h2 className="selected-meme-title">{selectedMeme.data.title}</h2>
        {selectedMemeIndex > 0 && (
          <div className="left-meme" onClick={handleLeft}>
            &lt;
          </div>
        )}
        {selectedMemeIndex < memes.length - 1 && (
          <div className="right-meme" onClick={handleRight}>
            &gt;
          </div>
        )}
      </div>
    </>
  );
};

export default Backdrop;
