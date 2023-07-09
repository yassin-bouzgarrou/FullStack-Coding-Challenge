import React, { createContext, useState, useContext } from 'react';

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavourite = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);
    if (isFavorite) {
    
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== item.id));
    } else {
  
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    }
  };

  return (
    <FavouriteContext.Provider value={{ favorites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};