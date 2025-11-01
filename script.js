import { get_user_session, sign_up, sign_in, sign_out } from "./database.js";

const initial_func = async () => {
    get_user_session()
}
initial_func()