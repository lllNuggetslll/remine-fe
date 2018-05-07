import isEqual from "lodash/isEqual";
import { INITIAL_State } from "./FilterContainer";
import { NONE_SELECTED } from "./AsyncSelect";

/**
 * Builds an index of the property [index]es and stores them according
 * to how they might be filtered.  Leveraging constant time look up
 * of objects and arrays. Array indexes used to easily slice() out bed/bath bounds.
 * i.e.
 * buildingIndex = {
 *  singleFamily: {0, 5, 9,...}
 *  ...
 * }
 * bedsIndex = [{...properties with 0 bedrooms}, {...properties with 1 bedroom}, ...]
 * bathsIndex = [{...properties with 0 bathrooms}, {...properties with 1 bathroom}, ...]
 * @param {properties} original array of properties.
 */
export const buildIndex = properties => {
  const index = {
    buildingIndex: {},
    bedsIndex: [],
    bathsIndex: []
  };
  // sneaky sneaky...
  const ifNull = item => (item === null ? 0 : item);

  properties.forEach((property, id) => {
    const { beds, baths, buildingType: { name } } = property;

    if (!index.buildingIndex[name]) index.buildingIndex[name] = {};
    if (!index.bedsIndex[ifNull(beds)]) index.bedsIndex[beds] = {};
    if (!index.bathsIndex[ifNull(baths)]) index.bathsIndex[baths] = {};

    index.buildingIndex[name][id] = true;
    // Each array index indicates the number of beds/baths
    index.bedsIndex[ifNull(beds)][id] = true;
    index.bathsIndex[ifNull(baths)][id] = true;
  });

  return index;
};

/**
 * Executed everytime a new filter is applied.  If no filters, the
 * original property list will be returned.  The property list is
 * never iterated over, only preparedIndex, a sub section of pertinent
 * data.
 * @param {properties} original array of properties.
 * @param {index} property index.
 * @param {filters} applied filters.
 */
export const applyFilters = ({ properties, index, filters }) => {
  if (isEqual(INITIAL_State, filters)) return properties;

  const { indexToFilter, bedBounds, bathBounds } = pepareIndexes({
    filters,
    index
  });

  // Correlates the different indexes and only filters out common indexes
  // i.e. singleFamily && 2+ bedrooms && 2 - 4 bathrooms
  if (!bedBounds && !bathBounds) {
    return indexToFilter.map(index => properties[index]);
  } else {
    // There is at least 1 bed/bath filter or both,
    // this takes care of both situations and still
    // leverages constant time look up of both objects
    const left = bedBounds || bathBounds;
    const right = bathBounds || bedBounds;
    const filteredList = [];

    indexToFilter.forEach(index => {
      if (left[index] && right[index]) filteredList.push(properties[index]);
    });

    return filteredList;
  }
};

/**
 * Takes an array of objs and combines them into 1 obj
 * to be searched.
 * @param {arrObj} array of objs.
 */
const objectReducer = arrObj =>
  arrObj.reduce((acc, x) => {
    return { ...acc, ...x };
  }, {});

/**
 * Accounts for any unknown max bounds for slicing operations
 * @param {max} a max bound.
 */
const determineMax = max =>
  max !== null ? parseInt(max, 10) + 1 : Number.POSITIVE_INFINITY;

/**
 * Builds the index to be filtered according to the filters.
 * We only want to filter over pertinent data.
 * @param {index} property index.
 * @param {filters} applied filters.
 */
const pepareIndexes = ({ filters, index }) => {
  const { buildingType, minBeds, maxBeds, minBaths, maxBaths } = filters;
  const { buildingIndex, bedsIndex, bathsIndex } = index;
  const determinedIndexes = {};

  if (buildingType !== NONE_SELECTED) {
    determinedIndexes.indexToFilter = Object.keys(buildingIndex[buildingType]);
  }

  if (minBeds || maxBeds) {
    const bedBounds = bedsIndex.slice(minBeds, determineMax(maxBeds));
    const reducedbedBounds = objectReducer(bedBounds);

    if (!determinedIndexes.indexToFilter) {
      determinedIndexes.indexToFilter = Object.keys(reducedbedBounds);
    } else {
      determinedIndexes.bedBounds = reducedbedBounds;
    }
  }

  if (minBaths || maxBaths) {
    const bathBounds = bathsIndex.slice(minBaths, determineMax(maxBaths));
    const reducedBathBounds = objectReducer(bathBounds);

    if (!determinedIndexes.indexToFilter) {
      determinedIndexes.indexToFilter = Object.keys(reducedBathBounds);
    } else {
      determinedIndexes.bathBounds = reducedBathBounds;
    }
  }

  return determinedIndexes;
};
