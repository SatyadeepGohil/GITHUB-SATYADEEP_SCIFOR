import { useState } from "react";

export const useCarousel = ({ items, itemsToShow }) => {

    const validItems = Array.isArray(items) ? items : [];
    const vaildItemsToShow = Number(itemsToShow) || 1;

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = validItems.length - vaildItemsToShow;
            const nextIndex = prevIndex + 1;
            return nextIndex <= maxIndex ? nextIndex : prevIndex;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex - 1;
            return nextIndex < 0 ? 0 : nextIndex;
        });
    };

    return {
        currentIndex,
        nextSlide,
        prevSlide,
        isFirstSlide: currentIndex === 0,
        isLastSlide: currentIndex >= validItems.length - vaildItemsToShow,
    };
};