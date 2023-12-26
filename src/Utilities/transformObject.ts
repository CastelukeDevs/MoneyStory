/**
 * Transform object to form data
 */
export default (object: any) => {
  if (object === null || object === undefined) return object;
  const formData = new FormData();
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach(v => {
        formData.append(`${key}[]`, JSON.stringify(v));
      });
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};
