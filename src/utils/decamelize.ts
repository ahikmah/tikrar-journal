type AnyObject = { [key: string]: any };
type Options = {
  separator?: string;
  split?: RegExp;
  process?: (key: string, convert: (str: string) => string, options?: Options) => string;
};

const isObject = (obj: any): obj is AnyObject => obj === Object(obj);
const isArray = (obj: any): obj is any[] => Array.isArray(obj);

const separateWords = (str: string, options: Options = {}): string => {
  const separator = options.separator || '_';
  const split = options.split || /(?=[A-Z])/;
  return str.split(split).join(separator);
};

function decamelize(str: string, options?: Options): string {
  return separateWords(str, options).toLowerCase();
}

const processKeys = (convert: (str: string) => string, obj: any, options?: Options): any => {
  if (!isObject(obj) || isArray(obj)) return obj;

  const output: AnyObject = {};
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      output[convert(key)] = processKeys(convert, obj[key], options);
    }
  });
  return output;
};

const processor = (convert: (str: string) => string, options?: Options) => {
  const callback = options?.process;
  if (typeof callback !== 'function') return convert;

  return (str: string) => callback(str, convert, options);
};

export function decamelizeKeys(object: AnyObject, options?: Options): AnyObject {
  return processKeys(processor(decamelize, options), object, options);
}
