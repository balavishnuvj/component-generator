/**
 * Component Generator
 */

/* eslint strict: ["off"] */

"use strict";

const { exec } = require("child_process");
const promptDirectory = require("inquirer-select-directory");

let gitUserName = "No Author";

exec("git config user.name", (error, stdout) => {
  const username = stdout.replace("/\r?\n|\r/g", "").trim();
  if (username) {
    gitUserName = username;
  }
});

const componentGenerator = {
  description: "Add an React component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Button",
    },
    {
      type: "directory",
      name: "componentDir",
      message: "Where you like to put this component?",
      basePath: "../",
    },
    {
      type: "confirm",
      name: "wantTests",
      default: true,
      message: "Do you want tests?",
    },
    {
      type: "confirm",
      name: "wantUtils",
      default: true,
      message: "Do you want utils?",
    },
  ],
  actions: (data) => {
    data.username = gitUserName;
    data.createdTime = new Date().toDateString();
    const actions = [
      {
        type: "add",
        path: `${data.componentDir}/{{properCase name}}/{{properCase name}}.component.jsx`,
        templateFile: "../templates/component.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: `${data.componentDir}/{{properCase name}}/index.js`,
        templateFile: "../templates/component.index.hbs",
        abortOnFail: true,
      },
    ];
    if (data.wantTests) {
      actions.push({
        type: "add",
        path: `${data.componentDir}/{{properCase name}}/__tests__/{{properCase name}}.component.spec.js`,
        templateFile: "../templates/component.test.hbs",
        abortOnFail: true,
      });
    }
    if (data.wantUtils) {
      actions.push({
        type: "add",
        path: `${data.componentDir}/{{properCase name}}/{{properCase name}}.utilities.js`,
        templateFile: "../templates/component.utilities.hbs",
        abortOnFail: true,
      });
    }
    if (data.wantTests && data.wantUtils) {
      actions.push({
        type: "add",
        path: `${data.componentDir}/{{properCase name}}/__tests__/{{properCase name}}.utilities.spec.js`,
        templateFile: "../templates/utilities.test.hbs",
        abortOnFail: true,
      });
    }
    return actions;
  },
};

module.exports = (plop) => {
  plop.setPrompt("directory", promptDirectory);
  plop.setGenerator("component", componentGenerator);
};
