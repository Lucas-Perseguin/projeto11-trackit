import { createContext } from "react";

const UserContext = createContext({
    name: '',
    image: ''
});

export default UserContext;