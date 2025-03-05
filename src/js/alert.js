export async function alert() {
    const response = await fetch("json/alerts.json");
    if (!response.ok) {
        throw new Error("Bad Response");
    }

    const wholeMessage = await response.json();
    console.log("whole Message:", wholeMessage);
    
    const insertAlert = document.querySelector("main");
    insertAlert.insertAdjacentHTML("beforebegin", `<section class="alert-list"></section>`);

    const alertList = document.querySelector(".alert-list");

    wholeMessage.forEach((message) => {
        
        alertList.insertAdjacentHTML("afterbegin", `
            <p style="background-color: ${message.background}; color: ${message.color}; text-align: center;">${message.message}</p>
        `);
    });
}