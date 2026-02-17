const STORAGE_KEY = "portfolio-certificates-v1";

/** @type {HTMLFormElement | null} */
const certificateForm = document.querySelector("#certificate-form");
/** @type {HTMLInputElement | null} */
const certTitle = document.querySelector("#cert-title");
/** @type {HTMLInputElement | null} */
const certIssuer = document.querySelector("#cert-issuer");
/** @type {HTMLInputElement | null} */
const certDate = document.querySelector("#cert-date");
/** @type {HTMLInputElement | null} */
const certLink = document.querySelector("#cert-link");
/** @type {HTMLDivElement | null} */
const certificateList = document.querySelector("#certificate-list");
/** @type {HTMLParagraphElement | null} */
const certificateEmpty = document.querySelector("#certificate-empty");
/** @type {HTMLButtonElement | null} */
const clearCertificatesButton = document.querySelector("#clear-certificates");
/** @type {HTMLSpanElement | null} */
const currentYear = document.querySelector("#current-year");

const defaultCertificates = [];

let certificates = loadCertificates();

if (certificateForm) {
  certificateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!certTitle || !certIssuer || !certDate) {
      return;
    }

    const title = certTitle.value.trim();
    const issuer = certIssuer.value.trim();
    const date = certDate.value;
    const link = certLink ? certLink.value.trim() : "";

    if (!title || !issuer || !date) {
      return;
    }

    const newCertificate = {
      id: createId(),
      title,
      issuer,
      date,
      link,
    };

    certificates.unshift(newCertificate);
    saveCertificates();
    certificateForm.reset();
    renderCertificates();
  });
}

if (clearCertificatesButton) {
  clearCertificatesButton.addEventListener("click", () => {
    if (!certificateList) {
      return;
    }

    const confirmClear = window.confirm(
      "Clear all certificates stored on this device?",
    );
    if (!confirmClear) {
      return;
    }

    certificates = [];
    saveCertificates();
    renderCertificates();
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

renderCertificates();

function renderCertificates() {
  if (!certificateList || !certificateEmpty) {
    return;
  }

  certificateList.textContent = "";

  const data = certificates.length ? certificates : defaultCertificates;
  data.forEach((certificate) => {
    certificateList.appendChild(createCertificateCard(certificate));
  });

  certificateEmpty.hidden = data.length !== 0;
}

function createCertificateCard(certificate) {
  const wrapper = document.createElement("div");
  wrapper.className = "col-md-6";

  const card = document.createElement("article");
  card.className = "certificate-card";

  const title = document.createElement("h3");
  title.className = "h5";
  title.textContent = certificate.title;

  const issuer = document.createElement("p");
  issuer.className = "certificate-meta mb-1";
  issuer.textContent = `Issued by ${certificate.issuer}`;

  const date = document.createElement("p");
  date.className = "certificate-meta mb-3";
  date.textContent = formatMonthYear(certificate.date);

  card.append(title, issuer, date);

  if (certificate.link) {
    const link = document.createElement("a");
    link.className = "btn btn-sm btn-outline-dark";
    link.href = certificate.link;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "View credential";
    card.appendChild(link);
  }

  wrapper.appendChild(card);
  return wrapper;
}

function formatMonthYear(value) {
  if (!value) {
    return "";
  }

  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `cert-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function saveCertificates() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
}

function loadCertificates() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    return [];
  }

  return [];
}
