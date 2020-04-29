/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import Card from "./card";

const cardContainer = document.getElementById("cardContainer");
const cardMaps = [];

function createCard(title, apiUrl, populationFn)
{
    const card = new Card(title, "");
    console.log("Trying")

    cardMaps.push({
        card: card,
        apiUrl: apiUrl,
        populationFn: populationFn
    });

    cardContainer.appendChild(card.container);
}

function submit()
{
    const args = "?dcip=" + document.getElementById("ipAddress").value
        + "&domain=" + document.getElementById("domain").value
        + "&username=" + document.getElementById("username").value
        + "&password=" + document.getElementById("password").value;
        

    // http://127.0.0.1:5000/users?username=hey&password=fdsa&dcip=10.10.10.127&full=fjeiwo
    cardMaps.filter(item => item.card.isChecked).forEach((item) =>
    {
        const request = new XMLHttpRequest();
        request.open("GET", encodeURI(item.apiUrl + args));
        request.addEventListener("load", () =>
        {
            console.log(request.responseText);
            item.card.innerText = item.populationFn(JSON.parse(request.responseText));
        });
        request.send();
    });
}

document.getElementById("submit").addEventListener("click", submit);

// create cards //

createCard("Users", "http://127.0.0.1:5000/users", (jsonObject) =>
{
    return jsonObject[0];
    //return JSON.stringify(jsonObject);
});

createCard("UserSPNs", "http://127.0.0.1:5000/userspns", (jsonObject) =>
{
    return jsonObject[0];
});

createCard("As-Rep Roasting", "http://127.0.0.1:5000/asrep", (jsonObject) =>
{
    return jsonObject[0];
});

createCard("Kerberoast", "http://127.0.0.1:5000/kerberoast", (jsonObject) =>
{
    return jsonObject[0];
});

