export const buildIndex = properties => {
  const index = {
    buildingIndex: {},
    bedsIndex: [],
    bathsIndex: []
  };
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

export const applyFilters = ({ properties, index, filters }) => {
  if (!hasFilter(filters)) return properties;

  const { indexToFilter, bedBounds, bathBounds } = pepareIndexes({
    filters,
    index
  });

  if (!bedBounds && !bathBounds) {
    return indexToFilter.map(index => properties[index]);
  } else {
    const left = bedBounds || bathBounds;
    const right = bathBounds || bedBounds;
    const filteredList = [];

    indexToFilter.forEach(index => {
      if (left[index] && right[index]) filteredList.push(properties[index]);
    });

    return filteredList;
  }
};

const objectReducer = arrObj => {
  return arrObj.reduce((acc, x) => {
    for (var key in x) acc[key] = x[key];
    return acc;
  }, {});
};

const determineMax = max =>
  max !== null ? parseInt(max, 10) + 1 : Number.POSITIVE_INFINITY;

const pepareIndexes = ({ filters, index }) => {
  const { buildingType, minBeds, maxBeds, minBaths, maxBaths } = filters;
  const { buildingIndex, bedsIndex, bathsIndex } = index;
  const determinedIndexes = {};

  if (buildingType !== "none selected") {
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

const hasFilter = filters => {
  const { buildingType, minBeds, maxBeds, minBaths, maxBaths } = filters;
  let hasFilter = false;

  if (buildingType !== "none selected") return true;

  [minBeds, maxBeds, minBaths, maxBaths].forEach(item => {
    if (item !== null) hasFilter = true;
  });

  return hasFilter;
};
