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

/* 받아올 데이터들 */
const courseData = require("../data/courses");
const courseSearch = require("../jsCode/courseSearch");
const router = express_1.default.Router();
exports.router = router;

/* 전역에서 사용할 사용자 포지션과 이름 */
let position_router = "학생";
let name_router = "방문자";

//검색 정보 받아오기
router.post("/courses/:userName/:position", (req, res) => {
  const {
    body: { search },
  } = req;

  position_router = req.params.position;
  name_router = req.params.userName;

  const search_trim = search.replace(/ /gi, "");
  res.redirect(302, `/api/search/courses?keyword=${search_trim}`);
});

/* localhost:3000/api/search/courses */
//keyword: 검색 결과
//max: 검색 결과 카운트의 max값
//http://localhost:3000/api/search/courses?keyword=C&max=12
router.get("/courses", (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const {
      query: { keyword: qKeyword, max: qMax },
    } = req;
    const max = queryString_1.isSingleQueryString(qMax)
      ? parseInt(qMax || "10")
      : 10;
    const keyword = queryString_1.isSingleQueryString(qKeyword)
      ? qKeyword
      : undefined;
    let searchResult;

    try {
      searchResult = yield (_a = Container.get("CourseService")) === null ||
      _a === void 0
        ? void 0
        : _a.searchCourses({ max, keyword });
    } catch (error) {
      console.error("/search/course error 발생!", error);
    }
    if (searchResult) {
      let lists = "";

      searchResult.map((result) => {
        lists += `
          <li id=${result.id}>
            <a href="/api/courses/${result.id}">
            <div class="coverImg" style="background: url(${courseData.getTemporaryImageURL()}) no-repeat center; background-size: cover;"></div>
            <div class="info">
              <h1 class="title">${result.title}</h1>
              <p class="name">${result.instructorName}</p>
            </div>
            </a>
          </li>
        `;
      });
      res.send(courseSearch(name_router, lists, position_router));
    } else {
      const doIShoot500 = Math.random() <= 0.5;
      if (doIShoot500) {
        next("검색에 실패했습니다.");
        return;
      }
    }
  })
);
