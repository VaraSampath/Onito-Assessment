import { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

class MyTable extends Component {
  state = { users: [] };

  componentDidMount() {
    const fetchUsers = async () => {
      const details = await fetch("http://localhost:8000/");
      const { users } = await details.json();
      this.setState({ users });
    };

    fetchUsers();
    if (!$.fn.DataTable.isDataTable("#myTable")) {
      $(document).ready(function () {
        setTimeout(function () {
          $("#table").DataTable({
            retrieve: true,
            paging: true,
            pagingType: "full_numbers",
            pageLength: 20,
            processing: true,
            dom: "Bfrtip",
            select: {
              style: "single",
            },

            buttons: [
              {
                extend: "pageLength",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "copy",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "csv",
                className: "btn btn-secondary bg-secondary",
              },
              {
                extend: "print",
                customize: function (win) {
                  $(win.document.body).css("font-size", "10pt");
                  $(win.document.body)
                    .find("table")
                    .addClass("compact")
                    .css("font-size", "inherit");
                },
                className: "btn btn-secondary bg-secondary",
              },
            ],

            fnRowCallback: function (
              nRow,
              aData,
              iDisplayIndex,
              iDisplayIndexFull
            ) {
              var index = iDisplayIndexFull + 1;
              $("td:first", nRow).html(index);
              return nRow;
            },

            lengthMenu: [
              [10, 20, 30, 50, -1],
              [10, 20, 30, 50, "All"],
            ],
            columnDefs: [
              {
                targets: 0,
                render: function (data, type, row, meta) {
                  return type === "export" ? meta.row + 1 : data;
                },
              },
            ],
          });
        }, 10);
      });
    }
  }

  showTable = () => {
    const { users } = this.state;

    try {
      return users.map((item, index) => {
        return (
          <tr key={index + 1}>
            <td className="text-xs font-weight-bold">{index + 1}</td>
            <td className="text-xs font-weight-bold">{item.name}</td>

            <td className="text-xs font-weight-bold">
              {item.age + " / " + item.sex}
            </td>
            <td className="text-xs font-weight-bold">{item.mobile}</td>
            <td className="text-xs font-weight-bold">{item.address}</td>
            <td className="text-xs font-weight-bold">{item.govtIdNumber}</td>
            <td className="text-xs font-weight-bold">{item.gName}</td>
            <td className="text-xs font-weight-bold">{item.nationality}</td>
          </tr>
        );
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    return (
      <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          <h1 className="text-center">User Info</h1>
          <table
            id="table"
            className="table align-items-center justify-content-center mb-0"
          >
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  S/N
                </th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Name
                </th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Age
                </th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Mobile
                </th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Address
                </th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Govt ID
                </th>

                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Gaurdian Details
                </th>
                <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
                  Nationality
                </th>
              </tr>
            </thead>

            <tbody>{this.showTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default MyTable;
