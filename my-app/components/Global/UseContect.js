import { createContext, useState } from "react"

const MoviesCards = createContext();

const MovieContext = ({ children }) => {

    return (
        <MoviesCards.Provider >
            {children}
        </MoviesCards.Provider>
    )
}

export { MoviesCards, MovieContext };