import {ITransactionCategory, ITransactionType} from '@Types/TransactionTypes';
import {CategoryList} from '@Utilities/DefaultData/CategoryList';

export const getCategoryList = (
  type: ITransactionType,
): ITransactionCategory[] => {
  return CategoryList[type];
};
export default (str: string, type: ITransactionType): ITransactionCategory => {
  const categories = CategoryList[type].find(cat => cat.category === str);

  if (categories) {
    return categories;
  } else {
    return {category: str, icon: 'person'};
  }
};
