import React, { useEffect, useCallback } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from 'react-redux';
import withSwapiService from "../hoc-helpers/with-swapi-service";
import { fetchItems } from "../../actions/items-actions";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

const ListItems = ({ data }) => {

  const listItems = data.map(item => {
    return (
      <button type="button"
              className="list-group-item list-group-item-action"
              key={item.name}>{item.name}</button>
    )
  });

  return (
    <div className="list-group">
      {listItems}
    </div>
  )
};

const ListItemsContainer = ({ data, loading, error, fetchItems}) => {
  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <Spinner/>;
  if (error) return <ErrorIndicator message={error}/>;
  return <ListItems data={data}/>;
};

const mapStateToProps = ({items: { data, loading, error }}) => {
  return {
    data, loading, error
  }
};

const mapDispatchToProps = (dispatch, { swapiService }) => {
  return bindActionCreators({
    fetchItems: fetchItems(swapiService)
  }, dispatch);
};

export default compose(
  withSwapiService,
  connect(mapStateToProps, mapDispatchToProps)
)(ListItemsContainer)