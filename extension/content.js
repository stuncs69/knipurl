console.log("converting to short url");(async function() {
  let _name = (location.href.startsWith("http://")) ? location.href.slice(7) : location.href.slice(8); let _url = _name;
  await fetch("https://knipurl.nl/api/shorten.php", { method: "POST", body: JSON.stringify({ url: _url, name: _name.split('.')[0] })})
  .then(r => r.json()).then(r => navigator.clipboard.writeText(r.shortUrl).then(() => alert("Copied!")).catch(e => console.log(e))).catch(() => alert("Couldn't shorten url."));
})();