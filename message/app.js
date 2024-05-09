if (window.location.hash) {
  document.querySelector("#msg-div").classList.add("hide");
  document.querySelector("#show-msg").classList.remove("hide");

  document.getElementById("message").innerText = atob(
    window.location.hash.replace("#", "")
  );
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector("#msg-inp");
  const encrypted = btoa(input.value);

  const link = `${window.location}#${encrypted}`;
  const linkInp = document.querySelector("#link-inp");
  linkInp.value = link;

  document.querySelector("#msg-div").classList.add("hide");
  document.querySelector("#link-div").classList.remove("hide");
  linkInp.select();
});
