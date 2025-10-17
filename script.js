// ===== LOGIN SYSTEM =====
const loginSection = document.getElementById("login-section");
const mainContent = document.getElementById("main-content");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const phoneNumber = document.getElementById("phoneNumber");
const password = document.getElementById("password");

// Auto-login if data stored
window.onload = () => {
  const savedPhone = localStorage.getItem("b1_phone");
  const savedPass = localStorage.getItem("b1_pass");
  if (savedPhone && savedPass) {
    showMain();
  }
};

loginBtn.addEventListener("click", () => {
  if (phoneNumber.value.trim() === "" || password.value.trim() === "") {
    alert("Please enter your phone number and password.");
    return;
  }
  localStorage.setItem("b1_phone", phoneNumber.value);
  localStorage.setItem("b1_pass", password.value);
  showMain();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("b1_phone");
  localStorage.removeItem("b1_pass");
  mainContent.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

function showMain() {
  loginSection.classList.add("hidden");
  mainContent.classList.remove("hidden");
}

// ===== NAVIGATION =====
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const target = link.getAttribute("href").substring(1);
    sections.forEach(sec => {
      sec.classList.add("hidden");
      sec.classList.remove("active");
    });
    document.getElementById(target).classList.remove("hidden");
    document.getElementById(target).classList.add("active");
  });
});

// ===== INVESTMENT NUMBER FLUCTUATION =====
const moneyValue = document.getElementById("moneyValue");

function randomMoney() {
  let current = parseFloat(moneyValue.textContent.replace(/,/g, ""));
  const change = (Math.random() * 200000 - 100000); // +/- ₱100k
  let newValue = Math.max(7000000, Math.min(10000000, current + change));
  moneyValue.textContent = newValue.toLocaleString("en-US");
}

setInterval(randomMoney, 1000);

// ===== MEMBERSHIP PAYMENT =====
const membershipBtn = document.getElementById("membershipBtn");
const membershipSection = document.getElementById("membershipSection");
const sentBtn = document.getElementById("sentBtn");
const verificationMessage = document.getElementById("verificationMessage");
const userBalance = document.getElementById("userBalance");

membershipBtn.addEventListener("click", () => {
  membershipSection.classList.remove("hidden");
});

sentBtn.addEventListener("click", () => {
  membershipSection.classList.add("hidden");
  verificationMessage.classList.remove("hidden");

  setTimeout(() => {
    verificationMessage.innerHTML = `
      <h3 style="color:#d4af37;">VERIFIED ✅</h3>
      <p>Membership payment confirmed!</p>
      <p>You’ve received your ₱1000 bonus.</p>
    `;
    userBalance.textContent = "₱1,000.00";
  }, 4000); // Simulated 4-second verification
});

// ===== FEEDBACK SECTION =====
const feedbackContainer = document.getElementById("feedback-container");

const feedbacks = [
  { lang: "Tagalog", text: "Napakabilis ng proseso! Ang B1 ang pinaka-maaasahan pagdating sa loan. Wala nang mahabang pila, mabilis ang approval, at malinaw ang terms. Sobrang satisfied ako sa serbisyo nila!" },
  { lang: "Bisaya", text: "Dali ra kaayo ang transaction! Nakakuha ko ug loan sa B1 in less than 10 minutes. Wala’y libog, limpyo ang proseso. Maayo kaayo ilang customer service, saludo ko!" },
  { lang: "Hiligaynon", text: "Wala gid ko nagsisi nga nag-invest sa B1! Ang returns stable kag maayo. Klaro ang updates kag honest ang mga staff. Daw indi mo gid pag-idlangan magbutang sang imo kwarta diri." },
  { lang: "Tagalog", text: "Legit at mapagkakatiwalaan! Sa dami ng online platform ngayon, sa B1 lang ako kampante. Transparent sa lahat ng details, at mabilis pa mag-release ng funds." },
  { lang: "Bisaya", text: "Angayan kaayo ni para sa gusto mag-invest! Gi-guide ka nila sa tanan. Makita gyud nimo ang tubo sa imong kwarta. Walay lipod-lipod, diretso gyud nga negosyo!" },
  { lang: "Hiligaynon", text: "Nami gid ang experience ko sa trading! Simple lang ang platform pero powerful. Kahit beginner ka, dali lang masabtan kag makita mo dayon ang resulta sang imo trades." },
  { lang: "Tagalog", text: "B1 helped me grow my small business. Dahil sa kanilang loan service, nakadagdag ako ng kapital. Walang hassle, at mababait ang mga staff na tumulong sa akin." },
  { lang: "Bisaya", text: "Sulit gyud akong kasaligan sa B1! Nakasuway nako ug withdraw sa akong earnings, smooth kaayo. Wala gyud problema, legit nga trading platform!" },
  { lang: "Hiligaynon", text: "Mapisan kag matinud-anon nga serbisyo. Indi pareho sang iban nga app nga dugay mag-response. Ang B1, madali lang kontakon kag maayo magpasabat sa inquiries." },
  { lang: "English", text: "Truly a 5-star financial platform! B1 offers fast loans, reliable investments, and safe trading. I’ve trusted them for months now and I’m happy with every transaction. Highly recommended!" }
];

feedbacks.forEach(fb => {
  const box = document.createElement("div");
  box.classList.add("feedback-box");
  box.innerHTML = `
    <p>⭐⭐⭐⭐⭐</p>
    <p><em>(${fb.lang})</em></p>
    <p>${fb.text}</p>
  `;
  feedbackContainer.appendChild(box);
});

// ===== UTILITY CLASSES =====
document.querySelectorAll(".hidden").forEach(el => el.style.display = "none");
