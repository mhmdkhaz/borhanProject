window.onload = function () {
  let storedProducts = localStorage.getItem("cartProducts");
  if (storedProducts) {
    cartProduct = JSON.parse(storedProducts);
    printDataCart();
    totalPrice();
  }

  // hide cart or show
  styleCart();
};

const products = [
  {
    id: "1",
    type: "براج سامسونج",
    details: ["تبريد جيد", "حجم كبير", "مقاوم للصدأ"],
    price: "100",
    images: "images/product/img1.jpeg",
    count: 1,
  },
  {
    id: "2",
    type: "كاميرا",
    details: ["دقة عالية", "تصوير فيديو 4K", "خفيفة الوزن"],
    price: "200",
    images: "images/product/img2.jpeg",
    count: 1,
  },
  {
    id: "3",
    type: "سماعات",
    details: ["جودة صوت عالية", "عزل صوتي جيد", "خفيفة الوزن"],
    price: "300",
    images: "images/product/img3.jpeg",
    count: 1,
  },
  {
    id: "4",
    type: "لابتوب",
    details: ["أداء سريع", "شاشة عالية الدقة", "بطارية طويلة العمر"],
    price: "400",
    images: "images/product/img4.jpeg",
    count: 1,
  },
  {
    id: "5",
    type: "بيانو",
    details: ["صوت رائع", "تصميم أنيق", "مفاتيح وزنية"],
    price: "500",
    images: "images/product/img5.jpeg",
    count: 1,
  },
  {
    id: "6",
    type: "سخان",
    details: ["سهل الاستخدام", "تسخين سريع", "آمن للاستخدام"],
    price: "600",
    images: "images/product/img6.jpeg",
    count: 1,
  },
  {
    id: "7",
    type: "ميزان",
    details: ["قياس دقيق", "شاشة LCD", "تصميم أنيق"],
    price: "700",
    images: "images/product/img7.jpeg",
    count: 1,
  },
  {
    id: "8",
    type: "شاشة",
    details: ["جودة عالية للصورة", "شاشة كبيرة", "مداخل HDMI متعددة"],
    price: "800",
    images: "images/product/img8.jpeg",
    count: 1,
  },
  {
    id: "9",
    type: "قبضات",
    details: ["قوة عالية", "مقابض مريحة", "مادة متينة"],
    price: "900",
    images: "images/product/img9.jpeg",
    count: 1,
  },
  {
    id: "10",
    type: "مكيف",
    details: ["تبريد قوي", "صديق للبيئة", "تحكم عن بعد"],
    price: "1000",
    images: "images/product/img10.jpeg",
    count: 1,
  },
];

const printData = () => {
  let placeData = document.querySelector(".bodyTable");
  products.forEach((product) => {
    const detailsList = product.details
      .map((detail) => `<li>${detail}</li>`)
      .join("");

    placeData.innerHTML += `
      <div class="row" data-id="${product.id}">
        <div class="cell" data-title="Full Name">
          ${product.type}
        </div>
        <div class="cell" data-title="Age">
          <ul style="text-align:right;">
            ${detailsList}
          </ul>
        </div>
        <div class="cell" data-title="Job Title">
          ${product.price}
        </div>
        <div class="cell" data-title="Location">
          <img src="${product.images}" alt/>
        </div>
        <div class="cell" data-title="Location">
          <button class="addToCart" onclick="allFun('${product.id}')">add to cart</button>
        </div>
      </div>
    `;
  });
};
printData();

// content all fun after click add to cart
const allFun = (id) => {
  filterData(id);
  printDataCart();
  totalPrice();
  styleCart();
  //  save data in localStorage
  localStorage.setItem("cartProducts", JSON.stringify(cartProduct));
};

let cartProduct = [];
const filterData = (id) => {
  const findProduct = products.find((product) => product.id === id);
  const existingProductIndex = cartProduct.findIndex(
    (product) => product.id === id
  );

  if (existingProductIndex !== -1) {
    cartProduct[existingProductIndex].count++;
  } else {
    cartProduct.push(findProduct);
  }
};

const printDataCart = () => {
  let cart = document.querySelector(".cartWrap");
  cart.innerHTML = ""; // مسح العناصر السابقة

  cartProduct.forEach((product) => {
    cart.innerHTML += `
      <li class="items even" style="margin:10px">
        <div class="infoWrap">
          <div class="cartSection info">
            <img src="${product.images}" alt="" class="itemImg" />
            <h3>${product.type}</h3>
            <p>${product.count}</p>
            <p>${product.price} ل.س</p>
          </div>
          <div class="prodTotal cartSection">
            <p>${product.price * product.count}</p>
          </div>
        </div>
      </li>
    `;
  });
};

const totalPrice = () => {
  let total = 0;
  cartProduct.forEach((product) => {
    total += product.price * product.count;
  });
  // print price
  let supTotal = document.querySelector(".subtotal h2");
  supTotal.innerHTML = total + " ل.س";
};

