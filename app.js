// Local login
const loginBtn = document.getElementById("login-btn");
const phoneInput = document.getElementById("phone");
const passInput = document.getElementById("password");
const remember = document.getElementById("remember");
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const balanceEl = document.getElementById("balance");
const liveValueEl = document.getElementById("live-value");
const payBtn = document.getElementById("pay-membership-btn");
const membershipArea = document.getElementById("membership-area");
const proofInput = document.getElementById("proof-input");
const proofPreview = document.getElementById("proof-preview");
const sentBtn = document.getElementById("sent-payment-btn");
const verificationStatus = document.getElementById("verification-status");

// Smooth count-up animation
function animateValue(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = '₱' + Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Update account balance
function updateBalanceUI() {
    const bal = Number(localStorage.getItem("b1_balance") || 0);
    animateValue(balanceEl, parseInt(balanceEl.textContent.replace(/[₱,]/g,"")) || 0, bal, 800);
}

// Login logic
loginBtn.addEventListener("click", () => {
    const phone = phoneInput.value.trim();
    const pass = passInput.value.trim();
    if (phone && pass) {
        localStorage.setItem("b1_phone", phone);
        localStorage.setItem("b1_password", pass);
        loginSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
        updateBalanceUI();
    }
});

// Pay membership
payBtn.addEventListener("click", () => {
    membershipArea.classList.toggle("hidden");
});

// Upload proof
proofInput.addEventListener("change", (e) => {
    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            proofPreview.innerHTML = `<img src="${reader.result}" style="max-width:150px;">`;
            sentBtn.disabled = false;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Submit payment for admin verification
sentBtn.addEventListener("click", () => {
    const img = proofPreview.querySelector("img");
    if (!img) { alert("Upload proof first"); return; }
    const v = { proof: img.src, status: "pending", timestamp: Date.now() };
    localStorage.setItem("b1_verification", JSON.stringify(v));
    verificationStatus.textContent = "Waiting for admin verification (24h max)";
    sentBtn.disabled = true;
    alert("Payment submitted. Admin will verify manually.");
});

// Smooth random live investment update
let currentInvestment = 8000000;
function updateLive() {
    const target = Math.floor(7000000 + Math.random() * 3000000);
    animateValue(liveValueEl, currentInvestment, target, 1000);
    currentInvestment = target;
}
setInterval(updateLive, 2000);
updateLive();
