import React, { createContext, useContext, useState, useEffect } from "react";
const MyListContext = createContext();

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState(() => {
    const stored = localStorage.getItem("myList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  // Helper function
  const isInList = (movie) => myList.some((m) => m.id === movie.id);

  return (
    <MyListContext.Provider value={{ myList, setMyList, isInList }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  return useContext(MyListContext);
}
