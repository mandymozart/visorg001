// this function takes an array of date ranges in this format:
// [{ start: Date, end: Date}]
// the array is first sorted, and then checked for any overlap
// https://derickbailey.com/2015/09/07/check-for-date-range-overlap-with-javascript-arrays-sorting-and-reducing/
export type DateRange = {
  start: Date;
  end: Date;
};
export type OverlapDateRanges = {
  overlap: boolean;
  ranges: OverlapDateRangesPreviousCurrent[];
};
type OverlapDateRangesPreviousCurrent = {
  previous: DateRange;
  current: DateRange;
};
export function overlap(dateRanges: DateRange[]) {
  var sortedRanges = dateRanges.sort((previous, current) => {
    // get the start date from previous and current
    var previousTime = previous.start.getTime();
    var currentTime = current.start.getTime();

    // if the previous is earlier than the current
    if (previousTime < currentTime) {
      return -1;
    }

    // if the previous time is the same as the current time
    if (previousTime === currentTime) {
      return 0;
    }

    // if the previous time is later than the current time
    return 1;
  });

  var result = sortedRanges.reduce(
    (result, current, idx, arr) => {
      // get the previous range
      if (idx === 0) {
        return result;
      }
      var previous = arr[idx - 1];

      // check for any overlap
      var previousEnd = previous.end.getTime();
      var currentStart = current.start.getTime();
      var overlap = previousEnd >= currentStart;

      // store the result
      if (overlap) {
        // yes, there is overlap
        result.overlap = true;
        // store the specific ranges that overlap
        result.ranges.push({
          previous: previous,
          current: current,
        });
      }

      return result;

      // seed the reduce
    },
    { overlap: false, ranges: [] } as OverlapDateRanges
  );

  // return the final results
  return result;
}
