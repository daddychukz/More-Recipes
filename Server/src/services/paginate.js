/**
 * generate pagination metadata
 * @param {number} limit
 * @param {number} offset
 * @param {number} totalCount
 * @param {number} pageSize
 * @return {object} pagination metadata
 */

const paginate = ({
  limit, offset, totalCount, pageSize
}) => {
  const pageCount = Math.ceil(totalCount / limit);
  const Page =
  Math.floor((
    parseInt((offset), 10) + parseInt((limit), 10)
  ) / parseInt((limit), 10));
  return {
    Page,
    pageSize: Page ? pageSize : null,
    pageCount,
    totalCount
  };
};

export default paginate;
