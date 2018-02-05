import React from 'react';
import PropTypes from 'prop-types';
import {
  createUltimatePagination,
  ITEM_TYPES } from 'react-ultimate-pagination';

const propTypes = ({
  pagination: PropTypes.shape({
    totalPages: PropTypes.number,
    boundaryPagesRange: PropTypes.number,
    siblingPagesRange: PropTypes.number
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
});

const defaultProps = ({
  children: PropTypes.array,
  value: PropTypes.number,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
}).isRequired;

const WrapperComponent = ({ children }) => (
  <ul className="pagination">{children}</ul>
);

const withPreventDefault = fn => (event) => {
  event.preventDefault();
  fn();
};

const Page = ({ value, isActive, onClick }) => (
  <li className={isActive ? 'page-item active' : 'page-item'}>
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
      {value}
    </a>
  </li>
);

const Ellipsis = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
    ...
    </a>
  </li>
);

const FirstPageLink = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
    &laquo;
    </a>
  </li>
);

const PreviousPageLink = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
    &lsaquo;
    </a>
  </li>
);

const NextPageLink = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
    &rsaquo;
    </a>
  </li>
);

const LastPageLink = ({ onClick }) => (
  <li className="page-item">
    <a className="page-link" href="#" onClick={withPreventDefault(onClick)}>
    &raquo;
    </a>
  </li>
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: Ellipsis,
  [ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
  [ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
  [ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink
};

const UltimatePaginationBootstrap4 = createUltimatePagination({
  itemTypeToComponent,
  WrapperComponent });

  /**
 * @description displays pagination component on the DOM
 *
 * @function Pagination
 *
 * @returns {JSX} JSX representation of component
 */
const Pagination = ({
  pagination,
  currentPage,
  onChange
}) => (
  <UltimatePaginationBootstrap4
    currentPage={currentPage}
    totalPages={pagination.totalPages}
    boundaryPagesRange={pagination.boundaryPagesRange}
    siblingPagesRange={pagination.siblingPagesRange}
    onChange={onChange}
  />
);

Pagination.propTypes = propTypes;
WrapperComponent.propTypes = defaultProps;
Page.propTypes = defaultProps;
Ellipsis.propTypes = defaultProps;
FirstPageLink.propTypes = defaultProps;
PreviousPageLink.propTypes = defaultProps;
NextPageLink.propTypes = defaultProps;
LastPageLink.propTypes = defaultProps;

export default Pagination;
