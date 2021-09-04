const courseDetail = function (
  user_name,
  title,
  instructorName,
  price,
  coverImageUrl
) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="/style/courseDetailed.css">
  <title>Course Detailed</title>
</head>
<body>
  <section>
    <header class="header">
      <div class="header_left">
        <a href="/api/courses"><img id="top_logo" src="/img/main_home/inflearnLogo.png" alt="logo"></a>
      </div>
      <div class="header_right">
        <span>${user_name}</span>
      </div>
    </header>
    <article>
      <div class="top_course_info">
          <img class="courseMainImg" src=${coverImageUrl} alt="coverImg"/>
          <div class="courseTitle">
            <h1>${title}</h1>
            <p>${instructorName}</p>
          </div>
      </div>
      <div class="course_info">
        <div class="article_left">
          <p><strong>강의소개</strong></p>
        <div class="course_infoDetailed">
          <p>${title}은(는) 주니어 개발자들을 위한 강의입니다.</p>
          <hr>
          <p>이 강의는 ...</p>
          <p>for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn</p>
          <p>for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn</p>
          <p>for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn</p>
          <p>for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn,for Inflearn</p>
        </div>
        </div>
        <div class="article_right">
          <div class="user_profile">
            <p>총 ${price}원</p>
            <a href="/api/courses">홈으로</a>
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

module.exports = courseDetail;
