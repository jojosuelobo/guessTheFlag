import { createContext, useState } from "react";

export interface IProvider {
    children?: JSX.Element
  }

export const GameContext = createContext({} as any);

export const Context = ({ children }: IProvider) => {

    const [username, setUsername] = useState<string>('');
    const [points, setPoints] = useState<number>(0)

    return (
        <GameContext.Provider value={{ username, setUsername, points, setPoints}}>
            {children}
        </GameContext.Provider>
    );
};