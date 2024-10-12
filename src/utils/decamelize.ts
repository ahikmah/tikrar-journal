function decamelize(str: string): string {
  return str.replace(/([a-z\d])([A-Z])/g, '$1_$2').toLowerCase();
}

export function decamelizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => decamelizeKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        result[decamelize(key)] = decamelizeKeys(obj[key]);
        return result;
      },
      {} as { [key: string]: any }
    );
  }
  return obj;
}
