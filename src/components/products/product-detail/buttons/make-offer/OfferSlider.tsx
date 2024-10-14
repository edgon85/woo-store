'use client'
import React, { useState, useEffect } from 'react';

type Props = {
  productPrice: number;
  onOfferChange: (price: number) => void;
};

const OfferSlider = ({ productPrice, onOfferChange }: Props) => {
  const minPrice = Math.ceil(productPrice * 0.7);
  const maxPrice = productPrice;
  const step = 5;
  const midPoint = (maxPrice + minPrice) / 2;

  const [offerPrice, setOfferPrice] = useState(maxPrice);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    onOfferChange(offerPrice);
  }, [offerPrice, onOfferChange]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setOfferPrice(Number(e.target.value));
    if (newValue !== maxPrice && !hasInteracted) {
      setHasInteracted(true);
    }
  };

  const trackFillPercentage = ((offerPrice - minPrice) * 100) / (maxPrice - minPrice);

  const getMessage = () => {
    if (!hasInteracted) {
      return null;
    }
    if (offerPrice > midPoint) {
      return `Una buena oferta está entre Q${midPoint}-Q${maxPrice}`;
    } else if (offerPrice === minPrice) {
      return `la oferta mínima que puedes hacer es de Q${minPrice}`;
    } else {
      return `Si haces una buena oferta a partir de Q${Math.ceil(
        midPoint
      )} ¡tendrás más posibilidades de que sea aceptada!`;
    }
  };

  return (
    <div className="py-4">
      <div className="flex flex-col">
        <span className="self-center">
          ¿Te encantó? ¡Adquiéralo ya antes de que se agote!
        </span>
        {/* <h2 className="text-2xl font-bold mb-4">Haz una oferta:</h2> */}
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500">Min: Q{minPrice}</span>
        <span className="text-3xl font-bold text-green-500">Q{offerPrice}</span>
        <span className="text-gray-500">Max: Q{maxPrice}</span>
      </div>
      <input
        type="range"
        min={minPrice}
        max={maxPrice}
        step={step}
        value={offerPrice}
        onChange={handleSliderChange}
        className="slider-thumb slider-track w-full"
        style={{ ['--track-fill' as string]: `${trackFillPercentage}%` }}
      />
      <p className="text-center mt-4 text-gray-600">{getMessage()}</p>
    </div>
  );
};

export default OfferSlider;
