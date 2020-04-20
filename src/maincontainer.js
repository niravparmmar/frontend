
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import * as actions from "./store/actions";
import { connect } from "react-redux";

class MainContainer extends React.Component {
  state = {
    data: {},
    datalist: null,
    imagename: "default-avatar.png",
    colum: [],
  };

  componentDidMount() {
   
  }

  componentWillReceiveProps(props) {
    this.setState({ isloaded: false });
    if (props.userProfile) {
      if (props.userProfile.datalist) {

        this.setState(
          {
            datalist: props.userProfile.datalist.data || [],
          },

          function () {
            console.log("state", this.state.datalist[0].category);
            this.state.colum = this.state.datalist.splice(0, 1);
          }
        );
      }
    }
  }

  handleChange = (field) => (event) => {
    let fieldValue = event.target.value;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [field]: fieldValue,
      },
    }));
  };
  renderTableprobabing(probabing) {
    if (probabing) {
      return probabing.map((student, index) => {
        const {
          client,
          date,
          value,
          probabing,
          
        } = student; 

        return (
          <td>
            {value}
          </td>
        );

        
      });
    }
  }

  renderTableData() {
    if (this.state.datalist) {
      return this.state.datalist.map((student, index) => {
        const {
          test_family,
          test,
          parametres,
          unite,
          cas,
          la,
          method,
          LQ,
          probabing,
        } = student; 

        return (
          
          <tr key={index}>
            <td>{test_family}</td>
            <td>{test}</td>
            <td>{parametres}</td>
            <td>{unite}</td>
            <td>{cas}</td>
            <td>{la}</td>
            <td>{method}</td>
            <td>{LQ}</td>
            {this.renderTableprobabing(probabing)}
          
          </tr>
        );

        
      });
    }
  }
  renderTableHeader() {
    if (this.state.datalist) {
      let header = Object.keys(this.state.datalist[0]);
      return header.map((key, index) => {
        if (key == "probabing") {
          return this.state.datalist[0].probabing.map((student1, index) => {
            const { client, probabing, value, date } = student1;
            return (
              <th key={index}>
                <div> {key.toUpperCase()}</div>
                <div>{client}</div>
                <div>{probabing}</div>
                <div>{date}</div>
              </th>
            );
          });
        }
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    }
  }

  updateProfile = () => {
   
    console.log("this.state.data ", this.state);
    let request = {
      data: this.state,
    };
    this.props.updateProfile(request);
  };

  


  onChangeFile = (e) => {
    const errs = [];
    const files = Array.from(e.target.files);

    this.setState({
      file: e.target.files[0],
    });

    // var request = {
    //   file: e.target.files[0],
    //   email: this.state.data.email,
    //   token: this.props.user.session.AccessToken,
    // };

    // this.props.updateProfilePicture(request);
  };

  

  handleChangeTenant = (event) => {
    this.setState(
      {
        data: {
          exceltype: event.target.value,
        },
      },
      function () {
        if (this.state.data.exceltype == 1) {
          this.setState({
            imagename: "exceltype1.png",
          });
        }
        if (this.state.data.exceltype == 2) {
          this.setState({
            imagename: "exceltype2.png",
          });
        }
        if (this.state.data.exceltype === "3") {
          this.setState({
            imagename: "exceltype3.png",
          });

          console.log("imagename", this.state.imagename);
        }

      }
    );
  };

  

  render() {
    const styleObj = {
      width: "1200px",
      height: "344px",
    };
    const tableStyle = {
      width: "100%",
    };
    return (
      <>
        <Container className="mt--6" fluid>
          <Row>
            <Col className="order-xl-2" xl="8">
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Excel</h3>
                      <img
                        src={require("assets/img/" + this.state.imagename)}
                        style={styleObj}
                      />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="12"></Col>
                  </Row>
                  {/*  </Form> */}
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="4">
              <Card>
                <CardHeader>
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h3 className="mb-0">Excel</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <Row>
                          <Col lg="12">
                            <FormGroup>
                              <label className="form-control-label">
                                Please Select File
                              </label>
                              <input
                                type="file"
                                id="single"
                                className="form-control"
                                name="file"
                                onChange={this.onChangeFile}
                                accept=".excel, .xls, .xlsx"
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <label className="form-control-label">
                          Please Select Excel Type
                        </label>
                        <FormGroup>
                          <Input
                            id="exampleFormControlSelect3"
                            type="select"
                            onChange={(e) => this.handleChangeTenant(e)}
                          >
                            <option value="">Select Excel Type</option>

                            <option value="1">Excel Type 1</option>
                            <option value="2">Excel Type 2</option>
                            <option value="3">Excel Type 3</option>
                          </Input>
                        </FormGroup>
                      </FormGroup>
                    </Col>
                  </Row>{" "}
                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <label className="form-control-label">
                          Please Enter Row For Header
                        </label>
                        <Input
                          id="row"
                          placeholder="Please Enter Row For Header "
                          type="text"
                          value={this.state.data.row}
                          onChange={this.handleChange("row")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="align-items-center">
                    <Col className="">
                      <Button
                        color="primary"
                        onClick={() => this.updateProfile()}
                        size="xl"
                        disabled={this.state.loading}
                      >
                        GO
                      </Button>
                    </Col>
                  </Row>
                  {/*  </Form> */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Container className="mt--12" fluid>
          <Row>
            <Col className="order-xl-2" xl="12">
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  {/*  </Form> */}
                  <Row>
                    <table id="customers">
                      {/* <tr>
                         {/* <th>Test Famaliy</th>
                        <th>TEST</th>
                        <th>parameter</th>
                        <th>Unité</th>
                        <th>NCAS</th>

                        <th>la%</th>
                        <th>LQ</th>
                        <th>method</th>

                        <th>probing date </th>
                        <th>probing client</th>
                        <th>probing</th> 
                        <th>probing value</th>  
                        </tr> */}

                      {/* {this.state.datalist.map(function (d, idx) {
                        
//  console.log("d.probabing ", d.probabing);
                        return (
                          <tr key={String(idx)}>
                            <td className="Cell">
                              {" "}
                              {d.category ? d.category : ""}
                            </td>
                            <td className="Cell">
                              {d.subcategory ? d.subcategory : ""}
                              {d.test ? d.test : ""}
                            </td>
                            <td className="Cell">
                              {d.parametres ? d.parametres : ""}
                              {d.parametre ? d.parametre : ""}
                            </td>

                            <td className="Cell">
                              {d.unite ? d.unite : ""}
                              {d.Unité ? d.Unité : ""}
                            </td>

                            <td className="Cell"> {d.cas ? d.cas : ""}</td>

                            <td className="Cell">
                              {" "}
                              {d.incertitude ? d.incertitude : ""}
                            </td>
                            <td> {d.LQ ? d.LQ : ""}</td>
                            <td className="Cell">
                              {d.method_analyse ? d.method_analyse : ""}
                            </td>
                            <td>
                              {d.probabing ?   d.probabing.map(function (c, idx){
                                return (<div>{c.date}</div>)

                              }) : ""}
                            </td> 
                             
                            <td>
                              {d.probabing ?   d.probabing.map(function (c, idx){
                                return (<div>{c.probabing}</div>)
                              }) : ""}
                            </td>
                            <td>
                              {d.probabing ?   d.probabing.map(function (c, idx){
                                return (<div>{c.value}</div>)
                              }) : ""}
                            </td>
                            
                          </tr>
                        );
                      })} */}
                      <tbody>
                        <tr>{this.renderTableHeader()}</tr>

                        {this.renderTableData()}
                      </tbody>
                    </table>
                    {/* {/* {Object.keys(this.state.datalist).map((month, key) => {
          return (     
            <tr key={key}>
              {this.state.datalist.map((person, index) => {
                return (
                  <tr key={String(key) + String(index)}>
                    <td>{month}</td>
                    <td>{person.name}</td>
                    <td>{person.date}</td>
                  </tr>
                );
              })} 
            </tr>         
          )
        })}
        </tbody>
      </table> */}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    userProfile: state.userProfile,
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
    updateProfile: (request) => {
      dispatch(actions.updateProfile(request));
    },
  
  };
};
//export default Login;

//export default MainContainer;
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer); //export components
