import React, { useState } from "react";

export const DataContext = React.createContext({});
export const DataProvider = (props: any) => {
    const [ globalArrayCities, setGlobalArrayCities ] = useState<any | undefined>([]);

    return(
        <DataContext.Provider value={{ globalArrayCities, setGlobalArrayCities }}>
            {props.children}
        </DataContext.Provider>
    );
}