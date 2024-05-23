import React from "react";
import Modal from "./Modal";

const Places = ({
  title,
  places,
  fallbackText,
  onSelectPlace,
  fetching,
  error,
}) => {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {error && <p className="fallback-text">{error}</p>}
      {fetching && (
        <p className="fallback-text">Fetching available places...</p>
      )}
      {!fetching && !error && places.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}
      {!error && places.length > 0 && (
        <ul className="places">
          {places.map((place) => {
            return (
              <li key={place.id} className="place-item">
                <button onClick={() => onSelectPlace(place)}>
                  <img
                    src={`http://localhost:3000/${place.image.src}`}
                    alt={place.image.alt}
                  />
                  <h3>{place.title}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Places;
