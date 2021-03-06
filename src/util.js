/*
 * Copyright 2020 Mateusz Klos
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const json = (data, indent) => JSON.stringify(data, null, indent);


export function mapObject(obj, mapperFn) {
  return Object.fromEntries(
    Object.entries(obj)
      .map((entry, index) => mapperFn(...entry, index))
      // Returning undefined from mapperFn will remove the given entry.
      .filter(entry => entry !== undefined)
  );
}


// A little helper to manage JSONSchema string formats.
export class FormatManager {
  constructor() {
    this.formats = {};
  }

  // Register new string format with the given name
  register(name, { dump, load }) {
    this.formats[name] = { dump, load };
  }

  // Find string format by name.
  find(name) {
    if (!name)
      return undefined;

    return this.formats[name];
  }

  loadValue(format, value) {
    const formatter = this.find(format);
    return formatter ? formatter.load(value) : value;
  }
}


// Check if the given object is empty
export function isEmpty(obj) {
  if (!obj)
    return true;

  return Object.keys(obj).length === 0;
}


export function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = (month < 10) ? (`0${month}`) : month;
  day = (day < 10) ? (`0${day}`) : day;

  return `${year}-${month}-${day}`;
}


export default {
  json,
  mapObject,
  isEmpty,
  FormatManager,
  formatDate,
};
