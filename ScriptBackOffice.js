window.onload = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  console.log(id);
  if (id !== null) {
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
        document.getElementById("sub").addEventListener("submit", (event) => modificaItem(event, id));
        document.getElementById("btnDelete").addEventListener("click", () => deleteItem(id));
        document.getElementById("btnReset").style = "display:none";
      })
      .catch((err) => console.log(err));
  } else {
    document.getElementById("sub").addEventListener("submit", (event) => creaNuovoOggetto(event));
    document.getElementById("elimina").style = "display:none";
  }
};
const reset = () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("imageURL").value = "";
  document.getElementById("price").value = "";
};
const creaNuovoOggetto = async (event) => {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageURL").value;
  const price = document.getElementById("price").value;
  event.preventDefault();
  try {
    const risp = await fetch("https://striveschool-api.herokuapp.com/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: price,
      }),
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjFiNmMwMzRmZjAwMTQwM2Y1M2IiLCJpYXQiOjE2OTI5NTA5NjYsImV4cCI6MTY5NDE2MDU2Nn0.ZIaFy8myEWQPy098N_dRPnHXE1qN_pS_ZwmqwDMYag4",
      },
    });
    document.getElementById("alert").innerHTML = `<div class="alert alert-success" role="alert">
Elemento Creato con successo!!!!!!!
</div>`;
    if (!risp.ok) {
      if (risp.status === 404) {
        throw new Error("Not Found 404");
      }
      if (risp.status === 401) {
        throw new Error("Not Permitted");
      }
      if (risp.status === 500) {
        throw new Error("General Server Error");
      }
    }
  } catch (error) {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger" role="alert">
 ${error}
        </div>`;
  }
};

const creaItem = (item) => {
  document.getElementById("name").value = item.name;
  document.getElementById("description").value = item.description;
  document.getElementById("brand").value = item.brand;
  document.getElementById("imageURL").value = item.imageUrl;
  document.getElementById("price").value = item.price;
  document.getElementById("titolo").innerText = "Modifica";
};

const modificaItem = async (event, id) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageURL").value;
  const price = document.getElementById("price").value;
  try {
    const risp = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: price,
      }),
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjFiNmMwMzRmZjAwMTQwM2Y1M2IiLCJpYXQiOjE2OTI5NTA5NjYsImV4cCI6MTY5NDE2MDU2Nn0.ZIaFy8myEWQPy098N_dRPnHXE1qN_pS_ZwmqwDMYag4",
      },
    });
    document.getElementById("alert").innerHTML = `<div class="alert alert-success" role="alert">
    Elemento Modificato con successo!!!!!!!
    </div>`;
    if (!risp.ok) {
      if (risp.status === 404) {
        throw new Error("Not Found 404");
      }
      if (risp.status === 401) {
        throw new Error("Not Permitted");
      }
      if (risp.status === 500) {
        throw new Error("General Server Error");
      }
    }
  } catch (error) {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger" role="alert">
${error}
    </div>`;
  }
};

const deleteItem = async (id) => {
  try {
    const risp = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NjFiNmMwMzRmZjAwMTQwM2Y1M2IiLCJpYXQiOjE2OTI5NTA5NjYsImV4cCI6MTY5NDE2MDU2Nn0.ZIaFy8myEWQPy098N_dRPnHXE1qN_pS_ZwmqwDMYag4",
      },
    });
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger" role="alert">
            Elemento Eliminato!!!!!
            </div>`;
    if (!risp.ok) {
      if (risp.status === 404) {
        throw new Error("Not Found 404");
      }
      if (risp.status === 401) {
        throw new Error("Not Permitted");
      }
      if (risp.status === 500) {
        throw new Error("General Server Error");
      }
    }
  } catch (error) {
    document.getElementById("alert").innerHTML = `<div class="alert alert-danger" role="alert">
    ${error}
        </div>`;
  }
};
