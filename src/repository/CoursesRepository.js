"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOnCourse = void 0;
const Course_1 = __importDefault(require("../model/Course"));
const courses_1 = require("../data/courses");
//search
function* searchGen(arr, keyword) {
  const reg = typeof keyword === "string" ? new RegExp(keyword) : keyword;
  // .replace(/ /gi, "");
  for (const course of arr) {
    if (reg.test(course.title.replace(/ /gi, ""))) {
      //공백 제거하여 비교
      if (yield course) {
        break;
      }
    }
  }
}

function searchOnCourse(arr, keyword, count) {
  const iter = searchGen(arr, keyword);
  let curr = iter.next();
  const result = [];
  let currCount = 1;
  while (!curr.done) {
    result.push(curr.value);
    curr = iter.next(currCount === count);
    currCount++;
  }
  return result;
}

exports.searchOnCourse = searchOnCourse;
function getDelayTime(forTest) {
  if (forTest || Math.random() <= 0.5) {
    return 0;
  }
  // 50%의 확률로 0s ~ 4s
  return Math.floor(Math.random() * 4000); // 0s ~ 4s
}
class CoursesRepository {
  // repository에 대한 다음 구현은 실제로 적절하지 않지만
  // 현재 상태는 repository 자체를 구현해야하므로 이렇게 구현합니다.
  constructor(forTest) {
    this.forTest = forTest;
    this.lastCourseId = CoursesRepository._courses[0].id;
  }
  doIReject() {
    return this.forTest ? false : Math.random() <= 0.1; // 10% 확률
  }
  list({ page = 1, count = 20, lastContentId, search: _search }) {
    // const search = _search !== undefined ? _search.trim() : "";
    const search = _search !== undefined ? _search.trim() : "";
    const courses =
      search.length > 0
        ? searchOnCourse(CoursesRepository._courses, search, page * count)
        : CoursesRepository._courses;
    const indexOfLastContent =
      lastContentId !== undefined && lastContentId > -1
        ? courses.findIndex(({ id }) => id === lastContentId) + 1
        : (page - 1) * count;
    const result = courses.slice(
      indexOfLastContent,
      indexOfLastContent + count
    );
    return new Promise((resolve, reject) => {
      if (this.doIReject()) {
        reject({ code: -1, message: "Error!!! 다시 시도해주세요 :)" });
        return;
      }
      setTimeout(() => {
        resolve(result);
      }, getDelayTime(this.forTest));
    });
  }

  getById(id) {
    return new Promise((resolve) => {
      const course =
        CoursesRepository._courses.find(
          ({ id: courseId }) => courseId === id
        ) || null;
      resolve(course);
    });
  }
  create({ title, price, instructorName }) {
    return new Promise((resolve, reject) => {
      if (this.doIReject()) {
        reject({
          code: -2,
          message: "Error!! 제목과 가격을 다시한번 확인해 주세요 :)",
        });
        return;
      }
      this.lastCourseId = this.lastCourseId + 1;
      CoursesRepository._courses = [
        new Course_1.default(
          this.lastCourseId,
          title,
          instructorName,
          price,
          courses_1.getTemporaryImageURL()
        ),
      ].concat(CoursesRepository._courses);
      setTimeout(() => {
        resolve(this.lastCourseId);
      }, getDelayTime(this.forTest));
    });
  }
}
exports.default = CoursesRepository;
CoursesRepository._courses = courses_1.courses;
