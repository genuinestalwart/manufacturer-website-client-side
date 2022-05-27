import { useState } from "react";
import { signOut } from 'firebase/auth';
import auth from "../firebase.init";

const useFirebase = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [validPass, setValidPass] = useState(true);
    const regexEmail = /^(\w+([.-]?\w+)*).{6,}@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,23}$/;

    const handleEmail = event => {
        const e = event.target.value;
        setEmail(e);

        if (regexEmail.test(e)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    };

    const handlePass = event => {
        const p = event.target.value;
        setPassword(p);

        if (regexPass.test(p)) {
            setValidPass(true);
        } else {
            setValidPass(false);
        }
    };

    const logOut = () => {
        localStorage.removeItem('accessToken');
        signOut(auth);
    };

    const errorify = message => {
        if (message) {
            const temp = message.split('/')[1].split('-').join(' ');
            return temp;
        }
        return '';
    };

    return {
        username, setUsername,
        email, setEmail,
        password, setPassword,
        validEmail, setValidEmail,
        validPass, setValidPass,
        handleEmail, handlePass,
        logOut, errorify
    };
};

export default useFirebase;