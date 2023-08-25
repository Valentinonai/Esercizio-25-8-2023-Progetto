window.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("itemId");
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjFiNmMwMzRmZjAwMTQwM2Y1M2IiLCJpYXQiOjE2OTI5NTA5NjYsImV4cCI6MTY5NDE2MDU2Nn0.ZIaFy8myEWQPy098N_dRPnHXE1qN_pS_ZwmqwDMYag4",
    },
  })
    .then((risp) => risp.json())
    .then((item) => {
      creaItem(item);
    })
    .catch((err) => console.log(err));
});

const creaItem = (item) => {
  const container = document.getElementById("container");
  container.innerHTML = `
  <img src="${item.imageUrl}" alt="img" style='width:500px' class="mt-5 mb-3">
    <h1 class="display-3">${item.name}</h1>
    <h3>${item.brand}</h3>
    <p>${item.description}</p>
    <p>Prezzo: ${item.price}€</p>
         <button type="button" class="btn btn-success" onclick="window.location.assign('./BackOffice.html?id=${item._id}')">Modifica</button>

</div>`;
};
