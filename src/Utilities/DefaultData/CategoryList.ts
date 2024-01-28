import {ICategoryList} from '@Types/TransactionTypes';

export const CategoryList: ICategoryList = {
  Income: [
    {category: 'Salary', icon: 'business'},
    {category: 'Investment', icon: 'analytics'},
    {category: 'Interest', icon: 'diamond'},
    {category: 'Gift', icon: 'gift'},
    {category: 'Prize', icon: 'podium'},
    {category: 'Other', icon: 'logo-usd'},
  ],
  Expense: [
    {category: 'Utilities', icon: 'flash'},
    {category: 'Bill', icon: 'receipt'},
    {category: 'Housing', icon: 'home'},
    {category: 'Internet', icon: 'globe'},
    {category: 'Phone', icon: 'call'},
    {category: 'Rent', icon: 'storefront'},
    {category: 'Tax', icon: 'server'},
    {category: 'Education', icon: 'book'},
    {category: 'Business', icon: 'business'},
    {category: 'Vehicle', icon: 'car-sport'},
    {category: 'Shopping', icon: 'cart'},
    {category: 'Supplies', icon: 'construct'},
    {category: 'Other', icon: 'logo-usd'},
  ],
  Transfer: [
    {
      category: 'Transfer',
      icon: 'navigate',
      description: 'Wallet to Wallet transaction',
    },
  ],
};

export const TransactionType = Object.keys(CategoryList);
