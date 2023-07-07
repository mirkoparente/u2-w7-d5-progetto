const url = "https://striveschool-api.herokuapp.com/api/product/";

const address = new URLSearchParams(location.search);

const id = address.get("id");
console.log("id prodotto", id);
console.log(url + id);

const fetchDetails = function () {
  fetch(url + id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YWYyMjEyYjUwYzAwMTQ5ZTRlZTMiLCJpYXQiOjE2ODg3MTA5NDYsImV4cCI6MTY4OTkyMDU0Nn0.X_4wuk4nUahUpV6uELOPSTFbAQ1JUrMI3C-YbOykgTM",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore recupero dettagli prodotto");
      }
    })
    .then((data) => {
      //riferimento spinner
      const spinner = document.getElementById("spinner");
      spinner.classList.add("d-none");
      //riferimento row
      const row = document.getElementById("row");
      console.log("dati", data);

      console.log(data);
      const divCol = document.createElement("div");
      divCol.classList.add("col", "col-12", "col-md-6");
      divCol.innerHTML = `<div class="card border border-warning ">
          
          <img src="${data.imageUrl}" class="card-img-top" alt="dettagli prodotto">
          
          <div class="card-body">
            <h5 class="card-title">Prodotto: ${data.name}</h5>
            <hr> 
            <p class="card-text">Descrizione: ${data.description}</p>
            <p class="card-text">Brand: ${data.brand} <span class="float-end">Prezzo: <span class="fw-bold float-end"> ${data.price}€</span></span></p>
            <div class="d-flex justify-content-between">
            <a href="./backoffice.html?id=${data._id}" class="btn bg-warning">Modifica</a>
            <button class="btn bg-danger">Elimina</button>
            </div>
          </div>
        </div>`;
      row.appendChild(divCol);

      let deleteButton = document.querySelector(".bg-danger");
      deleteButton.addEventListener("click", function () {
        if (confirm("Sei sicuro di eliminare il prodotto?")) {
          fetch(url + id, {
            method: "DELETE",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YWYyMjEyYjUwYzAwMTQ5ZTRlZTMiLCJpYXQiOjE2ODg3MTA5NDYsImV4cCI6MTY4OTkyMDU0Nn0.X_4wuk4nUahUpV6uELOPSTFbAQ1JUrMI3C-YbOykgTM",
            },
          })
            .then((res) => {
              if (res.ok) {
                alert("Prodotto ELIMINATO!");
                location.assign("index.html");
              } else {
                throw new Error("Problema nell'eliminazione dell'evento");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    })

    .catch((err) => {
      console.log(err);
    })

    .catch((err) => {
      console.log(err);
    });
};
fetchDetails();

const anno = new Date().getFullYear();
document.getElementById("data").innerHTML = `${anno}`;
