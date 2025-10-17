// Local login
const loginBtn=document.getElementById("login-btn");
const phoneInput=document.getElementById("phone");
const passInput=document.getElementById("password");
const remember=document.getElementById("remember");
const loginSection=document.getElementById("login-section");
const dashboardSection=document.getElementById("dashboard-section");
const balanceEl=document.getElementById("balance");
const liveValueEl=document.getElementById("live-value");
const payBtn=document.getElementById("pay-membership-btn");
const membershipArea=document.getElementById("membership-area");
const proofInput=document.getElementById("proof-input");
const proofPreview=document.getElementById("proof-preview");
const sentBtn=document.getElementById("sent-payment-btn");
const verificationStatus=document.getElementById("verification-status");

function updateBalanceUI(){balanceEl.textContent='₱'+(localStorage.getItem("b1_balance")||0)+".00";}
loginBtn.addEventListener("click",()=>{
  const phone=phoneInput.value.trim();const pass=passInput.value.trim();
  if(phone&&pass){localStorage.setItem("b1_phone",phone);localStorage.setItem("b1_password",pass);loginSection.classList.add("hidden");dashboardSection.classList.remove("hidden");updateBalanceUI();}});
payBtn.addEventListener("click",()=>{membershipArea.classList.toggle("hidden");});
proofInput.addEventListener("change",(e)=>{if(e.target.files[0]){const reader=new FileReader();reader.onload=()=>{proofPreview.innerHTML='<img src="'+reader.result+'" style="max-width:150px;">';sentBtn.disabled=false;};reader.readAsDataURL(e.target.files[0]);}});
sentBtn.addEventListener("click",()=>{
  const img=proofPreview.querySelector("img");
  if(!img){alert("Upload proof first");return;}
  const v={proof:img.src,status:"pending",timestamp:Date.now()};
  localStorage.setItem("b1_verification",JSON.stringify(v));
  verificationStatus.textContent="Waiting for admin verification";
  sentBtn.disabled=true;alert("Payment submitted. Admin will verify manually.");});
// Randomized live investment
function updateLive(){liveValueEl.textContent='₱'+(Math.floor(7000000+Math.random()*3000000));}
setInterval(updateLive,1000);updateLive();