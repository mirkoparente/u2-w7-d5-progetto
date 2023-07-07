const url = "https://striveschool-api.herokuapp.com/api/product/";

const fetchProducts = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YWYyMjEyYjUwYzAwMTQ5ZTRlZTMiLCJpYXQiOjE2ODg3MTA5NDYsImV4cCI6MTY4OTkyMDU0Nn0.X_4wuk4nUahUpV6uELOPSTFbAQ1JUrMI3C-YbOykgTM",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("errore chimata api");
      }
    })
    .then((data) => {
      //riferimento spinner
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      //riferimento row
      const row = document.getElementById("row");
      console.log("dati", data);
      data.forEach((prodotti) => {
        console.log(prodotti);
        const divCol = document.createElement("div");
        divCol.classList.add("col","col-12", "col-sm-6", "col-lg-2","g-4");
        divCol.innerHTML = `<div class="card border border-warning h-100">
        <div class="h-75">
        <a href="./details.html?id=${prodotti._id}"><img src="${prodotti.imageUrl}" class="card-img-top h-100 w-100" alt="immagine prodotti"></a>
        </div>
        <div class="card-body">
          <h5 class="card-title">${prodotti.name}</h5>
          <p class="card-text">${prodotti.brand}</p>
          <div class="d-flex justify-content-between">
          <a href="./details.html?id=${prodotti._id}" class="btn btn-primary">Scopri di più</a>
          <a href="./backoffice.html?id=${prodotti._id}" class="btn bg-warning">Modifica</a>
          </div>
        </div>
      </div>`;
        row.appendChild(divCol);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchProducts();

const anno=new Date().getFullYear()
document.getElementById("data").innerHTML=`${anno}`