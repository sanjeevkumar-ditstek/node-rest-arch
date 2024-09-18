import STATUS_CODES from "../enum/StatusCodesEnum";

 
const SendResponse = (res: any, data: any = { status: 400, message: "Invalid Request" }) => {
  res.status(data.status || STATUS_CODES.OK).send(data);
};

export default SendResponse;
