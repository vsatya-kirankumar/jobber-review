import { config } from '@review/config';
import { createRabbitMQConnection } from '@review/queues/connection';
import { winstonLogger } from '@vsatya-kirankumar/jobber-shared';
import { Channel } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewServiceProducer', 'debug');

export const publishFanoutMessage = async (
  channel: Channel,
  exchangeName: string,
  message: string,
  logMessage: string
) => {
  try {
    if (!channel) {
      channel = (await createRabbitMQConnection()) as Channel;
    }
    await channel.assertExchange(exchangeName, 'fanout');
    channel.publish(exchangeName, '', Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'Review Service publishFanoutMessage() method error', error);
  }
};
