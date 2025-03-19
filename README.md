# Projet "ÉvènemenCiel" M2-GL

*-Émilie Le Rouzic*

*-Antoine Provain*

*-Antoine Noel*

Ce projet a été réalisé dans le cadre du domaine professionnel de génie logiciel.
Il a pour but la mise en place d'un site de vente en ligne d'évènements.
Il utilise le framework React afin de créer une application web dynamique et réactive.
De fait, l'architecture du projet suit les principes de React, avec une division en composants.

### Voici les grandes fonctionnalités : 

**Page d'accueil**

Une page présentant sous forme de cartes les différents évènnements. Ils peuvent être cliqués pour ouvrir leur page de détails.

**Page de détails**

Cette page s'adapte à l'évènement sélectionnée par l'utilisateur. Elle présente toutes les informations importantes et permet à l'utilisateur de réserver des tickets.

**Panier**

Une page regroupant toutes les réservations de l'utilisateur. Elle lui offre la possibilité de supprimer des éléments ou de modifier la quantité de tickets souhaités pour un évènement donné.

**Header/Footer**

Ces deux parties se situent respectivement au dessus et en dessous de chaque pages du site. Le footer contient simplement les noms des créateurs. Le header apporte la possibilité de rejoindre la page d'accueil à tout instant en cliquant sur le titre au centre. L'image du panier permet de rejoindre la page du panier de l'utilisateur. C'est également dans le header que se trouve le bouton pour changer du mode sombre au mode clair.

**Page d'erreur**

Une page d'erreur est affichée si l'utilisateur tente d'accéder à une page qui n'existe pas. Elle possède la particularité de ne pas contenir de footer.

### Utilisation d'un JSON-server

La création d'évènements a été réalisée en amont grâce à un fichier JSON contenant les informations nécessaires. Ce fichier est utilisé par le serveur JSON pour fournir les données à l'application. Pour lancer le serveur, il suffit de se placer dans le dossier du projet "EvenemenCiel" et de lancer la commande `json-server --watch public/events.json`. Le serveur est alors lancé et les données sont accessibles via les différents endpoints en local sur le port 3000.

### Utilisation de l'application

Pour lancer l'application, il suffit de se placer dans le dossier du projet "EvenemenCiel" et de lancer la commande `npm run dev`. L'application est alors lancée et accessible via un navigateur web à l'adresse `http://localhost:5173/`.

### Fonctionnalités futures

L'application pourra à l'avenir se doter d'une gestion des utilisateurs ou bien une page de création d'évènements pour les administrateurs. Il serait également possible de rajouter un système de paiement pour les réservations.
