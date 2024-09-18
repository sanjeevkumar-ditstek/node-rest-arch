import STATUS_CODES from "../enum/StatusCodesEnum";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SendResponse = (res: any, data: any = { status: 400, message: "Invalid Request" }) => {
  res.status(data.status || STATUS_CODES.OK).send(data);
};

export default SendResponse;
