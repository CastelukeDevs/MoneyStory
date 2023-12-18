/**
 * Transform object to form data
 */
export default (object: any) => {
  if (object === null || object === undefined) return object;
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
};
