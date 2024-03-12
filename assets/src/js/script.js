// Counter

function startCountdown(countdownId, endDate) {
    var countDownDate = new Date(endDate).getTime();

    // Update the countdown every 1 second
    var x = setInterval(function () {
        var now = new Date().getTime();
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown for the specific countdown element
        var countdownElement = document.getElementById(countdownId);
        if (countdownElement) {
            countdownElement.querySelector("#days").innerHTML = days.toString().padStart(2, '0');
            countdownElement.querySelector("#hours").innerHTML = hours.toString().padStart(2, '0');
            countdownElement.querySelector("#minutes").innerHTML = minutes.toString().padStart(2, '0');
            countdownElement.querySelector("#seconds").innerHTML = seconds.toString().padStart(2, '0');

            // If the countdown is over, display a message
            if (distance < 0) {
                clearInterval(x);
                countdownElement.innerHTML = "EXPIRED";
            }
        } else {
            clearInterval(x);
        }
    }, 1000);
}

// Start the countdown for all elements with the "countdown" id
startCountdown("countdown", "Oct 31, 2024 00:00:00");
startCountdown("countdown2", "Nov 30, 2024 12:00:00");




// Control DropMenu

let dropMbtn = document.querySelector("#dropMenuBtn");
let dropMenu = document.querySelector(".dropMenu");
let dropMenuOver = document.querySelector(".dropMenuOverlay");

dropMbtn.addEventListener("click", () => {
    dropMenu.classList.toggle("active");
    dropMenuOver.classList.toggle("active");

});


dropMenuOver.addEventListener("click", () => {
    dropMenu.classList.remove("active");
    dropMenuOver.classList.remove("active");
});

let closeMenu = document.querySelector("#closeMenu");
closeMenu.addEventListener("click", () => {
    dropMenu.classList.remove("active");
    dropMenuOver.classList.remove("active");
});


function hideDropdownMenu() {
    var screenWidth = window.innerWidth;

    if (screenWidth >= 768) {
        dropMenu.classList.remove("active");
        dropMenuOver.classList.remove("active");

    }
}

// Call the function initially to set the initial state
hideDropdownMenu();

// Listen for window resize event to adjust the dropdown menu visibility
window.addEventListener('resize', hideDropdownMenu);

// Repeat cards

// Control Swiper
let sliderIsCard = document.querySelector(".swiper-wrapper");
let nextBtn = document.querySelector(".swiper-button-next");
let prevBtn = document.querySelector(".swiper-button-prev");
let allCards = document.querySelectorAll(".swiper-slide");
let index = 0; // Initialize index to 0

let slideWidth; // Declare slideWidth variable
let slidesToShow; // Declare slidesToShow variable

// Function to update slide width and slides to show based on window width
function updateSlideSettings() {
    if (window.innerWidth > 1200) {
        slideWidth = 292;
        slidesToShow = 4;
    } else if (window.innerWidth < 1200 && window.innerWidth > 993) {
        slideWidth = 330;
        slidesToShow = 3;
    }
    else if (window.innerWidth < 993 && window.innerWidth > 768) {
        slideWidth = 365;
        slidesToShow = 2;
    }
    else if (window.innerWidth < 768 && window.innerWidth > 668) {
        slideWidth = 310;
        slidesToShow = 2;
    }
    else if (window.innerWidth < 668 && window.innerWidth > 576) {
        slideWidth = 425;
        slidesToShow = 1;
    }
    else if (window.innerWidth < 576 && window.innerWidth > 450) {
        slideWidth = 369;
        slidesToShow = 1;
    }
    else if (window.innerWidth < 450) {
        slideWidth = 310;
        slidesToShow = 1;
    }
}

// Call the function initially to set the initial slide width and slides to show
updateSlideSettings();

// Function to go to the next slide
function goToNext() {
    if (index < allCards.length - slidesToShow) {
        index++;
        updateSlider();
    }
}

// Function to go to the previous slide
function goToPrev() {
    if (index > 0) {
        index--;
        updateSlider();
    }
}

// Function to update the slider position
function updateSlider() {
    let translateXValue = -index * slideWidth;
    sliderIsCard.style.transform = `translateX(${translateXValue}px)`;
}

// Event listeners for next and previous buttons
nextBtn.addEventListener("click", goToNext);
prevBtn.addEventListener("click", goToPrev);

// Event listener to update slide width and slides to show when the window is resized
window.addEventListener("resize", () => {
    updateSlideSettings();
    updateSlider(); // Update the slider when the window is resized
});


