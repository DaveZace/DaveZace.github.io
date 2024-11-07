// Správný hash hesla
const correctHashedPassword = "9943324cb3f1a48a2963633905d35b97c3a24eb4b8ee84aafaef348ec3490799";
const enteredHash = localStorage.getItem('hashedPassword');

// Kontrola existence prvku 'protectedContent'
const protectedContent = document.getElementById('protectedContent');

if (protectedContent && enteredHash === correctHashedPassword) {
    protectedContent.style.display = 'block'; // Zobrazí obsah, pokud je heslo správné
} else if (!protectedContent) {
    console.warn("Prvek 'protectedContent' neexistuje v HTML.");
} else {
    alert("Přístup zamítnut: Nesprávné heslo.");
    window.location.href = "index.html"; // Přesměrování na index.html
}

// Vymazání localStorage po opuštění stránky
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('hashedPassword');
});


// Načtení JSON dat ze vzdáleného souboru
async function fetchDevices() {
    const response = await fetch('https://raw.githubusercontent.com/DaveZace/DaveZace.github.io/main/snMachines.json');
    const data = await response.json();
    return data;
}

let devices = {};

async function initialize() {
    devices = await fetchDevices();
    displayDeviceList();
}
4
function displayDeviceList() {
    var deviceListDiv = document.getElementById('deviceList');
    deviceListDiv.innerHTML = '';

    for (var serial in devices) {
        var device = devices[serial];
        var statusColor = device.Status === 'Done' ? 'blue' : 'red';

        deviceListDiv.innerHTML += `<p><a href="#" onclick="showDevice('${serial}')" style="color: ${statusColor};">${serial}</a></p>`;
    }
}

function showDevice(serial) {
    var device = devices[serial];
    var deviceInfoDiv = document.getElementById('deviceInfo');

    deviceInfoDiv.innerHTML = "<h3>Device Details: " + device.SN + "</h3>" +
                              "<table>" +
                              "<tr><th>Description</th><th>Data</th></tr>" +
                              "<tr><td>Timestamp</td><td>" + device.timestamp + "</td></tr>" +
                              "<tr><td>Government</td><td>" + device.Government + "</td></tr>" +
                              "<tr><td>Type</td><td>" + device.Type + "</td></tr>" +
                              "<tr><td>Size</td><td>" + device.Size + "</td></tr>" +
                              "<tr><td>VPN Region</td><td>" + device["VPN region"] + "</td></tr>" +
                              "<tr><td>VPN Modem IP</td><td>" + device["VPN modem IP"] + "</td></tr>" +
                              "<tr><td>PLC AMS IP</td><td>" + device["PLC AMS IP"] + "</td></tr>" +
                              "<tr><td>PLC PC IP</td><td>" + device["PLC PC IP"] + "</td></tr>" +
                              "<tr><td>OSC IP</td><td>" + device["OSC IP"] + "</td></tr>" +
                              "<tr><td>Eddy IP</td><td>" + device["Eddy IP"] + "</td></tr>" +
                              "<tr><td>AI IP</td><td>" + device["AI IP"] + "</td></tr>" +
                              "<tr><td>PLC Variant</td><td>" + device["PLC variant"] + "</td></tr>" +
                              "<tr><td>PLC Version</td><td>" + device["PLC version"] + "</td></tr>" +
                              "<tr><td>VISU Version</td><td>" + device["VISU version"] + "</td></tr>" +
                              "<tr><td>Customer</td><td>" + device.Customer + "</td></tr>" +
							  "<tr><td>Status</td><td>" + device.Status + "</td></tr>" +
							  "<tr><td>IP local</td><td>" + device["IP local"] + "</td></tr>" +
                              "</table>";
}

function findDevice() {
    var searchQuery = document.getElementById('searchQuery').value.toLowerCase();
    var deviceInfoDiv = document.getElementById('deviceInfo');
    var results = [];

    deviceInfoDiv.innerHTML = '';

    for (var serial in devices) {
        if (serial.toLowerCase().includes(searchQuery)) {
            var device = devices[serial];
            results.push("<h3>Result for: " + device.SN + "</h3>" +
                         "<table>" +
                         "<tr><th>Description</th><th>Data</th></tr>" +                      
                         "<tr><td>Timestamp</td><td>" + device.timestamp + "</td></tr>" +
                         "<tr><td>Government</td><td>" + device.Government + "</td></tr>" +
                         "<tr><td>Type</td><td>" + device.Type + "</td></tr>" +
                         "<tr><td>Size</td><td>" + device.Size + "</td></tr>" +
                         "<tr><td>VPN Region</td><td>" + device["VPN region"] + "</td></tr>" +
                         "<tr><td>VPN Modem IP</td><td>" + device["VPN modem IP"] + "</td></tr>" +
                         "<tr><td>PLC AMS IP</td><td>" + device["PLC AMS IP"] + "</td></tr>" +
                         "<tr><td>PLC PC IP</td><td>" + device["PLC PC IP"] + "</td></tr>" +
                         "<tr><td>OSC IP</td><td>" + device["OSC IP"] + "</td></tr>" +
                         "<tr><td>Eddy IP</td><td>" + device["Eddy IP"] + "</td></tr>" +
                         "<tr><td>AI IP</td><td>" + device["AI IP"] + "</td></tr>" +
                         "<tr><td>PLC Variant</td><td>" + device["PLC variant"] + "</td></tr>" +
                         "<tr><td>PLC Version</td><td>" + device["PLC version"] + "</td></tr>" +
                         "<tr><td>VISU Version</td><td>" + device["VISU version"] + "</td></tr>" +
                         "<tr><td>Customer</td><td>" + device.Customer + "</td></tr>" +
						 "<tr><td>Status</td><td>" + device.Status + "</td></tr>" +
						 "<tr><td>IP local</td><td>" + device["IP local"] + "</td></tr>" +
                         "</table><br>");
        }
    }

    if (results.length > 0) {
        deviceInfoDiv.innerHTML = results.join("");
    } else {
        deviceInfoDiv.innerHTML = "<p>No matching device found.</p>";
    }
}

// Inicializuje načítání dat při načtení stránky
initialize();
