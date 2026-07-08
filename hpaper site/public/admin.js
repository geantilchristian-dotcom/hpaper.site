async function checkAdmin() {
  const response = await fetch("/api/admin/check");
  const data = await response.json();

  if (data.loggedIn) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboardBox").classList.remove("hidden");
    loadAdminProducts();
  }
}

async function loginAdmin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    document.getElementById("loginMessage").innerText = data.message;
    return;
  }

  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("dashboardBox").classList.remove("hidden");
  loadAdminProducts();
}

async function logoutAdmin() {
  await fetch("/api/admin/logout", {
    method: "POST"
  });

  document.getElementById("dashboardBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

async function loadAdminProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();

  const container = document.getElementById("adminProducts");
  container.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "admin-product";

    div.innerHTML = `
      <div>
        <h4>${product.name}</h4>
        <p><strong>Catégorie :</strong> ${product.category}</p>
        <p><strong>Prix :</strong> ${product.price || "Non précisé"}</p>
        <p>${product.description}</p>
      </div>

      <div class="admin-actions">
        <button onclick='editProduct(${JSON.stringify(product)})'>Modifier</button>
        <button onclick="deleteProduct(${product.id})" class="danger">Supprimer</button>
      </div>
    `;

    container.appendChild(div);
  });
}

async function saveProduct() {
  const id = document.getElementById("productId").value;

  const product = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
    description: document.getElementById("description").value
  };

  const url = id ? `/api/products/${id}` : "/api/products";
  const method = id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  clearForm();
  loadAdminProducts();
}

function editProduct(product) {
  document.getElementById("productId").value = product.id;
  document.getElementById("name").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("price").value = product.price;
  document.getElementById("image").value = product.image;
  document.getElementById("description").value = product.description;
}

async function deleteProduct(id) {
  const confirmation = confirm("Voulez-vous vraiment supprimer cet article ?");

  if (!confirmation) return;

  await fetch(`/api/products/${id}`, {
    method: "DELETE"
  });

  loadAdminProducts();
}

function clearForm() {
  document.getElementById("productId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("description").value = "";
}

checkAdmin();