var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto', // Adjusts number of slides per view based on container's width
    grabCursor: true, // Shows grab cursor while dragging
    freeMode: true,
    // Adjust free mode stiffness
    freeModeStiffness: 5, // You can adjust this value as needed
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


document.getElementById('scrollBtn').addEventListener('click', function () {
    // Get the current scroll position
    var startY = window.scrollY;
    // Define the target scroll position
    var targetY = 700;
    // Calculate the distance to scroll
    var distance = targetY - startY;
    // Define the duration of the scroll animation
    var duration = 200; // in milliseconds

    // Start time of the scroll animation
    var startTime = null;

    // Define the scroll animation function
    function scrollAnimation(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var percentage = Math.min(timeElapsed / duration, 1);
        var easedPercentage = easeInOutCubic(percentage);
        window.scrollTo(0, startY + distance * easedPercentage);
        if (timeElapsed < duration) {
            requestAnimationFrame(scrollAnimation);
        }
    }

    // Start the scroll animation
    requestAnimationFrame(scrollAnimation);
});

// Easing function for smooth animation
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}








// Data for the cards
// const cardData = [
//     {
//         imageSrc: "https://cdn.discordapp.com/attachments/1153024710263713832/1161760541732245594/gamepad2.svg?ex=653978d1&is=652703d1&hm=1f794dde18d9ef03eba08bc5ad899415ae22da4ed430bca10d0e1980d23a3fd4&",
//         discount: "-35%",
//         productName: "AK-900 Wired Keyboard",
//         originalPrice: "$961",
//         salePrice: "$1160",
//         rating: 4,
//         numReviews: 75,
//     },
//     {
//         imageSrc: "https://cdn.discordapp.com/attachments/1153024710263713832/1161764772946137179/gamepad3.svg?ex=65397cc2&is=652707c2&hm=da12fc9be34e665206480d574bff375f344360448c87cb954f0c8d6354b0ead1&",
//         discount: "-30%",
//         productName: "IPS LCD Gaming Monitor",
//         originalPrice: "$370",
//         salePrice: "$400",
//         rating: 5,
//         numReviews: 99,
//     },
//     {
//         imageSrc: "https://cdn.discordapp.com/attachments/1153024710263713832/1161767015531413534/gamepad4.svg?ex=65397ed9&is=652709d9&hm=4887ba275299402e911f6a423e0bd1fce9684b7c7907152c6fe8a05351bfb217&",
//         discount: "-25%",
//         productName: "S-Series Comfort Chair ",
//         originalPrice: "$375",
//         salePrice: "$400",
//         rating: 4,
//         numReviews: 99,
//     },
//     {
//         imageSrc: "https://cdn.discordapp.com/attachments/1153024710263713832/1161767494382518302/gamepad5.svg?ex=65397f4b&is=65270a4b&hm=fb1c570a79b61f97d3950eba38cb1ced8f0bc61c07e1a61e3bf64f08bb29cada&",
//         discount: "-35%",
//         productName: "ASUS FHD Gaming Laptop",
//         originalPrice: "$960",
//         salePrice: "$1160",
//         rating: 5,
//         numReviews: 65,
//     },
//     {
//         imageSrc: "https://cdn.discordapp.com/attachments/1146087594367664238/1161810894033002516/opbwewiupdt.svg?ex=6539a7b6&is=652732b6&hm=0b0a897fc534213f3b25e63d2045198819d7a71ef9dbb0fbad5e00436f4b4ae2&",
//         discount: "-10%",
//         productName: "Breed Dry Dog Food",
//         originalPrice: "$100",
//         salePrice: "$110",
//         rating: 3,
//         numReviews: 35,
//     },
//     // Add more card data as needed
// ];

// // Function to create and populate a card
// function createCard(cardData) {
//     const cardContainer = document.getElementById("slide-cards-container");
//     const cardDiv = document.createElement("div");
//     cardDiv.classList.add("card swiper-slide");

//     cardDiv.innerHTML = `
//         <div class="image">
//             <img src="${cardData.imageSrc}" alt="">
//             <div class="on-sale">
//                 <p class="w-fit">${cardData.discount}</p>
//                 <div class="sale-icons">
//                     <!--<i class="fa-sharp fa-regular fa-heart"></i>-->
//                     <i class="fa-sharp fa-solid fa-eye"></i>
//                 </div>
//             </div>
//             <div class="add-cart">Add To Cart <i class="fa-regular fa-cart-shopping" style="color: #ffffff;"></i></div>
//         </div>
//         <div class="product-info">
//             <h3>${cardData.productName}</h3>
//             <h4>${cardData.salePrice} <del>${cardData.originalPrice}</del></h4>
//             <p>${getStarRatingHTML(cardData.rating)} (${cardData.numReviews})</p>
//         </div>
//     `;

