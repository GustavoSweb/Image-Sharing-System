import statusCode from "./httpStatusCode.js";
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = statusCode;
class StatusError extends Error {
  constructor(message) {
    super(message);
  }
  get NotValid() {
    this.name = "NotValid";
    this.status = BAD_REQUEST;
  }
  get NotExistValue() {
    this.status = NOT_FOUND;
    this.name = "NotExistValue";
  }
  get ConflictData() {
    this.status = CONFLICT;
    this.name = "ConflictData";
  }
}

export default StatusError;