const cancelOrder = () => {
  let cart = document.querySelector(".cartWrap");
  let supTotal = document.querySelector(".subtotal h2");
  cart.innerHTML = "";
  supTotal.innerHTML = 0;

  // empty data from array
  cartProduct = [];
  // remove data from local storage
  localStorage.removeItem("cartProducts");
  // hide cart
  styleCart();
};
let cancel = document.querySelector(".cancel");
cancel.addEventListener("click", cancelOrder);

// ---- filter form ----

let isArabicValid = false;
let isIdValid = false;
let isCaptchaValid = false;

const validateInput = () => {
  const arabicInput = document.querySelector(".fullName").value;
  const numberId = document.querySelector(".numberId");
  const phoneNubmer = document.querySelector(".phoneNubmer");

  // validation arabic
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  if (arabicRegex.test(arabicInput)) {
    isArabicValid = true;
  } else {
    alert("الرجاء إدخال حروف عربية فقط");
    isArabicValid = false;
  }

  // id number
  const firstPart = numberId.value.substring(0, 2);
  const valueNumberId = numberId.value;

  const allowedFirstDigits = [
    "14",
    "13",
    "12",
    "11",
    "10",
    "09",
    "08",
    "07",
    "06",
    "05",
    "04",
    "03",
    "02",
    "01",
  ];

  if (allowedFirstDigits.includes(firstPart) && valueNumberId.length === 11) {
    isIdValid = true;
  } else {
    alert("الرجاء ادخال ارقام بالشكل الصحيح");
    isIdValid = false;
  }

  // mtn syriatel
  const firstPartPhone = phoneNubmer.value.substring(0, 2);
  const valueNumber = phoneNubmer.value;

  const mtnSyriatel = ["09"];

  if (mtnSyriatel.includes(firstPartPhone) && valueNumber.length === 10) {
    isIdValid = true;
  } else {
    alert("الرجاء ادخال الهاتف بشكل صحيح");
    isIdValid = false;
  }
};

// Function to generate random alphanumeric CAPTCHA text
function generateCaptchaText(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captchaText = "";
  for (let i = 0; i < length; i++) {
    captchaText += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return captchaText;
}

// Function to display the CAPTCHA challenge
function displayCaptcha() {
  const captchaDiv = document.getElementById("captcha");
  const captchaText = generateCaptchaText(6); // You can adjust the length of the CAPTCHA text
  captchaDiv.textContent = captchaText; // Display the generated text in the HTML

  // Store the generated CAPTCHA text in a session variable (you can use other storage methods)
  sessionStorage.setItem("captcha", captchaText);
}

// Function to validate user input against the generated CAPTCHA text
function validateCaptcha() {
  const userInput = document.getElementById("userInput").value;
  const captcha = sessionStorage.getItem("captcha");

  if (userInput === captcha) {
    isCaptchaValid = true;
    displayCaptcha();
  } else {
    alert("الرجاء ادخالcaptcha بالشكل الصحيح"); // You can modify this according to your application
    // Optionally, you can choose to clear the input field upon failed validation
    document.getElementById("userInput").value = "";
    // Generate a new CAPTCHA challenge after failed validation
    displayCaptcha();
  }
}
// Display the CAPTCHA challenge on page load
displayCaptcha();

let orderd = document.querySelector(".orderdContinue");
orderd.addEventListener("click", () => {
  validateInput();
  validateCaptcha();
  if (isArabicValid && isIdValid && isCaptchaValid) {
    alert("تم تأكيد الطلب بنجاح!"); // رسالة عند تحقق جميع الشروط
  }
});

// style cart

const cartAll = document.querySelector(".cartAll");
const styleCart = () => {
  if (cartProduct.length > 0) {
    cartAll.style.display = "block";
  } else {
    cartAll.style.display = "none";
  }
};

// close information
const formInfo = document.querySelector(".formInfo");
const modal = document.querySelector(".modal");

const closeInfoBtn = document.querySelector(".closeInfo");
const closeInfoFun = () => {
  formInfo.style.transition = "transform 0.3s ease"; // Apply transition property
  modal.style.transition = "transform 0.3s ease"; // Apply transition property
  setTimeout(() => {
    formInfo.style.transform = "scale(0)";
    modal.style.transform = "scale(0)";
  }, 50); // Add a slight delay before applying the transform
};
closeInfoBtn.addEventListener("click", () => closeInfoFun());

const openFormInfo = document.querySelector(".openFormInfo");
const openFormInfooFun = () => {
  formInfo.style.transition = "transform 0.3s ease"; // Apply transition property
  modal.style.transition = "transform 0.3s ease"; // Apply transition property
  formInfo.style.transform = "translate(-50%, -50%) scale(1)";
  modal.style.transform = "scale(1)";
};
openFormInfo.addEventListener("click", () => openFormInfooFun());
