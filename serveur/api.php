<?php
require 'data.php';     // La liste des pays
// Par défaut, $result est un tableau vide
$result = [];
// Vérification: est-ce qu'on a bien reçu une requête ?
if(!empty($_GET['country'])) {
    // Récupération du paramètre de recherche (query string de la requête HTTP GET).
    $country = $_GET['country'];
    // Parcours de notre tableau de pays
    foreach($countries as $oneCountry) {
        if(stristr($oneCountry, $country)) {
            // Générer les <li>
            array_push($result, $oneCountry);
        }
    }
    // Gestion du cas où aucun pays ne correspond à la recherche
    if (empty($result)) {
        $result = ["Aucun pays ne correspond à votre recherche"];
    }    
}
// Recherche de la chaîne de caractères demandée (par exemple 'fra') dans le pays spécifié.
// Renvoie la réponse HTTP au format HTML.
echo json_encode($result);
