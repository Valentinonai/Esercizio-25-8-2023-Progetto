// window.onload = () => {
//   fetch("https://striveschool-api.herokuapp.com/api/product", {
//     method: "POST",
//     body: JSON.stringify({
//       name: "Nokia 3310",
//       description: "Indestructible cellphone",
//       brand: "Nokia",
//       imageUrl: "https: //example.com/3310.jpg",
//       price: 99,
//     }),
//     headers: {
//       "content-type": "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjFiNmMwMzRmZjAwMTQwM2Y1M2IiLCJpYXQiOjE2OTI5NTA5NjYsImV4cCI6MTY5NDE2MDU2Nn0.ZIaFy8myEWQPy098N_dRPnHXE1qN_pS_ZwmqwDMYag4",
//     },
//   });
// };

window.addEventListener("DOMContentLoaded", () => {
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjFiNmMwMzRmZjAwMTQwM2Y1M2IiLCJpYXQiOjE2OTI5NTA5NjYsImV4cCI6MTY5NDE2MDU2Nn0.ZIaFy8myEWQPy098N_dRPnHXE1qN_pS_ZwmqwDMYag4",
    },
  })
    .then((resp) => resp.json())
    .then((items) => {
      creaCard(items);
    })
    .catch((err) => console.log(err));
});

const creaCard = (items) => {
  const tabella = document.getElementById("tabella");
  tabella.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const divCol = document.createElement("div");
    divCol.className = "col-md-4";
    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm";

    const img = document.createElement("img");
    img.className = "bd-placeholder-img card-img-top";
    img.setAttribute("src", items[i].imageUrl);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const h5 = document.createElement("h5");
    h5.innerText = items[i].name;
    h5.className = "card-title";
    h5.style = "position:relative";
    h5.innerHTML += `<h4 onclick="window.location.assign('./BackOffice.html?id=${items[i]._id}')" style="cursor:pointer"><span id="edit" class="badge bg-secondary" style="position:absolute; right:0; top:0px"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg></span></h4>`;
    const p = document.createElement("p");
    p.innerText = items[i].brand;

    p.className = "card-text";
    const divBtn = document.createElement("div");
    divBtn.className = "d-flex justify-content-between align-items-center";
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    const btn1 = document.createElement("button");
    btn1.innerText = "More";
    btn1.className = "btn btn-sm btn-outline-secondary";
    btn1.setAttribute("type", "button");
    btn1.addEventListener("click", () => {
      detailUrl = "./dettaglio.html?itemId=" + items[i]._id;
      window.location.assign(detailUrl);
    });
    const btn2 = document.createElement("button");
    btn2.innerText = "Hide";
    btn2.addEventListener("click", (event) => hide(event));
    btn2.className = "btn btn-sm btn-outline-secondary";
    btn2.setAttribute("type", "button");
    const small = document.createElement("small");
    small.className = "text-muted";
    small.innerText = `${items[i].price}€`;
    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    btnGroup.appendChild(btn1);
    btnGroup.appendChild(btn2);
    divBtn.appendChild(btnGroup);
    divBtn.appendChild(small);
    cardBody.appendChild(divBtn);
    card.appendChild(img);
    card.appendChild(cardBody);
    divCol.appendChild(card);
    tabella.appendChild(divCol);
  }
};
const hide = (event) => {
  event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
};
