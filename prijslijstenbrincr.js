// ==UserScript==
// @name         Brincr Prijslijsten naar WooCommerce
// @namespace    http://vanriel.eu/
// @version      1.1
// @description  Knop welke import mogelijkheden voor prijslijsten toevoegd
// @author       Laurens van Riel [laurens@vanriel.eu]
// @match        https://app.brincr.com/secure/customers/discount/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=brincr.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
// Create a new button element
var button = document.createElement('button');

// Set its attributes and text
button.id = 'json_export';
button.className = 'btn btn-secondary btn-lg mr-5px';
button.textContent = 'Export naar Website';

// Add the button to the DOM, right after the existing button
var pricingButton = document.getElementById('pricing_submit');
pricingButton.parentNode.insertBefore(button, pricingButton.nextSibling);

// Add the event listener to the new button
document.getElementById('json_export').addEventListener('click', function(event) {
    // Prevent the form from submitting
    event.preventDefault();

    let result = {};
    let rows = document.querySelector("#pricing-table > tbody").querySelectorAll('tr');

    for (let i = 0; i < rows.length; i++) {
        let sku = rows[i].querySelector('.artno').value;
        let price = parseFloat(rows[i].querySelector('.net').value);
        if (sku.startsWith("IW")) {
            result[sku] = price;
        }
    }


    document.querySelectorAll("#nett-table > tbody > tr").forEach(row => {
        let sku = row.querySelector(".artno").value;
        let price = row.querySelector(".discount").value;
        if (sku.startsWith("IW")) {
            result[sku] = price;
        }
    });




    let jsonOutput = JSON.stringify(result);

    // Redirect to the new URL, with jsonOutput as a query parameter
    window.location.href = 'https://horeca.ianenwijn.nl/prijslijsten-brincr/?brincrdata=' + encodeURIComponent(jsonOutput);
});

})();