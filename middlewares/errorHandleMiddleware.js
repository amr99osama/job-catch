import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  // check what is the status codes for each one
  const StatusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong, try again later !";
  res.status(StatusCode).json({ msg });
};

export default errorHandlerMiddleware;
