export async function getProducts(category, query) {
  const endpoint = category
    ? `https://dummyjson.com/products/category/${category}`
    : `https://dummyjson.com/products/search?q=${query}&limit=100`;

  const output = await fetch(endpoint);
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  return response;
}

export async function getProductCategories() {
  const output = await fetch("https://dummyjson.com/products/category-list");
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  return response;
}

export async function getProductById(productId) {
  const output = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  return response;
}

export async function getSearchSuggestions(query) {
  const output = await fetch(
    `https://dummyjson.com/products/search?q=${query}&select=title&limit=${5}`
  );
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  return response;
}

// profile
export async function getUserProfile(id) {
  const output = await fetch(`https://dummyjson.com/users/${id}`);
  if (!output.ok) {
    throw new Error("Something went wrong! Please try again later.");
  }
  const response = await output.json();
  return response;
}
