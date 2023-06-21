import { toast } from "react-toastify";

export const SuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};

export const ErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
};
