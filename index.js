document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-container");

  if (container) {
    fetch("./products.json")
      .then((res) => res.json())
      .then((products) => {
        products.forEach((product) => {
          container.innerHTML += `
            <div class="p-3 col-lg-3 col-md-6 col-12 position-relative">
              <div class="position-relative overflow-hidden p-0 m-0">
                <div class="overlay position-absolute text-center w-100 h-100 d-flex justify-content-center align-items-center flex-column">
                  <button class="btn bg-white border-0 add-to-cart"> Add To Cart</button>
                  <div class="overlay-icons d-flex justify-content-center align-items-center gap-3 mt-3">
                    <div class="d-flex gap-1 text-white align-items-center justify-content-center">
                      <i class="fa-solid fa-share fa-lg" style="color: #ffffff;"></i>
                      <p class="mt-2 fw-medium">Share</p>
                    </div>
                    <div class="d-flex gap-1 text-white align-items-center justify-content-center">
                      <i class="fa-solid fa-heart fa-lg" style="color: #ffffff;"></i>
                      <p class="mt-2 fw-medium">Like</p>
                    </div>
                    <div class="d-flex gap-1 text-white align-items-center justify-content-center">
                      <i class="fa-solid fa-code-compare fa-lg" style="color: #ffffff;"></i>
                      <p class="mt-2 fw-medium">Compare</p>
                    </div>
                  </div>
                </div>
                <img src="${product.image}" alt="" class="w-100">
                <h4 class="fw-medium my-2">${product.name}</h4>
                <p class="text-muted">${product.desc}</p>
                <div class="prices d-flex justify-content-between">
                  <p class="fw-bold fs-4">${product.price}</p>
                  <p class="text-muted fs-6"><del>${product.oldPrice}</del></p>
                </div>
              </div>
            </div>
          `;
        });

        const cartButtons = document.querySelectorAll(".add-to-cart");

        cartButtons.forEach((btn, index) => {
          btn.addEventListener("click", () => {
            const product = products[index];
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} has been added!`);
          });
        });
      });
  }

  const tbody = document.querySelector("tbody");

  if (tbody) {
    tbody.innerHTML = "";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">Cart is empty</td></tr>`;
      return;
    }

    cart.forEach((item, index) => {
      const row = document.createElement("tr");

      let quantity = 1;

      row.innerHTML = `
        <td><img src="${item.image}" alt="${item.name}" width="60" /></td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input type="number" value="${quantity}" min="1"
                 class="form-control form-control-sm text-center mx-auto"
                 style="width: 60px; height: 30px; font-size: 14px;" />
        </td>
        <td>${item.price}</td>
        <td><button class="btn btn-brown delete-item" data-index="${index}">🗑️</button></td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".delete-item").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });
  }
});

window.addEventListener("storage", function () {
  location.reload();
});
