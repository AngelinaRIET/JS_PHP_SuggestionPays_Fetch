/*
 * L'objectif de l'exercice est de permettre à l'utilisateur de commencer à saisir
 * un nom de pays (une partie du nom que ce soit au début, au milieu ou à la fin du nom)
 * et progressivement d'afficher sous le champ de saisie une liste de suggestions des
 * pays possibles qui correspondent partiellement ou totalement à la saisie.
 * Cette liste est renvoyée par un serveur à distance en PHP qu'il faut implémenter.
 * Il s'agit donc cette fois de faire et la partie front / client HTTP
 * et la partie back / serveur HTTP : on voit le JavaScript "dialoguer" avec le PHP grâce
 * au protocole HTTP.
 * 
 * Il faut implémenter deux versions de l'exercice : une qui dialogue en HTML
 * entre le client et le serveur, le JavaScript récupère directement le résultat HTML à afficher.
 * L'autre version dialogue en JSON entre le client et le serveur, le JavaScript va construire
 * lui-même l'affichage à partir des données JSON.
 */

// ---- VARIABLES ET CONSTANTES GLOBALES

let input = document.querySelector("#country");          // L'objet DOM représentant la balise <input>
let suggest = document.querySelector("#suggest");        // L'objet DOM représentant la balise <ul>



// ---- FONCTIONS
function remplirChamp(event) {
    input.value = event.currentTarget.textContent;
}

function rafraichirSuggestions() {
    window.fetch("../serveur/api.php?country="+input.value)
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function(results){

        suggest.innerHTML = "";
        for (let index = 0; index < results.length; index++) {
            suggest.innerHTML += `<li>${results[index]}</li>`;
        }

        // ajouter un écouteur d'évènements aux lis
        let mesLi= document.querySelectorAll("#suggest li");

        for (let index = 0; index < mesLi.length; index++) {
            mesLi[index].addEventListener("click", remplirChamp);
            
        }
    });
}


// ---- CODE PRINCIPAL

// Recherche du champ de saisie et de la balise <ul> qui va contenir les résultats.

// Installation d'un gestionnaire d'évènement sur la saisie au clavier dans le champ.
input.addEventListener("keyup", rafraichirSuggestions);