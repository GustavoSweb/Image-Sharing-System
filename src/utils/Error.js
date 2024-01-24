import statusCode from "./httpStatusCode.js";
const { BAD_REQUEST, CONFLICT, NOT_FOUND, UNAUTHORIZED } = statusCode;
class NotValid extends Error {
  constructor(message) {
    super(message);
    this.name = "NotValid";
    this.status = BAD_REQUEST;
  }
}
class ConflitData extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT;
    this.name = "ConflictData";
  }
}
class NotExistValue extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
    this.name = "NotExistValue";
  }
}
class NotAuthorized extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED;
    this.name = "NotAuthorized";
  }
}


export default { NotValid, ConflitData, NotExistValue };
