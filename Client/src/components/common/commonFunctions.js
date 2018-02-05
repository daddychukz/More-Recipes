import createBrowserHistory from 'history/createBrowserHistory';

/**
 * @description forces page reload
 */
const customHistory = createBrowserHistory({
  forceRefresh: true
});

export default customHistory;
