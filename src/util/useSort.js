import { useMemo } from 'react';

/**
 * Returns sorted array
 * @param initialData {Array} - Required. Array of items
 * @param sortByField {string} - Required. Name of the field by which to sort
 * @param direction {string} - Optional. 'ASC' or 'DESC'. ASC is used by default
 * @returns {{initialData, sortByField, sortedData: *[], direction}}
 */
export const useSort = ({ initialData = [], sortByField, direction }) => {
  const sortedData = useMemo(() => [...initialData].sort((a, b) => {
    const current = a[sortByField];
    const next = b[sortByField];
    let mult;

    if (direction === 'ASC') {
      mult = 1;
    } else if (direction === 'DESC') {
      mult = -1;
    } else {
      mult = 1;
    }

    if (current === next) {
      return 0;
    } else if (!current) {
      return mult;
    } else if (!next) {
      return -1 * mult;
    } else {
      return current.localeCompare(next) * mult;
    }
  }), [initialData, sortByField, direction]);

  return {
    initialData,
    sortedData,
    sortByField,
    direction,
  };
};
