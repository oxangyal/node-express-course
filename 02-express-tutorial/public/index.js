const productsData = document.getElementById("productDivs");

const fetchData = async () => {
    const data = await fetch("/api/v1/products", {
        method: "GET",
    });
    const products = data.json();
    products
        .then((result) => {
            if (result.length < 1) {
                productsData.innerHTML = "<h3>Empty list</h3>";
                return;
            }
            const allProducts = result
                .map((product) => {
                    const productName =
                        product.name.charAt(0).toUpperCase() +
                        product.name.slice(1);
                    console.log("product", product.id, product.name);
                    return `<ul class="product_id">Product #${product.id}
<li class="product_name">Product Name: ${productName}
</li>
<li class="product_price">Price: $${product.price}
</li>
</ul>`;
                })
                .join("");
            productsData.innerHTML = allProducts;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};
