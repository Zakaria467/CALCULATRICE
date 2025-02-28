// Récupérer les éléments du DOM
const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
const historySidebar = document.getElementById('history-sidebar');

// Charger l'historique depuis le localStorage au démarrage
let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
updateHistory();

// Fonction pour ajouter du texte à l'affichage
function appendToDisplay(value) {
    if (display.textContent === '0' && value !== '.') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

// Fonction pour effacer l'affichage
function clearDisplay() {
    display.textContent = '0';
}

// Fonction pour supprimer le dernier caractère
function deleteLast() {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    }
}

// Fonction pour calculer le résultat
function calculate() {
    try {
        // Récupérer l'expression de l'affichage
        const operation = display.textContent;
        
        // Calculer le résultat de l'opération
        let result = eval(operation);
        
        // Appliquer la limitation à 4 décimales uniquement si c'est un nombre flottant
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = result.toFixed(4);  // Formater le résultat avec 4 décimales
        }
        
        // Mettre à jour l'affichage avec le résultat
        display.textContent = result;
        
        // Ajouter l'opération et le résultat à l'historique
        addToHistory(operation, result);
    } catch (error) {
        display.textContent = 'Erreur';
    }
}

// Fonction pour ajouter une opération à l'historique
function addToHistory(operation, result) {
    // Ajouter l'opération avec son résultat au début de l'historique
    history.unshift({ operation, result });
    
    // Limiter l'historique à 3 éléments
    if (history.length > 3) {
        history.pop();
    }
    
    // Sauvegarder l'historique dans le localStorage
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
    
    // Mettre à jour l'affichage de l'historique
    updateHistory();
}

// Fonction pour mettre à jour l'affichage de l'historique
function updateHistory() {
    historyList.innerHTML = ''; // Vider l'historique actuel
    
    // Afficher chaque opération dans l'historique avec son index
    history.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}) ${item.operation} = ${item.result}`;
        
        // Ajouter un gestionnaire de clic pour chaque élément d'historique
        li.addEventListener('click', () => {
            display.textContent = item.operation;  // Afficher l'opération dans la zone d'affichage
        });
        
        historyList.appendChild(li);
    });
}

// Fonction pour basculer l'affichage de la barre d'historique
function toggleHistory() {
    historySidebar.classList.toggle('visible');
}
