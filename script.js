const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    });
  });
}

/* Scroll reveal */
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add("visible"));
}

/* -----------------------------
   DISCORD POPUP
   ----------------------------- */

const discordModal = document.getElementById("discordModal");
const discordTriggers = document.querySelectorAll(".discord-trigger");
const discordCloseButtons = document.querySelectorAll("[data-close-modal]");

/* REPLACE THIS WITH YOUR REAL DISCORD INVITE */
const DISCORD_INVITE = "https://discord.gg/YOURCODE";

document.querySelectorAll(".discord-join").forEach(link => {
  link.href = DISCORD_INVITE;
});

function openDiscordModal() {
  if (!discordModal) return;
  discordModal.classList.add("open");
  discordModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const closeButton = discordModal.querySelector(".discord-close");
  if (closeButton) closeButton.focus();
}

function closeDiscordModal() {
  if (!discordModal) return;
  discordModal.classList.remove("open");
  discordModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

/* Clicking any Discord link opens the popup */
discordTriggers.forEach(trigger => {
  trigger.addEventListener("click", event => {
    event.preventDefault();
    openDiscordModal();
  });
});

/* Close buttons / backdrop */
discordCloseButtons.forEach(button => {
  button.addEventListener("click", closeDiscordModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && discordModal && discordModal.classList.contains("open")) {
    closeDiscordModal();
  }
});

/*
  AUTO-OPEN:
  This now opens EVERY time the page is loaded.
  No localStorage/sessionStorage gating, so it cannot be silently suppressed
  by a previous dismissal.
*/
window.addEventListener("load", () => {
  window.setTimeout(() => {
    openDiscordModal();
  }, 650);
});
