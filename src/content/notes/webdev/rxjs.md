---
title: 'RxJS'
slug: 'rxjs'
description: 'Comprehensive guide to RxJS observables, subjects, and operators'
category: 'Webdev'
tags: ['rxjs', 'observables', 'angular', 'reactive-programming']
publishedAt: '2025-07-10'
---

## What is the difference between RxJS Observables and Promises?

| RxJS Observables                                               | Promises                              |
| -------------------------------------------------------------- | ------------------------------------- |
| Observables are continuous stream of data                      | Promises return only one value async  |
| Observables are lazy, you need one subscription for it to work | Not lazy, fires as soon it is created |
| Can be canceled                                                | Cannot be canceled                    |

## Cold vs Hot Observables

| Cold Observable                                             | Hot Observable                       |
| ----------------------------------------------------------- | ------------------------------------ |
| Data produced inside the observable                         | Data provided outside the observable |
| Start to run upon subscription                              | Produces values before subscription  |
| Pushes data to observers only when subscription is made     | Pushes data before subscription      |
| Unicasting of data (subscribers may receive different data) | Multicasting of data                 |

## Subjects

Type of observable that allows values to be multicast to many observers

# Types of Subject

- Subject (subscribers do not receive data already emitted)
- Replay Subject (subscribers receive data already emitted, it uses a buffer to hold a history)
- Behaviour Subject (subscribers receive data already emitted, it holds only the last value emitted inside a buffer)

## Maps in RxJs

- `concatMap` maps observable to another one, returns an observable. It waits until the first observable is finished before it subscribes again to the inner observable.
- `mergeMap` same as concatMap only that in does not wait until the first observable is finished.
- `switchMap` same as concatMap but it unsubscribes to the previous observable before subscribing to the new observable.

### SwitchMap vs MergeMap for HttpRequests

- `switchMap` cancels previous HTTP requests that are in progress while `mergeMap` lets all of them finish.
- A good use case for switchMap would be an autocomplete input, where we should discard all but the latest results from the user’s input.

## RxJs Schedulers

| Scheduler Type          | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| null                    | notifications are delivered synchronously and recursively |
| queueScheduler          | schedules data as queue in the current event frame        |
| asapScheduler           | uses the microtask queue (same one used by promises)      |
| asyncScheduler          | uses setInterval for scheduling                           |
| animationFrameScheduler | schedules task to run just before browser content repaint |

## Operators

### Pipeable Operator

`A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.`

Examples: `filter(...)`, `mergeMap(...)`

### Creation Operator

`can be called as standalone functions to create a new Observable.`

Examples: `of(1, 2, 3)`, `interval(1000)`
