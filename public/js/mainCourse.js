let timer_scroll;
const loading = document.createElement("div");
const article = document.querySelector(".article");
loading.classList.add("loading");
loading.innerText = "loading...";
article.appendChild(loading);

window.addEventListener("scroll", () => {
  loading.classList.remove("showLoading");
  let curHeight = window.scrollY;
  let documentHeight = document.body.scrollHeight;
  let articleHeight = article.clientHeight;
  if (curHeight > documentHeight - 900) {
    if (!timer_scroll) {
      timer_scroll = setTimeout(function () {
        timer_scroll = null;
        article.style.height = articleHeight / 10 + 45 * 4 + "rem";
        console.log(articleHeight);
      }, 300);
      loading.classList.add("showLoading");

      console.log("loading...");
    }
  }
});

const input_search = document.querySelector("input[name='search']");
const header_center = document.querySelector(".header_center");

function filterSearching() {
  let header_center_ul = document.createElement("ul");
  header_center_ul.id = "listsUl";
  header_center.appendChild(header_center_ul);
  let i = 0;
  let j = 0;
  let id = -1;
  let courseLists = [];

  for (let i = 0; i < courseObject.length; i++) {
    if (courseLists.length === 5) {
      break;
    }
    let values = Object.values(courseObject[j]);
    values.map((value) => {
      if (String(value).includes(input_search.value)) {
        id = courseObject.length - j;
        courseLists.push([String(value), id]);
        i++;
      }
    });

    j++;
  }
  console.log(courseLists);
  courseLists.map((course) => {
    let li = document.createElement("li");
    let a = document.createElement("a");

    li.appendChild(a);
    a.href = `http://localhost:3000/api/courses/${course[1]}`;
    a.innerText = course[0];

    header_center_ul.appendChild(li);
  });
  header_center_ul.style.display = "block";
}

let timer_search;
input_search.addEventListener("keyup", (e) => {
  if (timer_search) {
    clearTimeout(timer_search);
  }
  timer_search = setTimeout(function () {
    let ul = document.querySelector(".header_center ul");
    ul.onmouseout = displayUl;
    if (ul) {
      header_center.removeChild(ul);
    }
    if (input_search.value.length >= 2) {
      filterSearching();
    }
  }, 200);
});

//포커싱 아웃일 경우
let ulTag = false;
input_search.addEventListener("blur", (e) => {
  if (ulTag) {
    console.log("dd");
    input_search.removeChild("ul");
  }
});

function displayUl() {
  ulTag = true;
}

//포커싱 했을 경우
input_search.addEventListener("focus", (e) => {
  if (input_search.value.length >= 2) {
    filterSearching();
  }
});
