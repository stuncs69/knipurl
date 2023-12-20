const inputField = document.querySelector("#basic-url");
const submitBtn = document.querySelector("button#shortAction");
submitBtn.disabled = "disabled";

inputField.addEventListener('input', e=> {if (inputField.value.length > 2) submitBtn.removeAttribute("disabled");
else submitBtn.disabled = "disabled"})

async function testData()
{
  await fetch(`https://${inputField.value}`, {method: "HEAD", headers: {Origin: "knipurl.nl"}})
  .then(r => {
    if (r.status.toString().startsWith("2") || r.status.toString().startsWith("3"))
      return 0;

    console.log(r);
  }).catch(e => {
    
    submitBtn.removeAttribute("disabled");
    alert("That website could not be reached.");
    throw new Error("Website couldn't be reached");
  })
}

async function sendData() {
  submitBtn.disabled = "disabled";
  testData().then(async e => {
    await fetch("../api/shorten.php", { method: "POST", body: JSON.stringify({ url: inputField.value, name: inputField.value.split(".")[0] }) })
    .then(r => r.json()).then(r => {
      const ELEM = document.createElement("div");
      ELEM.id = "short-data-actual";
      ELEM.classList = "text-white d-flex flex-column gap-2";
      ELEM.innerHTML = `
        <button class='btn bg-primary text-white' id='copy-btn'>Copy to clipboard</button>
        <a href='${r.shortAnal}'><button class='btn bg-primary text-white'>Analytics</button></a>
      `;
  
      const SHORT_DATA = document.querySelector("#short-data");
      if (SHORT_DATA.innerHTML.length > 0) SHORT_DATA.innerHTML = "";
      
      SHORT_DATA.classList.add("p-2")
      SHORT_DATA.innerHTML += "<h5>Short link:</h5>"
      SHORT_DATA.appendChild(ELEM);
  
      document.querySelector("#copy-btn").addEventListener("click", e=> {navigator.clipboard.writeText(r.shortUrl); alert("Copied!")} );
    }).catch(e => {
      alert("Couldn't shorten link, try again later.");
      console.error(e)
    });
  
    submitBtn.removeAttribute("disabled");
  }).catch(e => {
    console.error(e);
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