import React, { createContext, useState , useContext} from 'react'

export const RiderDataContext = createContext()

// export const useRider = () =>{
//     const context = useContext(RiderContext);
//     if(!context){
//         throw new Error('useRider must be used within a RiderProvider');
//     }
//     return context
// }
const RiderContext = ({ children }) => {

  const [rider, setRider] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateRider = (riderData) =>{
     setRider(riderData);
  };

  const value = {
      rider,
      setRider,
      isLoading,
      setIsLoading,
      error,
      setError,
      updateRider
  };

  return (
    <RiderDataContext.Provider value={{value}}>
      {children}
    </RiderDataContext.Provider>
  )
}

export default RiderContext