const body = document.body;
const header = document.getElementById("site-header");
const nav = document.getElementById("primary-nav");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const backToTop = document.getElementById("back-to-top");
const typingText = document.getElementById("typing-text");
const modal = document.getElementById("project-modal");
const modalTools = document.getElementById("modal-tools");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const typingRoles = [
  "Junior Network Administrator",
  "Computer Networking Enthusiast",
  "IT Support Beginner"
];

const projectData = {
  os: {
    tools: "Windows, Driver Installer, Troubleshooting",
    title: "Instalasi Ulang Sistem Operasi",
    description:
      "Melakukan instalasi ulang sistem operasi Windows, konfigurasi driver, update software, dan pengecekan performa perangkat setelah instalasi.",
    tags: ["Windows", "Driver Installer", "Troubleshooting"]
  },
  troubleshooting: {
    tools: "Hardware Check, Software Repair, Problem Solving",
    title: "Troubleshooting Perangkat",
    description:
      "Menganalisis kerusakan pada perangkat, melakukan pengecekan software dan hardware ringan, serta memberikan solusi perbaikan sesuai kebutuhan pengguna.",
    tags: ["Hardware Check", "Software Repair", "Problem Solving"]
  },
  network: {
    tools: "MikroTik, Winbox, IP Address, DHCP, NAT",
    title: "Konfigurasi Jaringan Menggunakan Winbox",
    description:
      "Melakukan konfigurasi dasar jaringan menggunakan Winbox, seperti pengaturan IP Address, DHCP Client, DNS, NAT, dan pengujian koneksi jaringan.",
    tags: ["MikroTik", "Winbox", "IP Address", "DHCP", "NAT"]
  },
  server: {
    tools: "Python, HTML, CSS, Localhost",
    title: "Simple HTTP Server",
    description:
      "Membuat server lokal sederhana menggunakan Python untuk menampilkan halaman website dan memahami dasar cara kerja web server.",
    tags: ["Python", "HTML", "CSS", "Localhost"]
  },
  portfolio: {
    tools: "HTML, CSS, JavaScript",
    title: "Portfolio Website",
    description:
      "Membuat website portofolio pribadi sebagai media pengenalan diri, pengalaman, skill, dan project untuk kebutuhan magang.",
    tags: ["HTML", "CSS", "JavaScript"]
  }
};

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

const typeRole = () => {
  const currentRole = typingRoles[roleIndex];
  const visibleText = currentRole.slice(0, characterIndex);
  typingText.textContent = visibleText;

  if (!isDeleting && characterIndex < currentRole.length) {
    characterIndex += 1;
    window.setTimeout(typeRole, 70);
    return;
  }

  if (!isDeleting && characterIndex === currentRole.length) {
    isDeleting = true;
    window.setTimeout(typeRole, 1200);
    return;
  }

  if (isDeleting && characterIndex > 0) {
    characterIndex -= 1;
    window.setTimeout(typeRole, 36);
    return;
  }

  isDeleting = false;
  roleIndex = (roleIndex + 1) % typingRoles.length;
  window.setTimeout(typeRole, 260);
};

typeRole();

const closeMenu = () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  const clickedInsideMenu = nav.contains(event.target) || menuToggle.contains(event.target);
  if (!clickedInsideMenu) {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const updateNavigationState = () => {
  const scrollPosition = window.scrollY;
  header.classList.toggle("scrolled", scrollPosition > 18);
  backToTop.classList.toggle("show", scrollPosition > 520);

  document.querySelectorAll("section[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach((link) => link.classList.remove("active"));
      activeLink?.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateNavigationState);
updateNavigationState();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const openProjectModal = (projectId) => {
  const project = projectData[projectId];
  if (!project) return;

  modalTools.textContent = project.tools;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
};

const closeProjectModal = () => {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
};

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.openProject);
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeProjectModal();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const fields = [name, email, message];
  let isValid = true;

  fields.forEach((field) => {
    const errorElement = field.nextElementSibling;
    errorElement.textContent = "";

    if (!field.value.trim()) {
      errorElement.textContent = "Bagian ini wajib diisi.";
      isValid = false;
    }
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() && !emailPattern.test(email.value.trim())) {
    email.nextElementSibling.textContent = "Format email belum benar.";
    isValid = false;
  }

  if (!isValid) {
    formStatus.textContent = "";
    return;
  }

  alert("Pesan berhasil dikirim secara simulasi.");
  formStatus.textContent = "Pesan berhasil divalidasi.";
  contactForm.reset();
});
