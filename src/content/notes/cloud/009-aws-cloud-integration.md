# Cloud Integration

## Summary

- SQS:
  - Queue service in AWS
  - Multiple Producers, messages are kept up to 14 days
  - Multiple Consumers share the read and delete messages when done
  - Used to decouple applications in AWS
- SNS:
  - Notification service in AWS
  - Subscribers: Email, Lambda, SQS, HTTP, Mobile…
  - Multiple Subscribers, send all messages to all of them
  - No message retention
- Kinesis: real-time data streaming, persistence and analysis
- Amazon MQ: managed message broker for ActiveMQ and RabbitMQ in the cloud (MQTT, AMQP.. protocols)

## Simple Queue Service (SQS)

A fully managed (serverless) used to decople application where multiple producers send messages to a queue and later poll-ed by consumers (thus deleting the messages).

- Default retention of messages: 4 days, maximum of 14 days
- Consumers share the work to read messages & scale horizontally
- This uses just one queue and therefore you have no topic functionality (and only one consumer will read the message)

## Kinesis

It's used for real-time big data streaming and represent a managed service used to collect, process and analyze real-time streaming data at any scale.

- Kinesis Data Streams: low latency streaming to ingest data at scale from hundreds of thousands of sources.
- Kinesis Data Firehose: load streams into S3, Redshift, ElasticSearch, etc.
- Kinesis Data Analytics: perform real-time analytics on streams using SQL.
- Kinesis Video Streams: monitor real-time video streams for analytics or ML.

## Simple Notification Service (SNS)

A fanout (publish messages to a topic and deliver to multiple subscribers) publisher/subscriber system, the messages will be delivered to all subscribers.

## Amazon MQ

Is a managed message broker service for RabbitMQ/ActiveMQ that runs on servers with both Queue feature and topic features. Its intended more for application which don't use "cloud native" services like SQS/SNS (aws proprietary) with the disadvantage that it doesn't scale as much.
