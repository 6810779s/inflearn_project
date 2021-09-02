const mainCourse = function (position, user_name) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>Inflearn</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1>안녕하세요 ${user_name}님</h1>
    <p>현재 포지션은 ${position}입니다.</p>
  </body>
  </html>
  `;
};

module.exports = mainCourse;
