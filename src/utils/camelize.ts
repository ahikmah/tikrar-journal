type AnyObject = { [key: string]: any };
type Options = {
  process?: (key: string, convert: (str: string) => string, options?: Options) => string;
};

const isObject = (obj: any): obj is AnyObject => obj === Object(obj);
const isArray = (obj: any): obj is any[] => Array.isArray(obj);

function camelize(str: string): string {
  if (str.match(/^\d+$/)) return str;
  return str
    .replace(/[-_](.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^(.)/, (chr) => chr.toLowerCase());
}

function processKeys(convert: (str: string) => string, obj: any, options?: Options): any {
  if (!isObject(obj) || isArray(obj)) return obj;

  const output: AnyObject = {};
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      output[convert(key)] = processKeys(convert, obj[key], options);
    }
  });
  return output;
}

function processor(convert: (str: string) => string, options?: Options) {
  const callback = options?.process;
  if (typeof callback !== 'function') return convert;

  return (str: string) => callback(str, convert, options);
}

export function camelizeKeys(object: AnyObject, options?: Options): AnyObject {
  return processKeys(processor(camelize, options), object, options);
}
