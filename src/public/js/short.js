const inputField = document.querySelector("#basic-url");
const submitBtn = document.querySelector("button#shortAction");
submitBtn.disabled = "disabled";

inputField.addEventListener('input', e=> {console.log(inputField.value.length);if (inputField.value.length > 2) submitBtn.removeAttribute("disabled");
else submitBtn.disabled = "disabled"})

async function sendData() {

  await fetch("../api/shorten.php", { method: "POST", body: { url: inputField.value } })
  .then(r => r.json()).then(r => {
    console.log(r);
    const ELEM = document.createElement("div");
    ELEM.id = "short-data-actual";
    ELEM.classList = "text-white d-flex flex-column gap-2";
    ELEM.innerHTML = `
      <a href='${r.shortUrl}'><button class='btn bg-primary text-white'>Copy to clipboard</button></a>
      <a href='${r.analShort}'><button class='btn bg-primary text-white'>Analytics</button></a>
    `;

    const SHORT_DATA = document.querySelector("#short-data");
    if (SHORT_DATA.innerHTML.length > 0) SHORT_DATA.innerHTML = "";
    
    SHORT_DATA.classList.add("p-2")
    SHORT_DATA.innerHTML += "<h5>Short link:</h5>"
    SHORT_DATA.appendChild(ELEM);
  }).catch(e => {
    alert("Couldn't shorten link, try again later.");
    console.error(e)
  })
}

document.body.addEventListener("keypress", e=> {
  if (e.code == "Enter") {
    if (inputField.value.length < 3)
      return
    else sendData();
  }
});

submitBtn.addEventListener("click", async () => sendData());