import { createContext, useContext, useState } from "react";

const HotelContext = createContext<any>(null);

export function HotelProvider({ children }: any) {
    const [selectedRoom, setSelectedRoom] = useState(null);

    return (
        <HotelContext.Provider value={{ selectedRoom, setSelectedRoom }}>
            {children}
        </HotelContext.Provider>
    );
}


export function useHotel() {
    const context = useContext(HotelContext);

    if (!context) {
        throw new Error("useHotel must be used within a HotelProvider");
    }

    return context;
}