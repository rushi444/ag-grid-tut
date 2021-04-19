import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export const App = () => {
  const [state, setState] = useState<any>({
    columnDefs: [
      {
        headerName: "Make",
        field: "make",
        sortable: true,
        filter: true,
        checkboxSelection: true,
      },
      { headerName: "Model", field: "model", sortable: true, filter: true },
      { headerName: "Price", field: "price", sortable: true, filter: true },
    ],
    rowData: [],
  });

  const [gridApi, setGridApi] = useState<any>();

  const fetchCarData = async () =>
    void setState({
      ...state,
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Fiesta", price: 20000 },
        { make: "Porche", model: "GT3", price: 100000 },
      ],
    });

  const selectedRowsAlert = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    alert(`Selected Nodes: ${selectedDataStringPresentation}`);
  };

  useEffect(() => void fetchCarData(), []);

  return (
    <div className="ag-theme-balham" style={{ width: 500, height: 600 }}>
      <AgGridReact
        columnDefs={state.columnDefs}
        rowData={state.rowData}
        rowSelection="multiple"
        onGridReady={(params) => setGridApi(params.api)}
      />
      <button onClick={selectedRowsAlert}>Get selected rows</button>
    </div>
  );
};
