import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { switchTab, fetchTopicsIfNeeded, invalidateTab } from '../actions'

const Topics = ({topics}) => (
  <ul>
    {topics.map((post, i) =>
      <li key={i}>{post.title}</li>
    )}
  </ul>
)
class App extends Component {
  static propTypes = {
    selectedTab: PropTypes.string.isRequired,
    topics: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    // dispatch: PropTypes.func.isRequired,
    fetchTopicsIfNeeded: PropTypes.func.isRequired,
    switchTab: PropTypes.func.isRequired,
    invalidateTab: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { selectedTab, fetchTopicsIfNeeded } = this.props
    fetchTopicsIfNeeded(selectedTab);
    // dispatch(fetchTopicsIfNeeded(selectedTab))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTab !== this.props.selectedTab) {
      const { fetchTopicsIfNeeded, selectedTab } = nextProps
      fetchTopicsIfNeeded(selectedTab);
      // dispatch(fetchTopicsIfNeeded(selectedTab))
    }
  }

  handleChange = e => {
    this.props.switchTab(e.target.value);
    // this.props.dispatch(selectedTab(nextTab))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { selectedTab, invalidateTab, fetchTopicsIfNeeded } = this.props
    invalidateTab(selectedTab);
    fetchTopicsIfNeeded(selectedTab);
    // dispatch(invalidateTab(selectedTab))
    // dispatch(fetchTopicsIfNeeded(selectedTab))
  }

  render() {
    const { selectedTab, topics, isFetching, lastUpdated } = this.props
    const isEmpty = topics.length === 0
    return (
      <div>
        <select value={selectedTab} onChange={this.handleChange} >
          <option value='topics'>topics</option>
          <option value='jobs'>jobs</option>
        </select>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Topics topics={topics} />
            </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const { selectedTab, topicsByTab } = state
  const {
    isFetching,
    lastUpdated,
    items:topics
  } = topicsByTab[selectedTab] || {
    isFetching: true,
    items: []
  }

  return {
    selectedTab,
    topics,
    isFetching,
    lastUpdated
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchTopicsIfNeeded: (selectedTab) => dispatch(fetchTopicsIfNeeded(selectedTab)),
    switchTab: (tab) => dispatch(switchTab(tab)),
    invalidateTab: (selectedTab) => dispatch(invalidateTab(selectedTab)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
