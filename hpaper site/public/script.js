function toggleMenu() {
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
}

async function loadProducts() {
  const container = document.getElementById("productsGrid");

  if (!container) return;

  const response = await fetch("/api/products");
  const products = await response.json();

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>Aucun article publié pour le moment.</p>";
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-img">` : ""}
      <h3>${product.name}</h3>
      <p><strong>${product.category}</strong></p>
      <p>${product.description}</p>
      <p class="price">${product.price || "Prix sur demande"}</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", loadProducts);