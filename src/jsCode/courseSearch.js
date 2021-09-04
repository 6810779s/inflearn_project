const courseSearch = function (
  user_name,
  title,
  instructorName,
  coverImageUrl,
  id
) {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../public/style/courseSearch.css">
  <title>Inflearn</title>
</head>
<body>
  <section>
    <header class="header">
      <div class="header_left">
        <a href="/api/courses"><img id="top_logo" src="../public/img/main_home/inflearnLogo.png" alt="logo"></a>
      </div>
      <div class="header_center">
        <form action="/api/search/courses" method="POST">
          <input autocomplete="off" type="text" name="search" maxlength="30" value="">
          <input type="submit" value="검색">
        </form>
      </div>
      <div class="header_right">
        <span>${user_name}님, 안녕하세요</span>
      </div>
    </header>
    <article>
      <ul class="searchingLists">
        <li>
          <a href="/api/courses/${id}">
          <!-- <img src=""> -->
          <div></div>
          <div class="info">
            <h1>title</h1>
            <p>name</p>
          </div>
          </a>
        </li>
        <li>
          <!-- <img src=""> -->
          <div></div>
          <div class="info">
            <h1>title</h1>
            <p>name</p>
          </div>
          
        </li>
      </ul>
    </article>
  </section>
  
  
</body>
</html>
  `;
};

module.exports = courseSearch;
