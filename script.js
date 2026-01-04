/* ================================
   DATA SOURCE (JSON)
================================ */
const modules = [
    {
        title: "Psychology Based Learning",
        description: "Understanding human behavior to design smarter and more human-centric EdTech products.",
        details: "This module focuses on cognitive science, behavioral patterns, and how psychology improves learning outcomes."
    },
    {
        title: "DeepTech Innovation",
        description: "Research-driven technologies shaping the future of digital products.",
        details: "Covers AI, data-driven systems, and innovation frameworks used in DeepTech companies."
    },
    {
        title: "Leadership Training",
        description: "Developing Level-5 leadership and strategic thinking.",
        details: "Learn decision-making models, responsibility ownership, and leadership psychology."
    }
];

/* ================================
   DOM REFERENCES
================================ */
const container = document.getElementById("cardContainer");
const body = document.body;

/* ================================
   CREATE MODAL (Once)
================================ */
const modal = document.createElement("div");
modal.className = "modal hidden";

modal.innerHTML = `
    <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h2 id="modalTitle"></h2>
        <p id="modalDescription"></p>
    </div>
`;

body.appendChild(modal);

/* ================================
   RENDER CARDS DYNAMICALLY
================================ */
modules.forEach((module, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.style.animationDelay = `${index * 0.2}s`; // stagger effect

    card.innerHTML = `
        <h3>${module.title}</h3>
        <p>${module.description}</p>
        <button data-index="${index}">Explore</button>
    `;

    container.appendChild(card);
});

/* ================================
   EVENT DELEGATION (BEST PRACTICE)
================================ */
container.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const index = event.target.getAttribute("data-index");
        openModal(index);
    }
});

/* ================================
   MODAL FUNCTIONS
================================ */
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = modal.querySelector(".close-btn");

function openModal(index) {
    modalTitle.textContent = modules[index].title;
    modalDescription.textContent = modules[index].details;

    modal.classList.remove("hidden");
    body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.add("hidden");
    body.style.overflow = "auto";
}

/* Close modal events */
closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

/* ================================
   SCROLL ANIMATION (PRO TOUCH)
================================ */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(card => observer.observe(card));
