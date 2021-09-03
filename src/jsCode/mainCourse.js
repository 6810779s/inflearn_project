const mainCourse = function (position, user_name, lists) {
  let html = "";
  if (position === "강사") {
    html = `<a href="/create_course" class="create show">강의 올리기</a>`;
  } else {
    html = ``;
  }
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="/style/mainCourse.css">
  <title>MainCourse</title>
</head>
<body>
  <section>
    <header class="header">
      <div class="header_left">
        <a href="/mainCourse"><img id="top_logo" src="/img/main_home/inflearnLogo.png" alt="logo"></a>
      </div>
      <div class="header_center">
        <form action="/search" method="POST">
          <input type="text" name="search">
          <input type="submit" value="검색">
        </form>
      </div>
      <div class="header_right">
        <span>${user_name}님, 안녕하세요</span>
      </div>
    </header>
    <div class="article">
      <ul class="course">
        ${lists}
      </ul>
      <div class="article_right">
        <div class="user_profile">
          <p>🍀${position} 정보</p>
          <p>이름: ${user_name}</p>
          <p>직급: ${position}</p>
        </div>
        <div class="control">
          ${html}
          <a href="#top_logo">&#9650;top</a>
        </div>  
      </div>
    </div>
  </section>
  <script>
  let timer;
  const loading = document.createElement("div");
  const article = document.querySelector(".article");
  loading.classList.add("loading");
  loading.innerText = "loading..."
  article.appendChild(loading);

  window.addEventListener("scroll", ()=>{
    loading.classList.remove("showLoading");
    let curHeight = window.scrollY;
    let documentHeight = document.body.scrollHeight;
    let articleHeight = article.clientHeight
    if (curHeight > documentHeight-900){
      if(!timer){
        timer = setTimeout(function() {
          timer = null;
          article.style.height = (articleHeight/10) + (45*4) + "rem";
          console.log(articleHeight);
        }, 300);
          loading.classList.add("showLoading");
          
          console.log("loading...");
      }
    }
  });
  </script>
</body>
</html>
  `;
};
//쓰로틀링을 이용한 무한 스크롤 구현.

module.exports = mainCourse;
