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
  it('It should use ASC sorting by default', () => {
    const data = renderHook(() => useSort({
      initialData: baseArray,
      sortByField: 'name',
    }));

    expect(data.result.current.direction).toEqual('ASC');
  });

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

    const { current } = data.result;

    expect(current.initialData).toEqual(baseArray);
    expect(current.direction).toEqual(direction);
    expect(current.sortByField).toEqual(sortByField);
  });

  describe('Sorting with empty values', () => {
    let arrayWithEmptyField;

    beforeAll(() => {
      arrayWithEmptyField = [
        { name: null },
        ...baseArray,
        { name: null },
      ];
    });

    it('All empty fields should be at the TOP of the list if sorting by DESC', () => {
      const data = renderHook(() => useSort({
        initialData: arrayWithEmptyField,
        sortByField: 'name',
        direction: 'DESC',
      }));

      const sortedData = data.result.current.sortedData;

      expect(sortedData[0].name).toBeNull();
      expect(sortedData[1].name).toBeNull();
    });

    it('All empty fields should be at the BOTTOM of the list if sorting by ASC', () => {
      const data = renderHook(() => useSort({
        initialData: arrayWithEmptyField,
        sortByField: 'name',
        direction: 'ASC',
      }));

      const { sortedData } = data.result.current;

      expect(sortedData[sortedData.length - 1].name).toBeNull();
      expect(sortedData[sortedData.length - 2].name).toBeNull();
    });
  });
});

