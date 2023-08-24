const DataManager = require("./utils/DataManager");

const requestExample = {
  client: "096992",
  salesman: {
    id: 1,
    name: "Davi Verçosa",
  },
  limit: 1,
};

const requestNormalized = DataManager.normalize(requestExample);

const validationDefinitionsExample = {
  client: { type: "string", required: true },
  store: { type: "string", required: true },
  limit: { type: "number", required: true },
  salesman: {
    type: "object",
    required: true,
    properties: {
      id: { type: "number", required: true },
      name: { type: "string", required: true },
    },
  },
};

const isDataCorrect = DataManager.verify(
  requestNormalized,
  validationDefinitionsExample
);

console.log(isDataCorrect);
