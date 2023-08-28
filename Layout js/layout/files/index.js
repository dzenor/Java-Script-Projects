let allData;
let filteredData;
let showCount = 4;

let btnLoad = document.getElementById("loadmore");
let iconHeart = document.getElementById("iconHeart");

window.onload = function () {
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      allData = jsonData;
      filteredData = jsonData;
      console.log(jsonData);

      btnLoad.addEventListener("click", function () {
        showCards(filteredData);
      });

      showCards(allData);
    });
};

function showCards(data) {
  for (let i = showCount - 4; i < showCount; i++) {
    console.log(i);
    if (i < data.length) {
      console.log(data.length);
      const element = data[i];
      btnLoad.style.display = "block";
      document.querySelector(".cardContainer").innerHTML += `
      <div id="card-id" class="card">
      <div class="top">
        <div class="userDetails">
          <div class="profile-img circle"><img  class="profile-img" src="${element.profile_image}" alt="" /></div>
          <h3 class="elName">${element.name} <br /><span class="elDate">${element.date}</span><br /></h3>
        </div>
        <img src="icons/instagram-logo.svg" alt="" />
      </div>
      <div class="card-img"><img class="card-img" src="${element.image}" alt="" /></div>

      <div class="card-paragraph">
        <p class="elParagraph">
          ${element.caption}
        </p>
      </div>
      <hr />
      <div class="card-footer">
        <img class="iconHeart" src="icons/heart.svg" alt="" /> <span class="likes">${element.likes}</span>
      </div>
    </div>
                `;
    } else {
      btnLoad.style.display = "none";
    }
  }
  showCount += 4;
  document.querySelectorAll(".iconHeart").forEach((element) => {
    element.addEventListener("click", function () {
      element.classList.toggle("red");
      let likes = document.querySelectorAll(".likes");

      likes.forEach((element) => {
        let currentCount = parseInt(element.innerHTML);
        let newCount = currentCount + 1;
        element.innerHTML = newCount;
      });
    });
  });
}

document.querySelectorAll('input[type="radio"]').forEach((element) => {
  element.addEventListener("click", function (e) {
    console.log("test");

    document.querySelectorAll(".card").forEach((element) => {
      switch (this.value) {
        case "lightTheme":
          element.classList.remove("dark-mode");
          break;
        case "darkTheme":
          element.classList.add("dark-mode");
        default:
          break;
      }
    });

    switch (this.value) {
      case "all":
        document.querySelector(".cardContainer").innerHTML = "";
        showCount = 4;
        filteredData = [...allData];
        showCards(allData);
        break;
      case "instagram":
        document.querySelector(".cardContainer").innerHTML = "";
        filteredData = allData.filter((x) => x.source_type == "instagram");
        showCount = 4;
        showCards(filteredData);
        break;
      case "facebook":
        document.querySelector(".cardContainer").innerHTML = "";
        filteredData = allData.filter((x) => x.source_type == "facebook");
        showCount = 4;
        showCards(filteredData);
        break;
      case "twitter":
        document.querySelector(".cardContainer").innerHTML = "";
        filteredData = allData.filter((x) => x.source_type == "twitter");
        showCount = 4;
        showCards(filteredData);
        break;
      default:
        break;
    }
    //
  });
});

document
  .getElementById("cardBgColorBtn")
  .addEventListener("click", function (e) {
    changeCardBgColor();
  });
document
  .getElementById("cardBackgroundColor")
  .addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      changeCardBgColor();
    }
  });
function changeCardBgColor() {
  let val = document.getElementById("cardBackgroundColor").value;
  if (val.startsWith("#") && val.length > 3) {
    document.querySelectorAll(".card").forEach((element) => {
      element.style.backgroundColor = val;
    });
  }
}

document
  .getElementById("spaceBetweenBtn")
  .addEventListener("click", function (e) {
    changeGap();
  });
document
  .getElementById("cardSpaceBetween")
  .addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      changeGap();
    }
  });

function changeGap() {
  let val = document.getElementById("cardSpaceBetween").value;
  let res = val.replace(/\D/g, "");
  document.querySelector(".cardContainer").style.columnGap = res + "px";
  document.querySelector(".cardContainer").style.rowGap = res + "px";
}

document
  .getElementById("numberOfColumns")
  .addEventListener("change", function (e) {
    changeGridLayout();
  });

function changeGridLayout() {
  let val = document.getElementById("numberOfColumns").value;
  let gridVal;
  switch (val) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
      gridVal = `repeat(${val},minmax(200px,300px))`;
      break;
    // case "4":
    // case "5":
    //   gridVal = `repeat(${val},minmax(200px,1fr))`;
    //   break;
    default:
      gridVal = "repeat(auto-fill, minmax(200px,1fr))";
      break;
  }

  document.querySelector(".cardContainer").style.gridTemplateColumns = gridVal;
}
