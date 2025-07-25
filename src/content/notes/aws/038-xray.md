---
title: 'AWS X-Ray'
slug: '038-xray'
description: 'Guide to AWS X-Ray for distributed tracing'
category: 'AWS'
tags: ['aws', 'x-ray', 'tracing', 'monitoring', 'distributed-systems']
publishedAt: '2025-01-15'
---

A **segment document** conveys information about a segment to X-Ray. A segment document can be up to 64 kB and contain a whole segment with subsegments,
a fragment of a segment that indicates that a request is in progress, or a single subsegment that is sent separately.

You can send segment documents directly to X-Ray by using the [PutTraceSegments](https://docs.aws.amazon.com/xray/latest/api/API_PutTraceSegments.html) API.
X-Ray indexes a subset of segment fields for use with filter expressions.

For example, if you set the user field on a segment to a unique identifier, you can search for segments associated with specific users in the X-Ray console or
by using the `GetTraceSummaries` API.

You can record additional information about requests, the environment, or your application with annotations and metadata.
You can add annotations and metadata to the segments that the X-Ray SDK creates, or to custom subsegments that you create.
**Annotations** are key-value pairs with string, number, or Boolean values. Annotations are indexed for use with [filter expressions](https://docs.aws.amazon.com/xray/latest/devguide/xray-console-filters.html).

Use annotations to record data that you want to use to group traces in the console, or when calling the [GetTraceSummaries](https://docs.aws.amazon.com/xray/latest/api/API_GetTraceSummaries.html) API.
**Metadata** are key-value pairs that can have values of any type, including objects and lists, but are not indexed for use with filter expressions.
Use metadata to record additional data that you want stored in the trace but don't need to use it with search.
