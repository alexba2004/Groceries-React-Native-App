const URL_API = "http://localhost:3300/";

export const getProducts = async () => {
  const properties = await fetch(URL_API);
  return await properties.json();
};
export const deleteProduct = async (barcode) => {
  const res = await fetch(URL_API + "delete/" + barcode, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
export const insertProduct = async (product) => {
  const res = await fetch(URL_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export const updateProduct = async (barcode, product) => {
  const res = await fetch(URL_API + barcode, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product), // Aquí se envían los datos del producto en el cuerpo de la solicitud
  });
  return await res.json();
};
