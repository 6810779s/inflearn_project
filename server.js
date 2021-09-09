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
const DIContainer_1 = __importDefault(require("./DIContainer"));
const compression = require("compression");
const CoursesRepository_1 = __importDefault(
  require("./src/repository/CoursesRepository")
);
const CourseService_1 = __importDefault(require("./src/service/CourseService"));
const courses_1 = require("./src/api/courses");
const search_1 = require("./src/api/search");
const index = require("./src/jsCode/index");

const app = express_1.default();
const port = process.env.PORT || "3000";

app.set("port", port);
app.use(compression());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"))); //modify
app.use(cors_1.default());

app.use("/api/courses", courses_1.router);
app.use("/api/search", search_1.router);

/* 서버시작 시 열리는 페이지 */
app.get("/", (req, res) => {
  res.send(index());
});

app.use((err, req, res, next) => {
  res.json({
    ok: false,
    error: {
      message: err,
    },
  });
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