//     cardContainer.appendChild(cardDiv);
// }
// // Loop through the card data and create cards
// cardData.forEach((data) => {
//     createCard(data);
// });


// Function to generate star rating HTML
function getStarRatingHTML(rating) {
    const numStars = 5;
    const fullStar = '<i class="fa-solid fa-star"></i>';
    const emptyStar = '<i class="fa-solid fa-star unusedstar"></i>';
    const fullStars = fullStar.repeat(Math.floor(rating));
    const halfStar = rating % 1 !== 0 ? '<i class="fa-solid fa-star-half"></i>' : '';
    const emptyStars = emptyStar.repeat(numStars - Math.ceil(rating));
    return fullStars + halfStar + emptyStars;
}


const prevButton = document.getElementById("nextButton");
prevButton.addEventListener("click", function () {
    // When "prevButton" is clicked, find the button with the class "slick-next slick-arrow" and click it.
    const nextButton = document.querySelector(".slick-next.slick-arrow");
    if (nextButton) {
        nextButton.click(); // Click the "Next" button
    }
});


const nextButton = document.getElementById("prevButton");
nextButton.addEventListener("click", function () {
    // When "prevButton" is clicked, find the button with the class "slick-next slick-arrow" and click it.
    const prevButton = document.querySelector(".slick-prev.slick-arrow");
    if (prevButton) {
        prevButton.click(); // Click the "Next" button
    }
});


// Function to disable scrolling
function disableScroll() {
    // Get the current scroll position
    const scrollPosition = window.scrollY;

    // Set the body to position fixed to prevent scrolling
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
}

// Function to enable scrolling
function enableScroll() {
    // Retrieve the previous scroll position
    const scrollPosition = parseInt(document.body.style.top || '0', 10);

    // Set the body back to its original position and remove the fixed positioning
    document.body.style.position = '';
    document.body.style.top = '';

    // Scroll the window back to the previous scroll position
    window.scrollTo(0, Math.abs(scrollPosition));
}

// Example usage:
// To disable scrolling
disableScroll();

// To enable scrolling
enableScroll();


// Get the user icon element and the login-mini element


let prevScrollPos = window.pageYOffset;
const navbar = document.getElementById("navbar");
const dropmenu = document.querySelector(".dropMenu");

window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const isDropmenuActive = dropmenu.classList.contains("active");

    if (!isDropmenuActive) {
        if (prevScrollPos > currentScrollPos) {
            // Scrolling up, show the navbar
            navbar.classList.remove("hidden");
        } else {
            // Scrolling down, hide the navbar
            navbar.classList.add("hidden");
        }
    }
    prevScrollPos = currentScrollPos;
};
// createCards.js

function addCard(imageSrc, title, price, discount, rating, numberOfReviews) {
    var cardTemplate = document.querySelector("#card-template").cloneNode(true);
    cardTemplate.removeAttribute("id");

    var productImage = cardTemplate.querySelector("#productimage img");
    productImage.src = imageSrc;

    var productTitle = cardTemplate.querySelector(".product-info h3");
    productTitle.textContent = title;

    var productPrice = cardTemplate.querySelector(".product-info h4");
    productPrice.innerHTML = `$${price} <del>$${discount}</del>`;

    var productRating = cardTemplate.querySelector(".product-info p");
    var stars = "";

    for (var i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else {
            stars += '<i class="fa-solid fa-star unusedstar"></i>';
        }
    }

    productRating.innerHTML = stars + ` (${numberOfReviews})`;

    var slideProductsContainer = document.querySelector("#slide-products-container");
    slideProductsContainer.appendChild(cardTemplate);

    cardTemplate.style.display = "block";
}


addCard(
    "https://cdn.discordapp.com/attachments/1146087594367664238/1161873998947307570/5hneu2eb2py.svg?ex=6539e27b&is=65276d7b&hm=42cb90fe6dc48b4875a6cc5ca0e8f9df3adb1413aaf1d2ff5ded3853d5b3538f&",
    "Gucci duffle bag",
    960,
    1160,
    4,
    52
);

