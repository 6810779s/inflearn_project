"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const bodyParser = __importDefault(require("body-parser")); //add
const DIContainer_1 = __importDefault(require("./DIContainer"));
const CoursesRepository_1 = __importDefault(
  require("./src/repository/CoursesRepository")
);
const CourseService_1 = __importDefault(require("./src/service/CourseService"));
const courses_1 = require("./src/api/courses");
const search_1 = require("./src/api/search");
const mainCourse = require("./src/jsCode/mainCourse");
const courseDetail = require("./src/jsCode/courseDetail");
const createCourse = require("./src/jsCode/createCourse");
const courseData = require("./src/data/courses");
const app = express_1.default();
const port = process.env.PORT || "3000";

app.set("port", port);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"))); //modify
app.use(bodyParser.default.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(bodyParser.default.json()); // to support JSON-encoded bodies
app.use(cors_1.default());

app.use("/api/courses", courses_1.router);
app.use("/api/search", search_1.router);

/* 전역변수, 유저 포지션 및 이름 */
let user_name = "방문자";
let position = "학생";

/* 서버시작 시 열리는 페이지 */
app.get("/", (req, res) => {
  if (req.query.id === undefined) {
    res.sendFile(__dirname + "/html/index.html");
  } else {
    const id = parseInt(req.query.id);
    const courses_num = courseData.courses.length - id; //거꾸로 가기 때문에
    const course = courseData.courses[courses_num];
    const title = course.title;
    const instructorName = course.instructorName;
    const coverImageUrl = course.coverImageUrl;
    let price = course.price;
    price = course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    res.send(
      courseDetail(user_name, title, instructorName, price, coverImageUrl)
    );
  }
});

app.get("/create_course", (req, res) => {
  res.send(createCourse(user_name));
});

app.post("/create", (req, res) => {
  console.log(res.params);
  const course_title = req.body.title;
  const course_price = req.body.price;
  const course_id = courseData.courses.length + 1;

  courseData.courses.reverse().push({
    id: course_id,
    title: course_title,
    instructorName: user_name,
    coverImageUrl: courseData.getTemporaryImageURL(),
    price: course_price,
  });
  courseData.courses.reverse();
  res.redirect(302, "/mainCourse");
});

app.use((req, res) => {
  res.send(`<h1>Sorry, page not found :(</h1>`);
});

// server
const server = http_1.default.createServer(app);
const ContainerInstance = new DIContainer_1.default();
global.Container = ContainerInstance;
Container.register("CoursesRepository", [], () => {
  return new CoursesRepository_1.default(false);
});
Container.register(
  "CourseService",
  ["CoursesRepository"],
  (coursesRepository) => {
    return new CourseService_1.default(coursesRepository);
  }
);
server.listen(port);
server.on("error", (error) => {
  throw error;
});
server.on("listening", () => {
  const address = server.address();
  let realPort = parseInt(port);
  if (address !== null && typeof address !== "string") {
    realPort = address.port;
  }
  console.log(`서버가 http://localhost:${realPort}에 열렸습니다 !`);
});
