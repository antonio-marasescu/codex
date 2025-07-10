---
title: 'AWS Aurora Database'
slug: '035-aurora-database'
description: 'Guide to AWS Aurora managed database service'
category: 'Cloud'
tags: ['aws', 'aurora', 'database', 'mysql', 'postgresql', 'rds']
publishedAt: '2025-01-15'
---

# Aurora

Aurora Replicas can help improve read scaling because it synchronously updates data with the primary database (within 100 ms). Aurora Replicas are created in the same DB cluster within a Region. With Aurora MySQL you can also enable binlog replication to another Aurora DB cluster which can be in the same or a different Region.
