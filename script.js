console.log("connected");

const loadAllPhones = async (status) => {
  //   console.log("3 seonds later ....");
  //   console.log(status);
  document.getElementById("spinner").style.display = "none";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  //   console.log(res);
  const data = await res.json();
  //console.log(data.data);

  if (status === true) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 6));
  }
};

const displayAllPhones = (phones) => {
  console.log(phones);
};

// onclick handler for search button
const handleSearch = () => {
  //   console.log(" search btn clicked");
  document.getElementById("spinner").style.display = "block";
  setTimeout(() => {
    loadAllPhones();
  }, 3000);
};

// onclick handler for showAll button
const handleShowAll = () => {
  console.log("show all btn clicked");
  loadAllPhones(true);
};

// final function invocation
loadAllPhones();
