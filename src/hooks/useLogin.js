// import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const { dispatch } = useAuthContext();

    // const navigate = useNavigate();
    const login = async (username) => {
        try {
            const response = await fetch(`https://poll-backend-0pt9.onrender.com/api/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            const json = await response.json();
            if (!response.ok) {
                swal("Oops!", json.error, "warning");
            } else {
                localStorage.setItem('socket_user', JSON.stringify(json))
                swal("Success!", "Login Successfull...", "success")
                dispatch({ type: "LOGIN", payload: json })
            }

        } catch (err) {
            swal("Oops!", "Something went wrong...", "error");
            console.log(err);
        }
    }

    return {
        login
    }
}