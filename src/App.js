import React from "react";


const url = "https://randomuser.me/api/?results=200&nat=us";


class App extends React.Component {
  state = {
    employees: [],
  };
componentDidMount() {
  fetch(url)
  .then((data)=> data.json(),
  )
  .then((data) => this.setState({ employees: data.results }));
}

render() {
  const { employees } = this.state;
  return (
    <>
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
            <td><img src={employee.picture.thumbnail}></img></td>
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

