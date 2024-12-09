import amqplib, { Connection, Channel } from "amqplib";
import config from "../config";

class RabbitMQ {
  private static connection: Connection | null = null;
  private static channel: Channel | null = null;

  /**
   * Initializes and returns a RabbitMQ channel.
   * Ensures that the connection and channel are reused.
   */
  static async getChannel(): Promise<Channel> {
    if (!this.connection) {
      this.connection = await amqplib.connect(config.queues.emailQueue);
      console.log("RabbitMQ connection established");
    }
    if (!this.channel) {
      this.channel = await this.connection.createChannel();
      console.log("RabbitMQ channel created");
    }
    return this.channel;
  }

  /**
   * Gracefully closes the RabbitMQ connection and channel.
   */
  static async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
      console.log("RabbitMQ channel closed");
    }
    if (this.connection) {
      await this.connection.close();
      this.connection = null;
      console.log("RabbitMQ connection closed");
    }
  }
}

export default RabbitMQ;
