import axios from "axios";
import { useNavigate } from "react-router";
import config from "../../config";
import { toast } from "react-toastify";


const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {

        await axios
            .post(`${config.apiUrl}auth/logout`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                })
            .then(function (response) {
                localStorage.removeItem("authToken");
                toast.success(response.data.message);
                navigate("/sign-in");
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.removeItem("authToken");
                    navigate("/sign-in");
                }
                toast.error(error.response.data.message);
            });

        // try {
        //     await axios.post(
        //         `${config.apiUrl}/auth/logout`, // Your logout API endpoint
        //         {},
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        //             },
        //         }
        //     );

        //     // Clear the auth token from local storage
        //     localStorage.removeItem("authToken");

        //     // Navigate to login page
        //     navigate("/sign-in");
        // } catch (error) {
        //     console.error("Logout failed:", error);
        // }
    };

    return logout;
};

export default useLogout;
