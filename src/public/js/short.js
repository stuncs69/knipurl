const inputField = document.querySelector("#basic-url");
const submitBtn = document.querySelector("button#shortAction");
submitBtn.addEventListener("click", async e => {
  await fetch("../api/shorten.php", { method: "POST", body: { url: inputField.value } })
  .then(r => r.json()).then(r => {
    console.log(r);
    const ELEM = document.createElement("div");
    ELEM.id = "short-data-actual";
    ELEM.classList = "text-white d-flex flex-column gap-2 bg-primary";
    ELEM.innerHTML = `
      <p>Short URL: ${r.shortUrl}</p>
      <p>Analytics: ${r.shortAnal}</p>
    `;

    document.querySelector("#short-data").appendChild(ELEM);
  }).catch(e => {
    alert("Couldn't shorten link, try again later.");
    console.error(e)
  })
});