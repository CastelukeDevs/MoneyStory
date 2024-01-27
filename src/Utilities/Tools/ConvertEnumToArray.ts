// Helper
const StringIsNumber = (value: any) => isNaN(Number(value)) === false;

// Turn enum into array
export default (enumme: any) => {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => ({name: enumme[key]}));
};
