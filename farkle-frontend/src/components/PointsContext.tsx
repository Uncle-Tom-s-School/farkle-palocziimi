import { createContext, useContext, useState } from "react";

interface PointsContextType {
    points: number[];
    setPoints: React.Dispatch<React.SetStateAction<number[]>>;
}

export const PointsContext = createContext<PointsContextType | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    //p1Selected, p2Selected, p1Round, p2Round, p1Total, p2Total
    const [points, setPoints] = useState<number[]>(Array(6).fill(0));

    return (
        <PointsContext.Provider value={{ points, setPoints }}>
            {children}
        </PointsContext.Provider>
    );
};

export const usePoints = () => {
    const context = useContext(PointsContext);
    if (!context) {
        throw new Error("usePoints must be used within a PointsProvider");
    }
    return context;
};

