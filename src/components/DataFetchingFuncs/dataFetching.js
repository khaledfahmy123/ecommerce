export const fetchData = () => {
  return fetch("https://e-commerce-frog.000webhostapp.com/").then((response) =>
    response.json()
  );
};

export const postData = (temp) => {
  console.log(temp);
  fetch("https://e-commerce-frog.000webhostapp.com/", {
    method: "post",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(temp),
  })
    .then((res) => res.json())
    .then((recipes) => {
      console.log(recipes);
    });
};

export const deleteData = (temp) => {
  return fetch("https://e-commerce-frog.000webhostapp.com/", {
    method: "post",
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(temp),
  })
    .then((response) => response.json())
    .then((d) => console.log(d));
};
