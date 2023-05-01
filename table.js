let tableDiv=document.querySelector(".tables-div");
const basket = JSON.parse(localStorage.getItem("basket"));
const tbody = document.querySelector("tbody");
const totalAmount = document.querySelector("#total-amount");
let basketCount = 0;

if (!basket || basket.length === 0) {
  tableDiv.innerHTML = "<p>Table is empty</p>";
} 
else {
  document.addEventListener("DOMContentLoaded",()=>{
    let total = 0;
    tbody.innerHTML = "";
    console.log(basket);

    window.addEventListener("load",()=>{
      basket.forEach((product, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", product.id);
      
        const numCell = document.createElement("td");
        numCell.innerText = index + 1;
        row.appendChild(numCell);
      
        const nameCell = document.createElement("td");
        nameCell.innerText = product.name;
        row.appendChild(nameCell);

        const imgCell = document.createElement("td");
        const img = document.createElement("img");
        img.setAttribute("src", product.imgURL);
        img.setAttribute("alt", product.name);
        imgCell.appendChild(img);
        row.appendChild(imgCell);
        const priceCell = document.createElement("td");
        priceCell.innerText = product.price;
        row.appendChild(priceCell);
      
        const countCell = document.createElement("td");
        countCell.innerText = product.count;
        row.appendChild(countCell);
      
        const totalPriceCell = document.createElement("td");
        const totalPrice = product.count * product.price;
        totalPriceCell.innerText = totalPrice;
        row.appendChild(totalPriceCell);
      
        const btnCell = document.createElement("td");
        const incBtn = document.createElement("button");
        incBtn.innerText = "+";
        let plus=incBtn.setAttribute("class","btn-success mx-2 increase btn");
        incBtn.addEventListener("click", function () {
          product.count++;
          localStorage.setItem("basket", JSON.stringify(basket));
          countCell.innerText = product.count;
          totalPriceCell.innerText = (product.count * product.price);
          totalAmount.innerText = (total += Number(product.price));
          basketCount++;
          basketCountSpan.innerText = basketCount;
          decBtn.removeAttribute("disabled");
        });
        const decBtn = document.createElement("button");
        decBtn.innerText = "-";
        let minus = decBtn.setAttribute("class", "btn-danger mx-2 decrease btn");

           if (product.count === 1) {
               decBtn.setAttribute("disabled", true);
            }
            decBtn.addEventListener("click", function () {
              if (product.count === 1) {
              const index = basket.findIndex((p) => p.id === product.id);
              basket.splice(index, 1);
              localStorage.setItem("basket", JSON.stringify(basket));
              basketcount--;
              basketcount.innerText = basketcount;
              decBtn.setAttribute("disabled", true);
           } 
           else {
            product.count--;
            localStorage.setItem("basket", JSON.stringify(basket));
            countCell.innerText = product.count;
            totalPriceCell.innerText = (product.count * product.price);
            totalAmount.innerText = (total -= Number(product.price));
            incBtn.removeAttribute("disabled");
          }
        });
        btnCell.appendChild(incBtn);
        btnCell.appendChild(decBtn);
        row.appendChild(btnCell);
         
        const delCell = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.innerHTML = '<i class="fa-solid fa-trash delete-item fafa-2x"></i>';
      delBtn.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to remove ${product.name} from the basket?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const index = basket.findIndex((p) => p.id === product.id);
          basket.splice(index, 1);
          localStorage.setItem("basket", JSON.stringify(basket));
          row.remove();
          totalAmount.innerText = (total -= totalPrice);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${product.name} has been removed from the basket.`,
            showConfirmButton: false,
            timer: 2000
          })
        }
      });
    });
    delCell.appendChild(delBtn);
    row.appendChild(delCell);
    
      tbody.appendChild(row);
    
      total += totalPrice;
      let deleteitem=document.querySelectorAll("button .delete-item");
    });
    
    totalAmount.innerText = total;
  })
})
}
const orderBtn = document.querySelector("#order-btn");
orderBtn.addEventListener("click", function () {
  Swal.fire({
    title: "Are you sure to Order?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Order",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("basket");
      tbody.innerHTML = "";
      totalAmount.innerText = "0.00";
      basketCount = 0;
      basketcount.innerText = basketCount;
      localStorage.removeItem("basket")
      tableDiv.innerHTML = "<p>Table is empty</p>";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your order has been successfully confirmed.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
});