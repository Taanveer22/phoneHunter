console.log("connected");

const loadAllPhones = () => {
  console.log("3 seonds later ....");
  document.getElementById("spinner").style.display = "none";
};

const handleSearch = () => {
  console.log(" search btn clicked");
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => {
    loadAllPhones();
  }, 3000);
};
