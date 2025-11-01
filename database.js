const supabase_client = supabase.createClient(
    "https://xamgdqucoqemtnjhztjn.supabase.co", // supabase URL
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhbWdkcXVjb3FlbXRuamh6dGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5MDAxNDIsImV4cCI6MjA3NDQ3NjE0Mn0.f-K07vXwk1BecORK6uckybRfYfEOrjk_O93A4TgWhio" // supabase Key
);

let pathname = `${window.location.pathname}`;
const sweet_alert = async (title, icon) => {
    Swal.fire({
        title: `${title}`,
        icon: `${icon}`,
        showClass: {
            popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
        },
    });
    return;
}

let sess_user_name = "";
let sess_user_email = "";

//         {getUserSession}
// ---------- Start ----------
export async function get_user_session() {
    const { data, error } = await supabase_client.auth.getSession();

    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }

    console.log(data)
    if (data.session !== null) {
        if (window.location.pathname.endsWith("/login.html")) {
            // Agar woh login page par hai, to use home page par bhej do.
            window.location.replace("./");
        }
        sess_user_name = data.session.user.user_metadata.full_name;
        sess_user_email = data.session.user.email;
        console.log(sess_user_email)
        console.log(sess_user_name)
    } else {
        if (!window.location.pathname.endsWith("/login.html")) {
            // Agar woh login page par nahi hai, to use login page par bhej do.
            window.location.replace("./login.html");
        }
    }
    return;
}
// ---------- End ----------

// const getUserSession = document.getElementById("getUserSession");
// getUserSession.addEventListener("click", () => { get_user_session() })

//         {SignUp}
// ---------- Start ----------
export async function sign_up() {
    const { data, error } = await supabase_client.auth.signUp({
        email: 'arifsujaila@gmail.com',
        password: 'example-password',
        options: {
            data: {
                full_name: 'Arif'
            }
        }
    })
    if (error) {
        if (error) {
            console.error(`Error : ${error.message}`);
            sweet_alert(`${error.message}`, `error`);
            return;
        }
    }
    console.log(data)
    sweet_alert(`User Registered!`, `success`);
    return;
}
// ---------- End ----------

//         {SignIn}
// ---------- Start ----------
export async function sign_in() {
    const { data, error } = await supabase_client.auth.signInWithPassword({
        email: 'arifsujaila@gmail.com',
        password: 'example-password',
    })
    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }
    console.log(data)
    sweet_alert(`Login Successfull!`, `success`);
    setTimeout(() => get_user_session(), 2000);
    return;
}
// ---------- End ----------

//         {SignOut}
// ---------- Start ----------
export async function sign_out() {
    const { error } = await supabase_client.auth.signOut();

    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }

    sweet_alert(`Logout Successfull!`, `success`);
    setTimeout(() => get_user_session(), 2000);
    return;
}
// ---------- End ----------
// sign_out()

// console.log(pathname)
if (pathname == "/login.html") {
    //          {signUp_btn}
    const signUp = document.getElementById("signUp");
    signUp.addEventListener("click", () => { sign_up() });

    //          {signIn_btn}
    const signIn = document.getElementById("signIn");
    signIn.addEventListener("click", () => { sign_in() })
} 
// else {
    //          {signOut_btn}
    // const signOut = document.getElementById("signOut");
    // signOut.addEventListener("click", () => { sign_out() })
// }


//         {Read}
export async function get_todos() {
    const { data, error } = await supabase_client
        .from('Todos')
        .select()
    // .eq();
    if (error) {
        console.error(`Error : ${error}`);
        return;
    }
    console.log(data)
    return data;
}
// get_todos()


//         {Create}
export async function add_todos(task, email) {
    const { error } = await supabase_client
        .from('Todos')
        .insert({ tasks: `${task}`, user_email: `${sess_user_email}` });
    if (error) {
        console.error(`Error : ${error}`);
        return;
    }
    return;
}
// add_todos()


//         {Update}
export async function upd_todos(upd_id, upd_task) {
    const { error } = await supabase_client
        .from('Todos')
        .update({ tasks: `${upd_task}` })
        .eq("id", `${upd_id}`);
    if (error) {
        console.error(`Error : ${error}`);
        return;
    }
    return;
}
// upd_todos(3, "read")
// upd_todos("learn", "read")


//         {Delete}
export async function del_todos(del_id) {
    const { error } = await supabase_client
        .from('Todos')
        .delete()
        .eq("id", `${del_id}`);
    if (error) {
        console.error(`Error : ${error}`);
        return;
    }
    return;
}
// del_todos()


