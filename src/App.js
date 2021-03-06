import React from "react";
import './App.css';

// import Form from "react-bootstrap/Form";

const url = "https://randomuser.me/api/?results=200&nat=us";

class App extends React.Component {
  state = {
    employees: [],
    searched: [],
    sorted: false,
  };

  componentDidMount() {
    fetch(url)
      .then((data) => data.json())
      .then((data) =>
        this.setState({ employees: data.results, searched: data.results })
      );
  }

  SortName = () => {
    const { employees, sorted } = this.state;
    let sorter;
    if (!sorted) {
      sorter = employees.sort(function (a, b) {
        return a.name.last > b.name.last ? 1 : -1;
      });
    } else {
      sorter = employees.reverse();
    }
    this.setState({
      employees: sorter,
      sorted: !sorted,
    });
  };
  handleSearched = (e) => {
    const search = e.target.value.toLowerCase();
    const { searched } = this.state;
    console.log(searched);
    const searchArray = searched.filter(({ name }) =>
      name.last.toLowerCase().startsWith(search)
    );
    this.setState({ employees: searchArray });
  };

  render() {
    const { employees } = this.state;

    return (
      <>
        <div className="form-group dark black">
          <h2 className="text-center col-md-12 black"> Search</h2>
          <input
            type="text"
            className="form-control top"
            onChange={this.handleSearched}
          >
          </input>
        <div>
          <button className="btn btn-danger" onClick={this.SortName}>
            Sort Last
          </button>
        </div>
        </div>
        <table className="table table-dark table-striped table-hover border-danger">
          <thead>
            <tr>
              <th></th>
              <th>First</th>
              <th>Last</th>
              <th>Cell #</th>
              <th>Email</th>
              <th>Age</th>
              <th>Location</th>

              {/* <th>Dob</th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.login.uuid}>
                <td>
                  <img src={employee.picture.thumbnail}></img>
                </td>
                <td>{employee.name.first}</td>
                <td>{employee.name.last}</td>
                <td>{employee.cell}</td>
                <td>{employee.email}</td>
                <td>{employee.dob.age}</td>
                {/* <td>{(employee.dob.date).slice(0,10)}</td> */}
                <td>{employee.location.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
export default App;
