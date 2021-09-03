const courseDetail = function () {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="../public/style/courseDetailed.css">
  <title>Course Detailed</title>
</head>
<body>
  <section>
    <header class="header">
      <div class="header_left">
        <img id="top_logo" src="../public/img/main_home/inflearnLogo.png" alt="logo">
      </div>
      <div class="header_center">
        <form action="/search" method="POST">
          <input type="text" name="search">
          <input type="submit" value="검색">
        </form>
      </div>
      <div class="header_right">
        <span>${user_name}</span>
      </div>
    </header>
    <article>
      <div class="top_course_info">
          <div class="courseMainImg"></div>
          <div class="courseTitle">
            <h1>${title}</h1>
            <p>${instructorName}</p>
          </div>
      </div>
      <div class="course_info">
        <div class="article_left">
          <p><strong>강의소개</strong></p>
        <div class="course_infoDetailed">
          <p>${title}은 주니어 개발자들을 위한 강의입니다.</p>
          <hr>
          <p>이 강의는 ...</p>
        </div>
        </div>
        <div class="article_right">
          <div class="user_profile">
            <p>월 ${price / 30}원</p>
            <a href="/">홈으로</a>
          </div>
          <div class="info">
            <ul>
              <li>지식공유자:${instructorName}</li>
              <li>평생 무제한 수강</li>
            </ul>
          </div>  
        </div>
      </div>
    </article>
  </section>
</body>
</html>
  `;
};
