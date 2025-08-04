let paperclips = 0;
let money = 100;
let machines = 0;
let autoMachines = 0;
let autoSellEnabled = false;
let producePrice = 1;
let autoSellPurchased = false;
let autoSellInterval;
let productionIncrease = 1;
let sellSpeed = 850; 
let sellSpeedPrice = 100;
let machinePrice = 50;
let autoMachinePrice = 200;
let autoSellPrice = 250;
let totalProducedPaperclips = 0;

// Références aux éléments HTML
const paperclipsDisplay = document.getElementById('paperclips');
const moneyDisplay = document.getElementById('money');
const machinesDisplay = document.getElementById('machines');
const autoMachinesDisplay = document.getElementById('autoMachines');
const produceButton = document.getElementById('produce');
const sellButton = document.getElementById('sell');
const buyMachineButton = document.getElementById('buyMachine');
const buyAutoMachineButton = document.getElementById('buyAutoMachine');
const autoSellButton = document.getElementById('autoSell');
const increaseSellSpeedButton = document.getElementById('increaseSellSpeed');
const totalProducedDisplay = document.getElementById('totalProduced');
const cmdConsole = document.getElementById('cmdConsole');


// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    paperclipsDisplay.textContent = paperclips;
    moneyDisplay.textContent = money.toFixed(2);
    machinesDisplay.textContent = machines;
    autoMachinesDisplay.textContent = autoMachines;
    totalProducedDisplay.textContent = `Total trombones produits : ${totalProducedPaperclips}`;

    buyMachineButton.textContent = `Acheter une machine (${machinePrice}$)`;
    buyAutoMachineButton.textContent = `Acheter une machine automatique (${autoMachinePrice}$)`;
    increaseSellSpeedButton.textContent = `Augmenter la vitesse de vente (${sellSpeedPrice}$)`;

    if (autoSellPurchased) {
        autoSellButton.textContent = autoSellEnabled ? "Désactiver la vente automatique" : "Activer la vente automatique";
        autoSellButton.disabled = false;
    } else {
        autoSellButton.textContent = `Activer la vente automatique (${autoSellPrice}$)`;
        autoSellButton.disabled = money < autoSellPrice;
    }
}

// Fonction pour afficher des messages dans la console
function logToConsole(message, color = "#ecf0f1", backgroundColor = "#2c3e50") {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.style.color = color;
    messageElement.style.backgroundColor = backgroundColor;
    messageElement.style.padding = "10px";
    messageElement.style.marginBottom = "15px";
    messageElement.style.borderRadius = "5px";
    messageElement.style.textAlign = "left";
    messageElement.style.fontSize = "14px";
    cmdConsole.appendChild(messageElement);
    cmdConsole.scrollTop = cmdConsole.scrollHeight;
}



function sellPaperclip() {
    if (paperclips >= 1) {
        const randomPrice = (Math.random() * (10 - 1) + 1).toFixed(2);
        paperclips--;
        money += parseFloat(randomPrice);
        sellPriceDisplay.textContent = `${randomPrice}$`; // Mise à jour du prix affiché
        updateDisplay();
        logToConsole(`💰 Vous avez vendu un trombone pour ${randomPrice}$`, "#fff", "#f39c12");
    } else {
        logToConsole('❌ Vous n\'avez pas de trombones à vendre.', "#fff", "#e74c3c");
    }
}

// Fonction pour produire un trombone
function producePaperclip() {
    if (money >= producePrice) {
        paperclips += productionIncrease;
        totalProducedPaperclips += productionIncrease;
        money -= producePrice;
        const increasePercentage = Math.random() * (4.863 - 0.01) + 0.01;
        producePrice += (producePrice * increasePercentage / 100);

        // Augmentation du prix tous les 100 trombones produits
        if (totalProducedPaperclips % 100 === 0) {
            const priceIncrease = Math.random() * (0.67 - 0.10) + 0.10;
            producePrice += producePrice * (priceIncrease / 100);
            logToConsole(`📈 Le prix de production a augmenté de ${priceIncrease.toFixed(2)}% après 100 trombones. Nouveau prix : ${producePrice.toFixed(2)}$`, "#fff", "#2980b9");
        }

        updateDisplay();
        logToConsole(` + ${productionIncrease} trombone(s)! augmentation de ${increasePercentage.toFixed(2)}%. Nouveau prix : ${producePrice.toFixed(2)}$`, "#fff", "#27ae60");    } else {
        logToConsole('❌ Pas assez d\'argent pour produire un trombone.', "#fff", "#e74c3c");
    }
}

