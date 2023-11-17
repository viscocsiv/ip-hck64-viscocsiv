import { redirect } from "react-router-dom";

const redirectIfAuthenticated = () => {
    if (localStorage.access_token) {
        return redirect("/");
    }
    return null;
};

export default redirectIfAuthenticated
const redirectIfUnauthenticated = () => {
    if (!localStorage.access_token) {
        return redirect("/login");
    }
    return null;
};

export { redirectIfUnauthenticated, redirectIfAuthenticated };