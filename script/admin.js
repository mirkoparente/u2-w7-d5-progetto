const url = "https://striveschool-api.herokuapp.com/api/product/";

const address = new URLSearchParams(location.search);

const id = address.get("id");
console.log("id prodotto", id);
console.log(url + id);

const fetchProducts = function () {
  if (id) {
    document.querySelector(".btn-primary").innerText = "Modifica evento";
    document.querySelector("h1").innerText = "Admin - Modifica ";

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
          throw new Error("Errore chiamata recupero prodotto");
        }
      })
      .then((modifica) => {
        const nameProduct = document.getElementById("product-name");
        const descriptionProduct = document.getElementById(
          "product-description"
        );
        const brandProduct = document.getElementById("product-brand");
        const imageProduct = document.getElementById("product-image");
        const priceProduct = document.getElementById("product-price");

        nameProduct.value = modifica.name;
        descriptionProduct.value = modifica.description;
        brandProduct.value = modifica.brand;
        imageProduct.value = modifica.imageUrl;
        priceProduct.value = modifica.price;
      })

      .catch((err) => {
        console.log(err);
      });
  }
  //riferimenti form e input
  const form = document.getElementById("form");
  const nameProduct = document.getElementById("product-name");
  const descriptionProduct = document.getElementById("product-description");
  const brandProduct = document.getElementById("product-brand");
  const imageProduct = document.getElementById("product-image");
  const priceProduct = document.getElementById("product-price");

  // form reset
  form.addEventListener("reset", function (e) {
    if (!confirm("Sei sicuro di resettare tutto?")) {
      e.preventDefault();
    }
  });

  //form submit
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("dati form");

    //oggetto value
    const product = {
      name: nameProduct.value,
      description: descriptionProduct.value,
      brand: brandProduct.value,
      imageUrl: imageProduct.value,
      price: priceProduct.value,
    };
    console.log("dati prodotto", product);

    let urlToUse;
    if (id) {
      urlToUse = url + id;
    } else {
      urlToUse = url;
    }

    let methodToUse;
    if (id) {
      methodToUse = "PUT";
    } else {
      methodToUse = "POST";
    }

    fetch(urlToUse, {
      method: methodToUse,
      body: JSON.stringify(product),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YWYyMjEyYjUwYzAwMTQ5ZTRlZTMiLCJpYXQiOjE2ODg3MTA5NDYsImV4cCI6MTY4OTkyMDU0Nn0.X_4wuk4nUahUpV6uELOPSTFbAQ1JUrMI3C-YbOykgTM",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Prodotto Salvato");
          (nameProduct.value = ""),
            (descriptionProduct.value = ""),
            (brandProduct.value = ""),
            (imageProduct.value = ""),
            (priceProduct.value = "");
          location.assign("index.html");
        } else {
          throw new Error("Errore salvataggio prodotto");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
fetchProducts();

const anno = new Date().getFullYear();
document.getElementById("data").innerHTML = `${anno}`;
