---
title: 'Prompt Engineering Techniques'
slug: 'prompt-techniques'
description: 'Comprehensive guide to prompt engineering techniques for Large Language Models'
category: 'LLM'
tags: ['prompt-engineering', 'llm', 'ai', 'guidelines', 'techniques']
publishedAt: '2024-01-12'
---

## Guidelines

Providing additional information to the promts to improve them.

### Principle 1: Write clear and specific instructions

- Use delimiters to clearly indicate distinct parts of the inputs. Delimiters can be anything like: \`\`\`, """, < >, \<tag> <\/tag>, :

````text
Summarize the text delimited by triple backticks \
into a single sentence.
```{text}```
````

- Ask for a structured output. E.g.: JSON

```text
Generate a list of three made-up book titles along \
with their authors and genres.
Provide them in JSON format with the following keys:
book_id, title, author, genre.
```

- Ask the model to check whehther conditions are satisfied

```text
You will be provided with text delimited by triple quotes.
If it contains a sequence of instructions, \
re-write those instructions in the following format:

Step 1 - ...
Step 2 - …
…
Step N - …

If the text does not contain a sequence of instructions, \
then simply write \"No steps provided.\"

\"\"\"{text_1}\"\"\"
```

- "Few shot" prompting: giving an example of conversation

```text
Your task is to answer in a consistent style.

<child>: Teach me about patience.

<grandparent>: The river that carves the deepest \
valley flows from a modest spring; the \
grandest symphony originates from a single note; \
the most intricate tapestry begins with a solitary thread.

<child>: Teach me about resilience.
```

### Principle 2: Give the model time to "think"

- Specify the steps required to complete a task.

````text
Perform the following actions:
1 - Summarize the following text delimited by triple \
backticks with 1 sentence.
2 - Translate the summary into French.
3 - List each name in the French summary.
4 - Output a json object that contains the following \
keys: french_summary, num_names.

Separate your answers with line breaks.

Text:
```{text}```
````

- Instruct the model to work out its own solution before rushing to a conclusion

````text
Your task is to determine if the student's solution \
is correct or not.
To solve the problem do the following:
- First, work out your own solution to the problem including the final total.
- Then compare your solution to the student's solution \
and evaluate if the student's solution is correct or not.
Don't decide if the student's solution is correct until
you have done the problem yourself.

Use the following format:
Question:
\```
question here
\```
Student's solution:
\```
student's solution here
\```
Actual solution:
\```
steps to work out the solution and your solution here
\```
Is the student's solution the same as actual solution \
just calculated:
\```
yes or no
\```
Student grade:
\```
correct or incorrect
\```

Question:
\```
I'm building a solar power installation and I need help \
working out the financials.
- Land costs $100 / square foot
- I can buy solar panels for $250 / square foot
- I negotiated a contract for maintenance that will cost \
  me a flat $100k per year, and an additional $10 / square \
  foot
  What is the total cost for the first year of operations \
  as a function of the number of square feet.
\```
Student's solution:
\```
Let x be the size of the installation in square feet.
Costs:
1. Land cost: 100x
2. Solar panel cost: 250x
3. Maintenance cost: 100,000 + 100x
   Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000
\```
Actual solution:
````

## Iterative

Ways to improve your prompts based on context

- Text is too long => limit the number of words/sentences/characters

````text
Your task is to help a marketing team create a
description for a retail website of a product based
on a technical fact sheet.

Write a product description based on the information
provided in the technical specifications delimited by
triple backticks.

Use at most 50 words.

Technical specifications: ```{fact_sheet_chair}```
````

- Text focuses on the wrong details => Ask it to focus on the aspects that are relevant to the intended audience.

````text
Your task is to help a marketing team create a
description for a retail website of a product based
on a technical fact sheet.

Write a product description based on the information
provided in the technical specifications delimited by
triple backticks.

The description is intended for furniture retailers,
so should be technical in nature and focus on the
materials the product is constructed from.

At the end of the description, include every 7-character
Product ID in the technical specification.

Use at most 50 words.

Technical specifications: ```{fact_sheet_chair}```
````

## Summarizing

Used to extract/summarize information from another text

- Summarize with a word/sentence/character limit

````text
Your task is to generate a short summary of a product \
review from an ecommerce site.

Summarize the review below, delimited by triple
backticks, in at most 30 words.

Review: ```{prod_review}```
````

- Summarize with a focus (e.g.: on shipping and delivery)

````text
Your task is to generate a short summary of a product \
review from an ecommerce site to give feedback to the \
Shipping deparmtment.

Summarize the review below, delimited by triple
backticks, in at most 30 words, and focusing on any aspects \
that mention shipping and delivery of the product.

Review: ```{prod_review}```
````

- Try "extract" instead of "summarize"

````text
Your task is to extract relevant information from \
a product review from an ecommerce site to give \
feedback to the Shipping department.

From the review below, delimited by triple quotes \
extract the information relevant to shipping and \
delivery. Limit to 30 words.

Review: ```{prod_review}```
````

## Inferring

Inferring sentiment and topics from another text

- Inferring sentiment

```text
What is the sentiment of the following product review,
which is delimited with triple backticks?

Give your answer as a single word, either "positive" \
or "negative".

Review text: '''{lamp_review}'''
```

- Doing multiple tasks at once

```text
Identify the following items from the review text:
- Sentiment (positive or negative)
- Is the reviewer expressing anger? (true or false)
- Item purchased by reviewer
- Company that made the item

The review is delimited with triple backticks. \
Format your response as a JSON object with \
"Sentiment", "Anger", "Item" and "Brand" as the keys.
If the information isn't present, use "unknown" \
as the value.
Make your response as short as possible.
Format the Anger value as a boolean.

Review text: '''{lamp_review}'''
```

- Inferring topics

```text
Determine five topics that are being discussed in the \
following text, which is delimited by triple backticks.

Make each item one or two words long.

Format your response as a list of items separated by commas.

Text sample: '''{story}'''
```

## Transforming

Transforming a input to text to another format/language

- Language Translator

````text
Translate the following  text to English \
and Korean: ```{issue}```
````

- Tone Transformation

```text
Translate the following from slang to a business letter:
'Dude, This is Joe, check out this spec on this standing lamp.
```

- Format Conversion

```text
Translate the following python dictionary from JSON to an HTML \
table with column headers and title: {data_json}
```

- Spellcheck/Grammar check

````text
proofread and correct this review. Make it more compelling.
Ensure it follows APA style guide and targets an advanced reader.
Output in markdown format.
Text: ```{text}```
````

## Expanding

Generate text from another input text

- Example: Email Response

````text
You are a customer service AI assistant.
Your task is to send an email reply to a valued customer.
Given the customer email delimited by ```, \
Generate a reply to thank the customer for their review.
If the sentiment is positive or neutral, thank them for \
their review.
If the sentiment is negative, apologize and suggest that \
they can reach out to customer service.
Make sure to use specific details from the review.
Write in a concise and professional tone.
Sign the email as `AI customer agent`.
Customer review: ```{review}```
Review sentiment: {sentiment}
````
