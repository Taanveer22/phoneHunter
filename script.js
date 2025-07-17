console.log("connected");

const loadAllPhones = async (status, searchText) => {
  console.log(searchText);
  //   console.log("3 seonds later ....");
  //   console.log(status);
  document.getElementById("spinner").style.display = "none";

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  );
  //   console.log(res);
  const data = await res.json();
  // console.log(data.data);
  if (status === true) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 6));
  }
};

const displayAllPhones = (phones) => {
  // console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phones.forEach((item) => {
    // console.log(item);
    const { brand, phone_name, slug, image } = item;
    // console.log(brand, phone_name, slug, image);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card bg-gray-400 m-5">
            <figure class="px-10 pt-10">
                    <img src="${image}"class="rounded-xl"/>
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${brand}</h2>
                <p>${phone_name}</p>
                <div class="card-actions">
                     <button onclick="handleShowDetails('${slug}')"
                              class="btn btn-primary">
                              Show Details
                     </button>
                </div>
            </div>
        </div>
    `;
    phonesContainer.append(div);
  });
};

// onclick handler for show details button
const handleShowDetails = async (slug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  // console.log(res);
  const data = await res.json();
  // console.log(data.data);
  const modalData = data.data.mainFeatures;
  // console.log(modalData);
  const { chipSet, displaySize, memory, storage } = modalData;
  // console.log(chipSet, displaySize, memory, storage);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
      <dialog id="details_modal" class="modal modal-bottom sm:modal-middle">
              <div class="modal-box">
                  <h3 class="text-lg font-bold">${chipSet}</h3>
                  <p class="py-4">${memory}</p>
                  <p class="py-4">${storage}</p>
                  <p class="py-4">${displaySize}</p>
                  <div class="modal-action">
                      <form method="dialog">
                            <button class="btn">Close</button>
                      </form>
                  </div>
              </div>
      </dialog>
  `;

  // modal show
  details_modal.showModal();
};

// onclick handler for search button
const handleSearch = () => {
  console.log("search btn clicked");
  document.getElementById("spinner").style.display = "block";
  const inputSearch = document.getElementById("search-box").value;
  // console.log(inputSearch);
  setTimeout(() => {
    loadAllPhones(false, inputSearch);
  }, 3000);
};

// onclick handler for showAll button
const handleShowAll = () => {
  console.log("show all btn clicked");
  loadAllPhones(true);
};

// final function invocation
loadAllPhones(false, "iphone");
