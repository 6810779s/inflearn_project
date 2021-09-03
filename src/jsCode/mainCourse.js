const mainCourse = function (position, user_name, lists) {
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
        <img id="top_logo" src="/img/main_home/inflearnLogo.png" alt="logo">
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
          <p>🍀학생 정보</p>
          <p>이름: ${user_name}</p>
          <p>직급: ${position}</p>
        </div>
        <div class="control">
          <button class="create show">강의 올리기</button>
          <a href="#top_logo"><p>&#9650;top</p></a>
        </div>  
      </div>
    </div>
  </section>
</body>
</html>
  `;
};

module.exports = mainCourse;
