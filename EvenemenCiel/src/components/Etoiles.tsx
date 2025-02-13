import { useEffect } from "react";

const generateStars = (numStars: number) => {
    const container = document.createElement("div");
    container.className = "stars-container";
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        star.className = "star";
        
        // Taille aléatoire
        const size = Math.random() * 3 + 1; // Entre 1px et 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Position aléatoire
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;

        // Définir un délai d'animation aléatoire pour désynchroniser le scintillement
        const delay = Math.random() * 2; // Entre 0 et 2 secondes
        const duration = Math.random() * 2 + 1.5; // Durée entre 1.5s et 3.5s pour variation

        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`; // Chaque étoile a une vitesse différente

        container.appendChild(star);
    }

    document.body.appendChild(container);
};

const Etoiles = () => {
    useEffect(() => {
        generateStars(100); // Générer 100 étoiles
    }, []);

    return null;
};

export default Etoiles;
