import React from "react";
import { useBrowsingHistory } from "./browserHistoryContext";
import { useCarousel } from "./useCarousel";
import { Link } from "react-router-dom";


const HistoryCarousel = () => {
    const { browsingHistory } = useBrowsingHistory();
    const { currentIndex, nextSlide, prevSlide, isFirstSlide, isLastSlide} = useCarousel({items: browsingHistory, itemsToShow: 3});

    if (browsingHistory.length === 0) {
        return (
            <div>
                <h2>Your Browsing History</h2>
                <p>No Browsing history yet</p>
            </div>
        )
    }

    return (
        <div id="bottom-history">
            <h4>Your Browsing History</h4>
            <div id="bottom-history-container">
                <div id="bottom-history-wrapper" style={{ transform: `translateX(-${currentIndex * 170}px)`, transition: 'transform .3s ease'}}>
                    {browsingHistory.map((image, index) => (
                    <Link to={`/product/${image.id}`} className="history-item" key={index}>
                        <img src={image.thumbnail} alt={`image-${index}`} />
                    </Link>
                    ))}
                </div>

                {browsingHistory.length > 3 && (
                    <>
                        <button onClick={prevSlide} disabled={isFirstSlide} id="previous">&lt;</button>
                        <button onClick={nextSlide} disabled={isLastSlide} id="next">&gt;</button>
                    </>
                )}
            </div>
    </div>
    )
}

export default HistoryCarousel;