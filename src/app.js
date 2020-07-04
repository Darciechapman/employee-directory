import React from "react";
import EmployeeCard from "./components/EmployeeCard";
import Wrapper from "./components/Wrapper";
import employees from ".employees.json";
import "./App.css";

class App extends React.Component {
    state = {
        employees, 
        searchTerm: "",
        searchSetting: "searchBy",
        sortSetting: "sortBy",
        sortOrder: "asc",
    };

    handleChange = event => {
        let value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });

        this.renderEmployees();
    };

    returnEmployeeCard = (employee) => {
        return (
            <EmployeeCard
            key={employee.id}
            image={employee.imgUrl}
            firstName={employee.firstName}
            lastName={employee.lastName}
            department={employee.department}
            role={employee.role}
            location={employee.location}
            />
        );
    }

    sortEmployees = () => {
        let sortSetting = this.state.sortSetting;

        this.state.employees.sort((a, b) => {
            let propA;
            let propB;

            if (this.state.sortSetting === "sortBy") {
                propA = a.id;
                propB = b.id;
            } else {
                propA = a[sortSetting].toLowerCase();
                propB = b[sortSetting].toLowerCase();
            }

            if (this.state.sort.sortOrder === "asc") {
                if (propA < propB) {
                    return -1;
                }
                if (propA > propB) {
                    return 1;
                }
                return 0;
            } else if (this.state.sortOrder === "desc") {
                if (propA < propB) {
                    return 1;
                }
                if (propA > propB) {
                    return -1;
                }
                return 0;
            }
        })
    }

    renderEmployees = () => {
        this.sortEmployees();

        return this.state.employees.map((employee) => {

            if (employee[this.state.searchSetting]) {
                if (this.state.searchTerm === "" || employee[this.state.searchSetting].toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                    return this.returnEmployeeCard(employee);
                }
            } else if (employee.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || employee.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || employee.location.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || employee.role.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || employee.department.toLowerCase().includes(this.state.searchTerm.toLowerCase())) {
                return this.returnEmployeeCard(employee);
            }
        })
    }

    render() {
        return (
            <Wrapper>
                <h1 className="title text-light">Employees</h1>
                <form className="">
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <div className="form-group form-inline">
                                <input type="text" name="searchTerm" placeHolder="search.." className="form-control" value={this.state.searchTerm} onChange={this.handleChange} />
                                <div className="input-group=append">
                                    <select className="form-control" id="searchSetting" name="searchSetting" value={this.state.searchSetting} onChange={this.handleChange} >
                                        <option value="searchBy">Search By...</option>
                                        <option value="firstName">First Name</option>
                                        <option value="lastName">Last Name</option>
                                        <option value="department">department</option>
                                        <option value="role">Role</option>
                                        <option value="location">Location</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5">
                            <div className="form-group form-incline">
                                <select id="sort" className="form-control" name="sortSeting" value={this.state.sortSetting} onChange={this.handleChange}>
                                    <option value="sortBy">Sort By...</option>
                                    <option value="firstName">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="department">department</option>
                                    <option value="role">Role</option>
                                    <option value="location">Location</option>
                                </select>

                                <div className="input-group-append">
                                    <label className={`form-control btn ${this.state.sortOrder === "asc" ? "btn-warning" : "btn-outline-warning"}`}>
                                        <input type="radio" name="sortOrder" id="asc" value="asc" checked={this.state.sortOrder === asc} onChange={this.handleChange} /> Asc
                                    </label>
                                    <label className={`form-control btn ${this.state.sortOrder === "desc" ? "btn-warning" : "btn-outline-warning"}`}>
                                        <input type="radio" name="sortOrder" id="desc" value="desc" checked={this.state.sortOrder === "desc"} onChange={this.handleChange} /> Desc
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {this.renderEmployees()}

            </Wrapper>
        )
    }
}

export default App;