// Fonction pour vendre un trombone
function sellPaperclip() {
    if (paperclips >= 1) {
        const randomPrice = (Math.random() * (10 - 1) + 1).toFixed(2);
        paperclips--;
        money += parseFloat(randomPrice);
        updateDisplay();
        logToConsole(`💰 Vous avez vendu un trombone pour ${randomPrice}$`, "#fff", "#f39c12");
    } else {
        logToConsole('❌ Vous n\'avez pas de trombones à vendre.', "#fff", "#e74c3c");
    }
}

// Fonction pour acheter une machine
function buyMachine() {
    if (money >= machinePrice) {
        machines++;
        productionIncrease++;
        money -= machinePrice;
        machinePrice = Math.round(machinePrice * 1.2);
        updateDisplay();
        logToConsole('⚙️ Vous avez acheté une machine !', "#fff", "#3498db");
    } else {
        logToConsole('❌ Pas assez d\'argent pour acheter une machine.', "#fff", "#e74c3e");
    }
}

// Fonction pour acheter une machine automatique
function buyAutoMachine() {
    if (money >= autoMachinePrice) {
        autoMachines++;
        money -= autoMachinePrice;
        autoMachinePrice = Math.round(autoMachinePrice * 1.2);
        updateDisplay();
        logToConsole('🤖 Vous avez acheté une machine automatique!', "#fff", "#8e44ad");
        setInterval(produceAutomatically, 1000);
    } else {
        logToConsole('❌ Pas assez d\'argent pour acheter une machine automatique.', "#fff", "#e74c3e");
    }
}

// Fonction pour produire automatiquement
function produceAutomatically() {
    if (autoMachines > 0) {
        paperclips++;
        totalProducedPaperclips++;
        updateDisplay();
    }
}

// Fonction pour activer/désactiver la vente automatique
function toggleAutoSell() {
    if (!autoSellPurchased) {
        if (money >= autoSellPrice) {
            money -= autoSellPrice;
            autoSellPurchased = true;
            updateDisplay();
            logToConsole('✅ Vente automatique achetée !', "#fff", "#27ae60");
        } else {
            logToConsole('❌ Pas assez d\'argent pour acheter la vente automatique.', "#fff", "#e74c3c");
        }
    } else {
        autoSellEnabled = !autoSellEnabled;
        if (autoSellEnabled) {
            logToConsole('⚡ Vente automatique activée.', "#fff", "#27ae60");
            autoSellInterval = setInterval(() => {
                if (paperclips > 0) {
                    sellPaperclip();
                }
            }, sellSpeed);
        } else {
            logToConsole('🛑 Vente automatique désactivée.', "#fff", "#e74c3e");
            clearInterval(autoSellInterval);
        }
        updateDisplay();
    }
}

// Fonction pour augmenter la vitesse de vente
function increaseSellSpeed() {
    if (money >= sellSpeedPrice) {
        const randomIncrease = Math.random() * (9.6432 - 3.657) + 3.657;
        sellSpeed *= (1 - randomIncrease / 100);
        money -= sellSpeedPrice;
        sellSpeedPrice = Math.round(sellSpeedPrice * (1 + (Math.random() * (9.6432 - 3.657) + 3.657) / 100));
        updateDisplay();
        logToConsole(`⚡ Vitesse de vente augmentée! Nouveau délai: ${sellSpeed.toFixed(2)} ms.`, "#fff", "#3498db");
        if (autoSellEnabled) {
            clearInterval(autoSellInterval);
            autoSellInterval = setInterval(() => {
                if (paperclips > 0) {
                    sellPaperclip();
                }
            }, sellSpeed);
        }
    } else {
        logToConsole('❌ Pas assez d\'argent pour augmenter la vitesse de vente.', "#fff", "#e74c3c");
    }
}

// Ajout des événements aux boutons
produceButton.addEventListener('click', producePaperclip);
sellButton.addEventListener('click', sellPaperclip);
buyMachineButton.addEventListener('click', buyMachine);
buyAutoMachineButton.addEventListener('click', buyAutoMachine);
autoSellButton.addEventListener('click', toggleAutoSell);
increaseSellSpeedButton.addEventListener('click', increaseSellSpeed);

updateDisplay();
