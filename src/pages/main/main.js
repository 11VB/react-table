import { useState, useCallback } from "react";
import Loader from "../../components/loader/loader";
import Table from "./components/table/table";
import DetailRowView from "./components/detail_row_view/detail_row_view";
import ModeSelector from "./components/mode_selector/mode_selector";
import TableSearch from "./components/table_search/table_search";

import ReactPaginate from "react-paginate";
import _ from "lodash";

import { buildURL } from "../../utils/helpers";
import SORT_ORDER from "../../utils/constants/sort_order";
import SORT_FIELD from "../../utils/constants/sort_field";
import "./main.scss";

const Main = () => {
  const [pageData, setData] = useState(
    {
      isModeSelected: false,
      isLoading: false,
      error: null,
      data: [],
      search: "",
      currentPage: 0,
      sortDirection: SORT_ORDER.ASC,
      sortField: "id",
      row: null,
    }
  );

  const modeSelectHandler = (isWithManyItems = false) => {
    const urlWithParams = buildURL(isWithManyItems);
    setData({...pageData, isModeSelected: true, error: null, isLoading: true});
    fetchData(urlWithParams);
  }

  const fetchData = async (URL) => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      const { sortField, sortDirection } = pageData;

      setData({...pageData, isModeSelected: true, isLoading: false, data: _.orderBy(data, sortField, sortDirection)});
    } catch (error) {
      setData({...pageData, error: error, isLoading: false});
    }
  };

  const searchHandler = useCallback((search) => {
    setData(prevData => ({...prevData, search, currentPage: 0}));
  }, []);

  const onSort = sortField => {
    const clonedData = pageData.data.concat();
    const { ASC, DESC } = SORT_ORDER;

    const sortDirection = pageData.sortDirection === ASC ? DESC : ASC;

    const orderedData = _.orderBy(clonedData, sortField, sortDirection);

    setData({...pageData, data: orderedData, sortDirection, sortField});
  }

  const onRowSelect = row => {
    setData({...pageData, row});
  } 

  const pageChangeHandler = ({selected}) => {
    setData({...pageData, currentPage: selected});
  }

  const getFilteredData = () => {
    const { data, search } = pageData;
    if(!search) return data;

    return data.filter(item => {
      const { FIRSTNAME, LASTNAME, EMAIL } = SORT_FIELD;
      
      return item[FIRSTNAME].toLowerCase().includes(search.toLowerCase()) 
      || item[LASTNAME].toLowerCase().includes(search.toLowerCase())
      || item[EMAIL].toLowerCase().includes(search.toLowerCase());
    });
  }

  const pageSize = 50;

  const { isModeSelected, error, isLoading, sortDirection, sortField,
    currentPage, row } = pageData;

  if(!isModeSelected) {
    return (
      <div className="container">
        <ModeSelector onSelect={modeSelectHandler}/>
        {error && <h3 className="error-container">{error.message}</h3>}
      </div>
    )
  }

  const filteredData = getFilteredData();
  const pageCount = Math.ceil(filteredData.length/pageSize);

  const displayData = _.chunk(filteredData, pageSize)[currentPage] || [];

  return (
    <div className="container">
      {
        isLoading 
        ? <Loader /> 
        : 
        <>
          <TableSearch onSearch={searchHandler}/>
          {
            filteredData.length 
            ? <Table data={displayData} 
              onSort={onSort} 
              sortDirection={sortDirection}
              sortField={sortField}
              onRowSelect={onRowSelect}
              />
            : <h3 className="empty-result-container">No items</h3>
          }
        </>
      }

      {filteredData.length > pageSize 
        ? <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={pageChangeHandler}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          forcePage={currentPage}
        /> 
        : null
      }

      {
        row 
        ? <DetailRowView person={row} />
        : null
      }
    </div>
  );
}

export default Main;
