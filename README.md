# Vector self assessment web app

Vector self assessment web app is a package that enables easy generation of quizzes for assessing skills. The software is designed to allow writing or editing of the quiz contents without any setup. However, it is **highly recommended** to set up the environment to preview the changes before publishing the content.

## Setup

1. Install [NodeJs](https://nodejs.org/en/download) and [yarn](https://yarnpkg.com/getting-started/install)
2. clone this repo

```bash
git clone git@github.com:am-shb/sat.git
cd sat
```

3. Install the dependencies

```bash
yarn install
```

4. Build the application

```bash
yarn generate
```

5. Locally preview production build:

```bash
yarn preview
```

## Content Development

To develop assessments follow this guide.

### Overall structure

There are two main components involved when developing content. _Modules_ and _Quizzes_. A module is a predefined list of quizzes that helps organizing quizzes.
The main building block of the content is a quiz. All of the files related to the app content is stored under the `/content` directory. You should **NOT** edit any other files other than what is found under the `/content` directory.

### Content directory structure

The `/content` directory holds all of the files related to the app content. Below you can see the overal structure of this directory. Items marked with a `[*]` in front of their name are required files. everything else is optional.

```
content
├── assets [*]
│   └── module_logos [*]
│       └── my_module.png
├── meta.yaml [*]
└── quizzes [*]
    └── sample_quiz
        ├── 1
        │   ├── hint.md
        │   └── question.md
        ├── 2
        │   ├── hint.md
        │   ├── question.md
        │   └── solution.md
        ├── 3
        │   ├── question.md
        │   └── solution.md
        ├── assets [*]
        │   └── logo.png [*]
        ├── intro.md [*]
        ├── outro.md [*]
        └── quiz.yaml [*]


```

#### `/content/assets`

This folder holds all of the assets that you may need to include while developing the content. Note that quizzess have their own `assets` folder and should not be included in this folder.

The `/content/assets/module_logos` directory holds the logos for modules. The name of the file must be `{module_id}.png`

#### `/content/meta.yaml`

This file includes the information of all modules and quizzes. There are two keys defined in this file: `quizzes` and `modules`.

A quiz is defined using three attributes:

- `id`: A unique identifier for quiz. must contains only alphanumeric or `_` characters.
- `title`: The title of the quiz.
- `description`:A short one line description of the quiz shown below the title.

A module is defined similarly with one additional attribute:

- `quiz_ids`: A list of `quiz_id` values that are contained in this module.

This example shows a sample `meta.yaml` file where it defines a sample quiz and module.

```yaml
quizzes:
  - id: sample_quiz
    title: A sample quiz
    description: A demo quiz

modules:
  - id: my_module
    title: Sample Module
    description: This module holds multiple quizzess
    quiz_ids:
      - sample_quiz
```

- Quiz logos are loaded from the `/content/quizzes/{quiz_id}/assets/logo.png`.
- Module logos are loaded from the `/content/assets/module_logos/{module_id}.png`.

#### `/content/quizzes`

This directory holds the content for quizzes. Each quiz is stored in a directory which the name is equal to the quiz `id` attribute.

#### `/content/quizzes/{quiz_id}`

This directory holds all of the content for a particular quiz including all of the static assets which will go under the `assets` subdirectory.

The `assets` subdirectory must have a `logo.png` file which will be used as the logo of this quiz.

This directory must include two markdown files named `intro.md` and `outro.md`. The former is shown before starting the quiz and the latter is shown when the quiz is finished.

The `quiz.yaml` file is the main file where the quiz is defined and holds the following attributes.

- `id`: Quiz id - must be the same id defined in `meta.yaml`
- `programming_task` (_Optional_): Link to the programming task.
- `questions`: A list of question objects.

A question can be defined using the following pattern:

- `id`: A unique identifier for the question. Must only include alphanumeric and `_` characters.
- `choices`: A list of choices that the user can choose from.
- `answer_index`: The index of the correct answer from the choices. Starts from 0.
- `question` (_Optional_): The body of the question. If not included, a `{question_id}/question.md` file must exist in the quiz directory.
- `hint` (_Optional_): A hint for answering the quistion in markdown. If not included, the `{question_id}/hint.md` file will be loaded from the quiz directory. If the file also does not exist, no hints will be available.
- `solution` (_Optional_): The solution of the quistion in markdown. If not included, the `{question_id}/solution.md` file will be loaded from the quiz directory. If the file also does not exist, no solution will be available.
- `nocenter` (_Optional_): If set to `true`, the choices' text will not be centered. This is specially useful when writing code in the choices. Default is is set to false.

```yaml
id: "1"
choices:
  - Integer
  - Float
  - String
  - Double
answer_index: 3
question: Which of the following is **NOT** a Python data type?
hint: "Data types in python: [Python docs](https://docs.python.org/3/library/datatypes.html)"
solution: This is an inline _Markdown_ solution!
nocenter: false
```

##### Multiline inline values

If you need to write a multiline value within a yaml file you can use the `|-` identifier at the beginning of the key. For example:

```yaml
hint: |-
  # Example hint
  This inline hint contains multiple lines!
```

##### Including images

If you need to include images in any of the markdown content, you can do so by using the standard markdown syntax. The url to the image can be modified as follows:

- External url: start the path with `//` followed by the image address. Example:
  `//vectorinstitute.ai/wp-content/uploads/2022/11/logo-vector-institute-full-colour-01.png`
- Quiz assets directory: If your image is stored in the quiz assets directory, start the path with `@/` followed by a relative path to the image file. Example for a file stored at `/content/quizzes/sample_quiz/assets/my_image.png`: `@/my_image.png`
- Content assets directory: If your image is stored in the content assets directory, start the path with `/` followed by a relative path to the image file. Example for a file stored at `/content/assets/my_image.png`: `/my_image.png`

For a complete example of a quiz definition take a look at `/content/quizzes/sample_quiz/` directory.

## License

MIT License

Copyright (c) 2023 Vector Institute

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
