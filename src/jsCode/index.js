const mainCourse = require("./mainCourse");

const index = function () {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" type="text/css" href="/style/index.css">
  <title>Inflearn</title>
</head>
<body>
  <div class="caption"></div>
  <section class="container">
    <div class="wrap">
      <header class="top_bar">
        <img src="/img/main_home/inflearnLogo.png" alt="logo">
      </header>
      <article class="article">
        <form action="/api/courses/info" method="POST">
          <div class="putName">
            <label  for="name">이름</label>
            <input autocomplete="off" type="text" name="name" placeholder="이름을 적어주세요" value="" maxlength="10" required>
          </div>
          <div class="seclect_position"> 
            <button type="submit" name="position" value="강사"><p>강사</p><img src="/img/main_home/teacher.png" alt="teacher"></button>
            <button type="submit" name="position" value="학생"><p>학생</p><img src="/img/main_home/student.png" alt="student"></button>
          </div>
        </form>
      </article>
    </div>
  </section>
  <script>
    document.addEventListener('keydown',(e)=>{
      if(e.keyCode === 13){
        e.preventDefault();
      }
    })
  </script>
</body>
</html>
  `;
};

module.exports = index;
