import { QUEUE_NAME } from "../../config/queues";
import { IPayloadVerifyEmail } from "../../types";
import publishMessage from "./index";

export const publishMessageVerifyEmail = async (
  message: IPayloadVerifyEmail
) => {
  try {
    const queue = QUEUE_NAME.VERIFY_EMAIL;
    await publishMessage(queue, message);
  } catch (error) {
    throw error;
  }
};
