let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

displayProducts();

function addProduct() {

    let name = document.getElementById("productName").value;
    let category = document.getElementById("category").value;
    let quantity = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;

    if(name=="" || category=="" || quantity=="" || price==""){
        alert("Please fill all fields");
        return;
    }

    let product = {
        name:name,
        category:category,
        quantity:quantity,
        price:price
    };

    if(editIndex==-1){
        products.push(product);
    }
    else{
        products[editIndex]=product;
        editIndex=-1;
    }

    localStorage.setItem("products",JSON.stringify(products));

    document.getElementById("productName").value="";
    document.getElementById("category").value="";
    document.getElementById("quantity").value="";
    document.getElementById("price").value="";

    displayProducts();
}

function displayProducts(){

    let table=document.getElementById("productTable");
    table.innerHTML="";

    products.forEach((product,index)=>{

        let status = product.quantity>0 ? "In Stock" : "Out of Stock";

        table.innerHTML += `
        <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.quantity}</td>
            <td>₹${product.price}</td>
            <td>${status}</td>
            <td>
                <button class="edit" onclick="editProduct(${index})">Edit</button>
                <button class="delete" onclick="deleteProduct(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function deleteProduct(index){

    products.splice(index,1);

    localStorage.setItem("products",JSON.stringify(products));

    displayProducts();
}

function editProduct(index){

    document.getElementById("productName").value=products[index].name;
    document.getElementById("category").value=products[index].category;
    document.getElementById("quantity").value=products[index].quantity;
    document.getElementById("price").value=products[index].price;

    editIndex=index;
}

function searchProduct(){

    let input=document.getElementById("search").value.toLowerCase();

    let rows=document.querySelectorAll("#productTable tr");

    rows.forEach(row=>{

        let text=row.innerText.toLowerCase();

        if(text.includes(input)){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }

    });

}