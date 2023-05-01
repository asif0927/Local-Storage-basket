let sweets=[
    {
      id:1,
      name:'Türk Paxlavası',
      price:12,
      imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSGYWDLgLdPM7lPln4wksndHbd334FbJGj7A&usqp=CAU',
      disCountPercantage:10,
    },
    {
        id:2,
        name:'Künefe',
        price:15,
        imageUrl:'https://veliaht.com.tr/wp-content/uploads/2020/08/ku%CC%88nefe.png',
        disCountPercantage:25,
    },
    {
        id:3,
        name:'Güllaç',
        price:10,
        imageUrl:' https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/G%C3%BClla%C3%A7_with_whipped_cream.jpg/375px-G%C3%BClla%C3%A7_with_whipped_cream.jpg ',
        disCountPercantage:20,
    },
    {
        id:4,
        name:'Türk Lokumu',
        price:8,
        imageUrl:' https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/TurkishDelightDisplay.jpg/375px-TurkishDelightDisplay.jpg   ',
        disCountPercantage:30,
    },
    {
        id:5,
        name:'Azerbaycan Paxlavası',
        price:9,
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Pahlava1.jpg/330px-Pahlava1.jpg',
        disCountPercantage:15,
    },
    {
        id:6,
        name:'Hədik',
        price:5,
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/A%C5%9Fure_kaseleri.JPG/375px-A%C5%9Fure_kaseleri.JPG',
        disCountPercantage:0,
    },
    {
        id:7,
        name:'Dondurma',
        price:10,
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Mara%C5%9F_dondurma.jpg/375px-Mara%C5%9F_dondurma.jpg',
        disCountPercantage:20,
    },
    {
        id:8,
        name:'Şokaladlı tort',
        price:25,
        imageUrl:' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA_skPfGqTfQZ4ifYtPBkHJsWySK8CYAB5ljzoRRU9PryxCIcukxdL&usqp=CAE&s ',
        disCountPercantage:16,
    },
];
let sweetsWrapper=document.querySelector(".sweets-div");
let basketcount=document.querySelector(".icon-card");
let searchinp=document.querySelector("#searchinp");
let sortSelect = document.querySelector(".sort-select");
searchinp.addEventListener("keyup",function(e){
   let filteredSweet=sweets.filter(sweet=>sweet.name.toLowerCase().includes(searchinp.value));
   sweetsWrapper.innerHTML = "";
   filteredSweet.forEach((sweet) => {
    const discountedPrice = sweet.price - (sweet.price * sweet.disCountPercantage / 100);
        const priceText = sweet.disCountPercantage > 0 
        ? `<span>Price: </span><span id="price">${discountedPrice}</span><span class="fw-bold">&#x20bc;</span> <span class="text-muted"><del>${sweet.price.toFixed(2)}&#x20bc;</del></span><span class="badge bg-danger ml-2">${sweet.disCountPercantage}% Endrim</span>`
        : `<span>Price: </span><span id="price">${sweet.price}</span><span class="fw-bold">&#x20bc;</span>`;
        sweetsWrapper.innerHTML += `<div class="col-3 ml-5 mb-3">
        <div class="card" data-id="${sweet.id}" style="width: 18rem;">
            <img class="card-img-top" src="${sweet.imageUrl}" alt="${sweet.name}">
            <div class="card-body">
              <h6 class="card-title"><span>Name: </span> <span id="name" class="fw-bold">${sweet.name}</span></h6>
              <p class="card-text">${priceText}</p>
              <button class="btn btn-primary add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>`;
   });
});
document.addEventListener("DOMContentLoaded",()=>{
    if (!localStorage.getItem("basket")) {
        localStorage.setItem("basket",JSON.stringify([]));
    }
    basketcount.innerText=JSON.parse(localStorage.getItem("basket")).length;
    sweets.forEach((sweet)=>{
        const discountedPrice = sweet.price - (sweet.price * sweet.disCountPercantage / 100);
        const priceText = sweet.disCountPercantage > 0 
        ? `<span>Price: </span><span id="price">${discountedPrice.toFixed(2)}</span><span class="fw-bold">&#x20bc;</span> <span class="text-muted"><del>${sweet.price.toFixed(2)}&#x20bc;</del></span><span class="badge bg-danger ml-2">${sweet.disCountPercantage}% Endrim</span>`
        : `<span>Price: </span><span id="price">${sweet.price.toFixed(2)}</span><span class="fw-bold">&#x20bc;</span>`;
        sweetsWrapper.innerHTML += `<div class="col-3 ml-5 mb-3">
        <div class="card" data-id="${sweet.id}" style="width: 18rem;">
            <img class="card-img-top" src="${sweet.imageUrl}" alt="${sweet.name}">
            <div class="card-body">
              <h6 class="card-title"><span>Name: </span> <span id="name" class="fw-bold">${sweet.name}</span></h6>
              <p class="card-text">${priceText}</p>
              <button class="btn btn-primary add-to-cart">Add to Cart</button>
            </div>
          </div>
        </div>`;
    });

    sortSelect.addEventListener("change",()=>{
        let sortopt=sortSelect.value;
        let sortsweetarr=[];
        if(sortopt =="priceAsc"){
            sortsweetarr=sweets.sort((a,b)=>a.price-b.price);
        }
        else if(sortopt =="priceDesc"){
            sortsweetarr=sweets.sort((a,b)=>b.price-a.price);
        }
        sweetsWrapper.innerHTML ="";
        sortsweetarr.forEach((sweet)=>{
            const discountedPrice = sweet.price - (sweet.price * sweet.disCountPercantage / 100);
            const priceText = sweet.disCountPercantage > 0 
            ? `<span>Price: </span><span id="price">${discountedPrice}</span><span class="fw-bold">&#x20bc;</span> <span class="text-muted"><del>${sweet.price.toFixed(2)}&#x20bc;</del></span><span class="badge bg-danger ml-2">${sweet.disCountPercantage}% Endrim</span>`
            : `<span>Price: </span><span id="price">${sweet.price}</span><span class="fw-bold">&#x20bc;</span>`;
            sweetsWrapper.innerHTML += `<div class="col-3 ml-5 mb-3">
            <div class="card" data-id="${sweet.id}" style="width: 18rem;">
                <img class="card-img-top" src="${sweet.imageUrl}" alt="${sweet.name}">
                <div class="card-body">
                  <h6 class="card-title"><span>Name: </span> <span id="name" class="fw-bold">${sweet.name}</span></h6>
                  <p class="card-text">${priceText}</p>
                  <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
              </div>
            </div>`;
        })
    })

    let buttons = Array.from(sweetsWrapper.querySelectorAll('.add-to-cart'));

buttons.forEach((btn) => {
    btn.addEventListener("click", function() {
        basketcount.innerText=JSON.parse(localStorage.getItem("basket")).length+1;
        let checkBasket = JSON.parse(localStorage.getItem("basket"));
        let id = this.parentElement.parentElement.getAttribute("data-id");
        let sweetname=this.previousElementSibling.previousElementSibling.children[1].textContent;
        let existing = checkBasket.find((item)=>item.id==id);

        if (existing) {
            existing.count++;
        }
        else{
            const obj = {
                id: id,
                name: sweetname,
                price: this.previousElementSibling.children[1].textContent,
                imgURL: this.parentElement.previousElementSibling.src,
                count: 1
            };
            checkBasket.push(obj);
        }
        localStorage.setItem("basket", JSON.stringify(checkBasket));
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${sweetname} səbətə uğurla əlavə olundu!`,
            showConfirmButton: false,
            timer: 2000
        })
    })
});
});