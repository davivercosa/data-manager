class DataManager {
  normalize(body, upperCase = false) {
    let stringBody = JSON.stringify(body);

    for (let index = 0; index < stringBody.length; index++) {
      if (stringBody[index] === ":") {
        const startOfKeyIndex = stringBody.lastIndexOf('"', index - 2) + 1;
        const endOfKeyIndex = index - 2;

        let key = "";

        for (let index = startOfKeyIndex; index <= endOfKeyIndex; index++) {
          key += stringBody[index];
        }

        stringBody = stringBody.replace(
          `"${key}":`,
          `"${this._unidecode(key.split(" ").join(""), upperCase)}":`
        );
      }
    }

    return JSON.parse(stringBody);
  }

  _unidecode(string, upperCase) {
    const normalizedString = string
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return upperCase
      ? normalizedString.toUpperCase()
      : normalizedString.toLowerCase();
  }

  verify(body, validationDefinitions) {
    for (const key in validationDefinitions) {
      if (validationDefinitions.hasOwnProperty(key)) {
        const validator = validationDefinitions[key];
        const value = body[key];

        if (validator.required && value === undefined) {
          return `Missing required key: ${key}`;
        }

        if (value !== undefined) {
          if (typeof value !== validator.type) {
            return `Field "${key}" should be of type ${validator.type}`;
          }

          if (validator.properties) {
            const nestedValidationResult = this.verify(
              value,
              validator.properties
            );
            if (nestedValidationResult !== null) {
              return nestedValidationResult;
            }
          }
        }
      }
    }

    return null;
  }
}

module.exports = new DataManager();
