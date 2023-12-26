import {ICategory, ITransactionType} from '@Types/TransactionTypes';
import {CategoryList} from './CategoryList';

export default (str: string, type: ITransactionType): ICategory => {
  const categories = CategoryList.find(
    cat => cat.type === type && cat.category === str,
  );

  if (categories) return categories;
  return {category: str, icon: 'person-outline', type};
};
