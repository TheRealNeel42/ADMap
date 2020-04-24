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

    cardMaps.push({
        card: card,
        apiUrl: apiUrl,
        populationFn: populationFn
    });

    cardContainer.appendChild(card.container);
}

function submit()
{
    const args = "?user=" + document.getElementById("username").value
        + "&password=" + document.getElementById("password").value
        + "&dcip=" + document.getElementById("ipAddress").value
        + "&domain=" + document.getElementById("domainName").value;

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
    return "received: " + JSON.stringify(jsonObject);
});




// this is what i used for screenshot //
// cardContainer.appendChild(new Card("Users", "cn: Guest\n\ncn: AAD_987d7f2f57d2\n\ncn: Mike Hope\nuserPrincipalName: mhope@MEGABANK.LOCAL\n\ncn: SABatchJobs\nuserPrincipalName: SABatchJobs@MEGABANK.LOCAL\n\ncn: svc-ata\nuserPrincipalName: svc-ata@MEGABANK.LOCAL\n\ncn: svc-bexec\nuserPrincipalName: svc-bexec@MEGABANK.LOCAL\n\ncn: svc-netapp\nuserPrincipalName: svc-netapp@MEGABANK.LOCAL\n\ncn: Dimitris Galanos\nuserPrincipalName: dgalanos@MEGABANK.LOCAL\n\ncn: Ray O'Leary\nuserPrincipalName: roleary@MEGABANK.LOCAL\n\ncn: Sally Morgan\nuserPrincipalName: smorgan@MEGABANK.LOCAL").container);
// cardContainer.appendChild(new Card("Domain", "<domain info>").container);
// cardContainer.appendChild(new Card("AS-REP", "Name          MemberOf                                                PasswordLastSet             LastLogon                   UAC\n------------  ------------------------------------------------------  --------------------------  --------------------------  --------\nsvc-alfresco  CN=Service Accounts,OU=Security Groups,DC=htb,DC=local  2020-03-27 04:56:30.543947  2020-03-27 04:55:33.028239  0x410200").container);
// cardContainer.appendChild(new Card("User SPNs", "None.").container);
// cardContainer.appendChild(new Card("User SPNs", "None.").container);
// cardContainer.appendChild(new Card("User SPNs", "None.").container);
// cardContainer.appendChild(new Card("User SPNs", "None.").container);
// cardContainer.appendChild(new Card("User SPNs", "None.").container);

