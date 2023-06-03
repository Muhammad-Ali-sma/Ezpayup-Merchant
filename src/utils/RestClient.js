import { logoutAuth } from "Redux/authSlice";
import { store } from "Redux/store";
import API from "./api";

//james@gmail.com / Test123!

const Get = async (path) => {
    const controller = new AbortController();
    const Token = store.getState().authUser.token;
    return API.get(path, { headers: { ['Authorization']: Token ? 'Bearer ' + Token : '', }, signal: controller.signal })
        .then(({ data }) => data)
        .catch(error => {
            console.log("error", error.response.data)
            if (error.response.data?.message[0] === "Unauthorized!") {
                store.dispatch(logoutAuth());
                window.location.pathname = '/login';
                return;
            }
            return error.response.data
        });
}

const Post = async (path, data) => {
    const Token = store.getState().authUser.token;
    return API.post(path, data, { headers: { ['Authorization']: Token ? 'Bearer ' + Token : '', } })
        .then(({ data }) => data)
        .catch(error => {
            console.log("error", error)

            return error?.response?.data
        });

}

const Put = async (path, data) => {
    const Token = store.getState().authUser.token;
    return API.put(path, data, { headers: { ['Authorization']: Token ? 'Bearer ' + Token : '', } })
        .then(({ data }) => data)
        .catch(error => {
            return error.response.data
        });
}

const Delete = async (path) => {
    const Token = store.getState().authUser.token;
    return API.delete(path, { headers: { ['Authorization']: Token ? 'Bearer ' + Token : '', } })
        .then(({ data }) => data)
        .catch(error => {
            return error.response.data
        });
}

export default { Get, Post, Put, Delete };