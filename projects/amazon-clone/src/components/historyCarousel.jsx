import React from "react";
import { useBrowsingHistory } from "./browserHistoryContext";


const HistoryCarousel = () => {
    const { browsingHistory } = useBrowsingHistory();

    return (
        <div>
            <h1>Your Browsing History</h1>
            <div id="history-container">
                {browsingHistory.map((image, index) => (
                    <img key={image.id} src={image.thumbnail} alt={`image-${index}`} />
                ))}
            </div>
    </div>
    )
}

export default HistoryCarousel;