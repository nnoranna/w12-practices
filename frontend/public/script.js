const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const userComponent = ({name, surname}) => {
    return `
    <div>
        <h1>${name}</h1>
        <h2>${surname}</h2>
    </div>
    `
}

//Add new user form
function addUserComponent() {
    return `
        <div>
            <input type="text" name="firstName" class="firstName" placeholder="First Name">
            <input type="text" class="surname" name="surname" placeholder="Surname">
            <button class="addUser">Send</button>
        </div>
    `
}




const loadEvent = async () => {

    if (window.location.pathname === "/admin/order-view") {
        console.log("We are in admin");
    } else {
        console.log("We are on the customer platform");
    }

    const result = await parseJSON("/api/v1/users");
    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML(
        `beforeend`, 
        result.map(user => userComponent(user)).join("")
    );

    rootElement.insertAdjacentHTML(
        `afterend`, 
        addUserComponent()
    );

    const addNewUser = document.querySelector(".addUser")
    const firstName = document.querySelector(".firstName")
    const surname = document.querySelector(".surname")

    addNewUser.addEventListener("click", e => {
        const userData = {
            firstName: firstName.value,
            surname: surname.value
        };

        fetch("/users/new", {
            method: "POST",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify(userData)
        })
            .then(async data => {
                const user = await data.json();

                rootElement.insertAdjacentHTML = ("beforeend",userComponent(user));
            })
    })

};



    



window.addEventListener("load", loadEvent)