"use strict";

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const queryString_1 = require("../util/queryString");
const courseData = require("../data/courses");
const mainCourse = require("../jsCode/mainCourse");
const courseDetail = require("../jsCode/courseDetail");
const createCourse = require("../jsCode/createCourse");
const router = express_1.default.Router({ mergeParams: true });
let position_router = "방문자";
let name_router = "학생";

exports.router = router;
function doIShoot500() {
  return Math.random() <= 0.5; // 50%
}

router.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const coursesDataLsit = courseData.courses;
    const NUM = 25;
    let price = "";
    let title = "";
    let lists = "";
    var _a;
    const {
      query: {
        page: qPage,
        count: qCount,
        lastContentId: qLastContentId,
        search: qSearch,
      },
    } = req;
    const page = queryString_1.isSingleQueryString(qPage)
      ? parseInt(qPage || "1")
      : 1;
    const count = queryString_1.isSingleQueryString(qCount)
      ? parseInt(qCount || "20")
      : 20;
    const lastContentId = queryString_1.isSingleQueryString(qLastContentId)
      ? qLastContentId !== undefined
        ? parseInt(qLastContentId)
        : undefined
      : undefined;
    const search = queryString_1.isSingleQueryString(qSearch)
      ? qSearch
      : undefined;
    let courses;
    try {
      courses = yield (_a = Container.get("CourseService")) === null ||
      _a === void 0
        ? void 0
        : _a.getCourseList({ page, count, lastContentId, search });
    } catch (error) {
      console.error("GET /courses error 발생!", error);
    }
    if (courses) {
      // res.json({
      //   ok: true,
      //   data: {
      //     courses,
      //   },
      // });
      console.log(courses.data);
      coursesDataLsit.forEach((course) => {
        price = course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        title = course.title;
        if (title.length > NUM) {
          title = title.slice(0, NUM) + "...";
        }
        lists += `
        <li id=${course.id}>
          <a href="/api/courses/${course.id}">
            <div class="coverImg" style="background: url(${course.coverImageUrl}) no-repeat center; background-size: cover;"></div>
            <p class="title">${title}</p>
            <p class="instructorName">${course.instructorName}</p>
            <p class="price">₩${price}</p>
          </a>
      </li>
        `;
      });
      res.send(mainCourse(position_router, name_router, lists));
    } else {
      if (doIShoot500()) {
        res.sendStatus(500);
        return;
      }
      res.json({
        ok: false,
        error: {
          message: "강의 리스트를 가져오는데 실패했습니다.",
        },
      });
    }
  })
);

/* 강의를 볼 수 있는 메인 페이지 */
router.post("/", (req, res) => {
  const {
    body: { position, name },
  } = req;
  const courses = courseData.courses;
  const NUM = 25;
  let price = "";
  let title = "";
  let lists = "";

  position_router = position;
  name_router = name;

  // console.log(req.originalUrl);

  //글자수 25이상이면 ...으로 표시
  //가격 부분 1000단위 콤마 표시
  courses.forEach((course) => {
    price = course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    title = course.title;
    if (title.length > NUM) {
      title = title.slice(0, NUM) + "...";
    }
    lists += `
    <li id=${course.id}>
      <a href="/api/courses/${course.id}">
        <div class="coverImg" style="background: url(${course.coverImageUrl}) no-repeat center;"></div>
        <p class="title">${title}</p>
        <p class="instructorName">${course.instructorName}</p>
        <p class="price">₩${price}</p>
      </a>
  </li>
    `;
  });

  res.send(mainCourse(position_router, name_router, lists));
  // res.redirect(307, "/mainCourse");
});

router.get("/:courseId", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const {
      params: { courseId },
    } = req;
    let course = null;
    try {
      course = yield (_b = Container.get("CourseService")) === null ||
      _b === void 0
        ? void 0
        : _b.getCourse(parseInt(courseId));
    } catch (error) {
      console.error("GET /courses/:courseId error 발생!", error);
    }
    if (course) {
      // res.json({
      //   ok: true,
      //   data: {
      //     course,
      //   },
      // });
      let price = course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      res.send(
        courseDetail(
          name_router,
          course.title,
          course.instructorName,
          price,
          course.coverImageUrl
        )
      );
    } else {
      // res.json({
      //   ok: false,
      //   error: {
      //     message: "강의 상세를 가져오는데 실패했습니다.",
      //   },
      // });
      res.send("오류 발생 :( 강의 상세를 가져오는데 실패했습니다..");
    }
  })
);

router.get("/create/courses", (req, res) => {
  res.send(createCourse(name_router));
});

router.post("/create/courses", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const {
      body: { title, price: _price, instructorName: name_router },
    } = req;
    const price = Number(_price);
    const instructorName = name_router;
    if (typeof title !== "string" || isNaN(price)) {
      res.json({
        ok: false,
        error: {
          message: "강의 제목은 문자열, 강의 가격은 숫자이어야 합니다.",
        },
      });
      return;
    }
    let createdCourseId;
    try {
      createdCourseId = yield (_c = Container.get("CourseService")) === null ||
      _c === void 0
        ? void 0
        : _c.createCourse({ title, price, instructorName });
    } catch (error) {
      console.error("POST /courses error 발생!", error);
    }
    if (createdCourseId !== undefined) {
      courseData.courses.reverse().push({
        id: createdCourseId,
        title,
        instructorName: name_router,
        coverImageUrl: courseData.getTemporaryImageURL(),
        price: price,
      });
      courseData.courses.reverse();
      res.redirect(302, `/api/courses/${createdCourseId}`);
    } else {
      if (doIShoot500()) {
        res.sendStatus(500);
        return;
      }
      res.json({
        ok: false,
        error: {
          message: "강의를 추가하는데 실패했습니다.",
        },
      });
    }
  })
);
