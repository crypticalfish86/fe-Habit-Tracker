import React, { createContext, useState } from 'react';

interface UserContextProps {
    user: string;
    user_id: number;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    setUser_id: React.Dispatch<React.SetStateAction<number>>;
}

export const UserContext = createContext<UserContextProps>({
    user: '',
    setUser: () => {},
    user_id: 0,
    setUser_id: () => {},
})

export const UserProvider = (props: React.PropsWithChildren<{}>) => {
    const [ user, setUser ] = useState<string>('');
    const [ user_id, setUser_id ] = useState<number>(0);

    return (
        <UserContext.Provider value={{ user, setUser, user_id, setUser_id }}>
            {props.children}
        </UserContext.Provider>
    )
}