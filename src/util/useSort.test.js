import { renderHook } from '@testing-library/react-hooks';
import { useSort } from './useSort';

const baseArray = [
  { name: 'AAA' },
  { name: 'CCC' },
  { name: 'BBB' },
];

const ascendingArray = [
  { name: 'AAA' },
  { name: 'BBB' },
  { name: 'CCC' },
];

const descendingArray = [
  { name: 'CCC' },
  { name: 'BBB' },
  { name: 'AAA' },
];

describe('useSort.js', () => {
  it('Should return sorted array', () => {
    const data = renderHook(() => useSort({
      initialData: baseArray,
      sortByField: 'name',
    }));

    expect(data.result.current.sortedData).toStrictEqual(ascendingArray);
  });

  it('Should return descending array', () => {
    const data = renderHook(() => useSort({
      initialData: baseArray,
      sortByField: 'name',
      direction: 'DESC',
    }));

    expect(data.result.current.sortedData).toStrictEqual(descendingArray);
  });

  it('Should return initial array if search field is missing', () => {
    const data = renderHook(() => useSort({
      initialData: baseArray,
      sortByField: 'missingField',
    }));

    expect(data.result.current.sortedData).toStrictEqual(baseArray);
  });

  it('Passed args should be equal with returned', () => {
    const direction = 'DESC';
    const sortByField = 'name';
    const data = renderHook(() => useSort({
      initialData: baseArray,
      sortByField,
      direction,
    }));

    expect(data.result.current.initialData).toEqual(baseArray);
    expect(data.result.current.direction).toEqual(direction);
    expect(data.result.current.sortByField).toEqual(sortByField);
  });
});

