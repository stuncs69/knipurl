const inputField = document.querySelector("#basic-url");
const submitBtn = document.querySelector("button#shortAction");
submitBtn.disabled = "disabled";

inputField.addEventListener('input', e=> {if (inputField.value.length > 2) submitBtn.removeAttribute("disabled");
else submitBtn.disabled = "disabled"})

async function siteExists() {
  return await fetch("../api/online.php", { method: "POST", body: JSON.stringify({ url: inputField.value }) })
  .then(r => r.json()).then(r => {
    if (r.success < 0 )
      return false
    else return true;
  }).catch(e => {
    return false;
  });
}

async function sendData() {
  submitBtn.disabled = "disabled";
  if (inputField.value.startsWith("http://")) inputField.value = inputField.value.slice(7);
  else if (inputField.value.startsWith("https://")) inputField.value = inputField.value.slice(8);

  if (await siteExists() == true) {
    await fetch("../api/shorten.php", { method: "POST", body: JSON.stringify({ url: inputField.value, name: inputField.value.split(".")[0] }) })
    .then(r => r.json()).then(r => {
      const ELEM = document.createElement("div");
      ELEM.id = "short-data-actual";
      ELEM.classList = "text-white d-flex flex-column gap-2";
      if (window.innerWidth > 768) {
        ELEM.innerHTML = `
        <button class='btn bg-primary text-white' id='copy-btn'>Copy to clipboard</button>
        <a href='${r.shortAnal}'><button class='btn bg-primary text-white'>Analytics</button></a>
      `;
      } else {
        ELEM.innerHTML = `
        <a href='${r.shortUrl}'<button class='btn' style="background:#0A0C10; color: white;">${r.shortUrl}</button>
        <a href='${r.shortAnal}'><button class='btn bg-primary text-white'>Analytics</button></a>
      `;
      }

      const SHORT_DATA = document.querySelector("#short-data");
      if (SHORT_DATA.innerHTML.length > 0) SHORT_DATA.innerHTML = "";
      
      SHORT_DATA.classList.add("p-2")
      SHORT_DATA.innerHTML += "<h5>Short link:</h5>"
      SHORT_DATA.appendChild(ELEM);
      
      if (window.innerWidth > 768) {
        document.querySelector("#copy-btn").addEventListener("click", e=> {
          navigator.clipboard
          .writeText(r.shortUrl)
          .then(() => alert("Copied!"))
          .catch(() => alert("Something went wrong, please try again later."));
        });
      }
    }).catch(e => {
      alert("Couldn't shorten link, try again later.");
      console.error(e)
    });

    submitBtn.removeAttribute("disabled");
  } else alert("Couldn't find website!");
}

document.body.addEventListener("keypress", e=> {
  if (e.code == "Enter") {
    if (inputField.value.length <= 3)
      return
    else sendData();
  }
});

submitBtn.addEventListener("click", async () => sendData());