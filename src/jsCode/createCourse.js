const createCourse = function (user_name) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/style/createCourse.css">
  <title>create_course</title>
</head>
<body>
  <section>
    <div class="wrap">
      <header class="top_bar">
        <img src="/img/main_home/inflearnLogo.png" alt="logo">
      </header>
      <article>
        <form action="/api/courses/${id}" method="POST">
          <ul>
            <li>
              <label for="instructorName">강사 이름</label>
              <input type="text" name="instructorName" value=${user_name} readonly>
            </li>
            <li>
              <label for="title">강의 제목</label>
              <input type="text" name="title" maxlength='30' required>
            </li>
            <li>
              <label for="price">강의 가격</label>
              <input type="number" name="price" required>
            </li>
            <li>
              <input type="submit" value="완료">
            </li>
          </ul>
        </form>
      </article>
    </div>
    <div class="caption"></div>
  </section>
</body>
</html>
  `;
};

module.exports = createCourse;
