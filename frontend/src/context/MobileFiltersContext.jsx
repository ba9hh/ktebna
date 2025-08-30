import React, { useState, createContext } from "react";

const MobileFiltersContext = createContext();

const MobileFiltersProvider = ({ children }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <MobileFiltersContext.Provider
      value={{ mobileFiltersOpen, setMobileFiltersOpen }}
    >
      {children}
    </MobileFiltersContext.Provider>
  );
};

export { MobileFiltersProvider, MobileFiltersContext };
