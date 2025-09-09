const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    }
    else {
        document.getElementById("card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

// activity
const removeActive = () => {
    const catButton = document.querySelectorAll(".category-btn");
    catButton.forEach(btn => btn.classList.remove("active"));
}

// categories

const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            displayCategory(data.categories)
        })
}

// displayCategory
const displayCategory = (categories) => {
    const cardCategory = document.getElementById("category-container")
    cardCategory.innerHTML = "";

    categories.forEach((category) => {
        const btnCategory = document.createElement("div");
        btnCategory.innerHTML = `
        <div>
        <button id="category-btn-${category.id}" onclick="loadCategoryBtn(${category.id})" class="btn bg-[#F0FDF4] border-none hover:bg-[#15803D] text-[#1F2937] hover:text-white font-medium rounded w-full justify-start category-btn">
        ${category.category_name}</button>
        </div>
        `;
        cardCategory.append(btnCategory)
    })

}


// plants
const loadPlants = () => {
    const url = `https://openapi.programming-hero.com/api/plants`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            displayPlants(data.plants)
        })
}

// array of object
const displayPlants = (posts) => {
    // 1. get the container 
    const postCard = document.getElementById("card-container")

    postCard.innerHTML = "";
    // console.log(postContainer)



    posts.forEach((post) => {

        //2. create HTML element
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-white rounded-lg p-3 space-y-3 inter-font h-full shadow-md">
            <img src="${post.image}" class="w-[298px] h-[178px] rounded-lg" alt="">
            <h2 id="tree-name" class="font-semibold text-sm">${post.name}</h2>
            <p id="tree-details" class="details text-xs text-[#1F2937]">${post.description}</p>

            <div class="flex justify-between">
                <button class="rounded-full font-medium text-sm bg-[#DCFCE7] text-[#15803D] py-1 px-3 hover:shadow-sm"
                id="tree-model">${post.category}</button>
                <h2 class="font-semibold text-sm text-[#1F2937]">৳<span>${post.price}</span></h2>
            </div>

            <button id="cart-${post.id}" onclick="loadCartHistory(${post.id})" class="btn border-none shadow-none bg-[#15803D] text-white hover:bg-[#DCFCE7] rounded-full w-full hover:shadow-md hover:text-black">
            Add to Cart</button>
        </div>
        `
        //3. add li into container
        postCard.append(div)

    })
}


// load category btn
const loadCategoryBtn = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActive(); // remove all active class
            const clickBtn = document.getElementById(`category-btn-${id}`);
            clickBtn.classList.add("active");   // add active class
            displayCategoryBtn(data.plants);
        })
}



// display cart btn
const displayCategoryBtn = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    cards.forEach((card) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-white rounded-lg p-3 space-y-3 inter-font h-full shadow-md">
            <img src="${card.image}" class="w-[298px] h-[178px] rounded-lg" alt="">
            <h2 id="tree-name" onclick="displayTreeDetails({name:${card.name},category:${card.category},price:${card.price},description:${card.description},image:${card.image}})" class="font-semibold text-sm">${card.name}</h2>
            <p id="tree-details" class="details text-xs text-[#1F2937]">${card.description}</p>

            <div class="flex justify-between">
                <button class="rounded-full font-medium text-sm bg-[#DCFCE7] text-[#15803D] py-1 px-3 hover:shadow-sm"
                id="tree-model">${card.category}</button>
                <h2 class="font-semibold text-sm text-[#1F2937]">৳<span>${card.price}</span></h2>
            </div>

            <button id="cart-${card.id}" onclick="loadCartHistory(${card.id})" class="btn border-none shadow-none bg-[#15803D] text-white hover:bg-[#DCFCE7] rounded-full w-full hover:shadow-md hover:text-black">
            Add to Cart</button>
        </div>
        `
        cardContainer.append(div)
    })
}


// add your history
const loadCartHistory = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            let tree = data.plants
            displayHistory([tree]);
            displayTreeDetails([tree])
        })
}


// display your history
const displayHistory = (carts) => {
    const cardHistoryContainer = document.getElementById("your-cart-container");
    // cardHistoryContainer.innerHTML = "";

    carts.forEach(cart => {

        alert(cart.name + " has been added to the cart")

        const div = document.createElement("div");
        div.innerHTML = `
        <div id="cart-div-${cart.id}" class="flex items-center justify-between bg-[#F0FDF4] rounded-lg py-2 px-3">
            <div>
                <h1 class="font-semibold text-sm text-[#1F2937]">${cart.name}</h1>
                <p class="text-gray-400">৳<span id="cart-price-${cart.price}" onclick="totalPrice(${cart.price})">${cart.price}</span> x 1</p>
            </div>
                <span onclick="deleteBtn(${cart.id})" class="text-red-600"><i class="fa-solid fa-xmark"></i></span>
        </div> 
        `;

        cardHistoryContainer.append(div);
    })
}


// delete button
const deleteBtn = (id) => {
    const element = document.getElementById(`cart-div-${id}`)
    if (element) {
        element.remove();
    }
};

// show modal
const displayTreeDetails = (data) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = "";

    data.forEach((details) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-white p-2 rounded inter-font">
            <img src="${details.image}" alt="${details.name}" class="rounded w-full h-48">
            <h1><span class="font-bold">Name: </span> ${details.name}</h1>
            <h1><span class="font-bold">Category: </span> ${details.category}</h1>
            <h1><span class="font-bold">Price: </span> ৳ ${details.price}</h1>
            <p> <span  class="font-medium">Description : </span> ${details.description}</p>
        </div>
    ` ;
        detailsBox.append(div);
    })

    document.getElementById("tree_modal").showModal();
}

loadCategory()
loadPlants()