addCard(
    "https://cdn.discordapp.com/attachments/1146087594367664238/1161874335267553320/d4gfozmei2d.svg?ex=6539e2cc&is=65276dcc&hm=9da6219096e47b7d0d056c7c1c16df408945e063fdefb20f69a6955a61433c59&",
    "RGB liquid CPU Cooler",
    160,
    170,
    5,
    95
);

addCard(
    "https://cdn.discordapp.com/attachments/1146087594367664238/1161874698808856736/iugf2tlt5as.svg?ex=6539e322&is=65276e22&hm=0d01bb8802812df0c5b761c27591e1859f0c8bc9685a1bde24f0f4ae234dd1bd&",
    "Small BookSelf",
    360,
    0,
    3,
    77
);



// Add Cards 3

const products = [
    {
        name: "CANON EOS DSLR Camera",
        price: "$360",
        rating: 4,
        reviews: 95,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162820406944735343/m0zxk4zniii.svg?ex=653d53e5&is=652adee5&hm=0a7fcc54d5b9acfae1784bb72df5ca4558bda3f526bf2de0cd8787dbe8058059&",
    },
    {
        name: "ASUS FHD Gaming Laptop",
        price: "$700",
        rating: 5,
        reviews: 325,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162820593243127828/nei3pt3mm4p.svg?ex=653d5411&is=652adf11&hm=74d50830d43783e2390337f43178fad7a6de06673e805f43b70c2f377efc564d&",
    },
    {
        name: "Curology Product Set ",
        price: "$500",
        rating: 4,
        reviews: 145,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162820774592254013/evqvxpvo0qv.svg?ex=653d543c&is=652adf3c&hm=14e93b2b6f40e909b4123a8161c3ce65079442cd9e931e9288dbbf870e593e78&",
    },
    {
        name: "Kids Electric Car",
        price: "$950",
        rating: 5,
        reviews: 65,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162821439846621204/l5enwjl2vy4.svg?ex=653d54db&is=652adfdb&hm=090848378ce4ffac99cae35aa7245547c762aa83393cf77d0b58b391df0c1fbb&",
    },
    {
        name: "Jr. Zoom Soccer Cleats",
        price: "$1160",
        rating: 5,
        reviews: 35,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162821687742570516/yrf3tgaedw4.svg?ex=653d5516&is=652ae016&hm=3aaf3fe155fcedab5e36a8953c8aaeaa4a116b7fd39af0987190f2977bcee130&",
    },
    {
        name: "GP11 Shooter USB Gamepad",
        price: "$660",
        rating: 4.5,
        reviews: 59,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162821830101446686/gmvoqqbud1u.svg?ex=653d5538&is=652ae038&hm=b9954ca317e30b9e8035249b530be2357980298a110c085de1f8de72fd41ac63&",
    },
    {
        name: "Quilted Satin Jacket",
        price: "$660",
        rating: 4.5,
        reviews: 55,
        imageUrl: "https://cdn.discordapp.com/attachments/1146087594367664238/1162822016836063352/0vcfatb0htf.svg?ex=653d5565&is=652ae065&hm=ee6af05edafa88e1f44e90844eddad40bf86a660244e0a295be04e6a311a3629&",
    },

    // Add more product objects as needed
];

// Function to create a product card

// Function to create a product card with custom star icons
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("card swiper-slide");

    card.innerHTML = `
    <div class="image">
      <img src="${product.imageUrl}" alt="${product.name}">
      <div class="on-sale">
        <div class="sale-icons">
          <!--<i class="fa-sharp fa-regular fa-heart"></i>-->
          <i class="fa-sharp fa-solid fa-eye"></i>
        </div>
      </div>
      <div class="add-cart">Add To Cart <i class="fa-regular fa-cart-shopping" style="color: #ffffff;"></i></div>
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <h4 class="d-flex gap-15 align-center">${product.price}
        <p>
          ${getStarRatingHtml(product.rating)} (${product.reviews})
        </p>
      </h4>
    </div>
  `;

    return card;
}

// Function to generate HTML for star rating
// Function to generate HTML for star rating without spacing
function getStarRatingHtml(rating) {
    const starIcons = Array(Math.floor(rating)).fill('<i class="fa-solid fa-star"></i>');
    if (rating % 1 > 0) {
        starIcons.push('<i class="fa-solid fa-star-half"></i>');
    }
    return starIcons.join('');
}


// Get the product cards container
const container = document.getElementById("product-cards-container");

// Create and append product cards to the container
products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
});





