/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import ReactApexChart from "react-apexcharts";
import {
    Form,
    Container,
    Col,
    Row,
    Button,
    FormGroup,
    Label,
    Input,
} from "reactstrap"
import catSubcat from '../jsondropdown/cat_subcat.json'
import cityState from '../jsondropdown/city_state.json'
import CapFirst from '../utils/firstletterCap'

const Home = () => {
    let history = useHistory();

    const [dataframedata, setDataframeData] = useState([]);
    const [categorydatalabels, setCategoryDataLabels] = useState([]);
    const [categorycountvalue, setCategoryCountValue] = useState([]);
    const [subcategorydatalabels, setSubCategoryDataLabels] = useState([]);
    const [subcategorycountvalue, setSubCategoryCountValue] = useState([]);
    const [city, setCity] = useState("true");
    const [State, setState] = useState("California");
    const [showChart, setShowChart] = useState(false)

    useEffect(() => {
        load();
    }, [])


    const load = async () => {

    }

    const formSubbmit = async () => {
        const data = {
            sname: State,
            cname: city
        }
        await axios.post("/product_data", data)
            .then((result) => {
                setCategoryDataLabels(result.data.Category_lables)
                setCategoryCountValue(result.data.Category_Values)
                setSubCategoryDataLabels(result.data.SubCategory_lables)
                setSubCategoryCountValue(result.data.SubCategory_Values)
                setDataframeData(result.data.dataframe)
                setCity("true")
                setShowChart(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getCity = (stateName) => {
        if (stateName !== "true") {
            let cities = cityState[stateName];
            return cities.map((city, idx) => {
                return (
                    <option key={idx} value={city}>
                        {CapFirst(city)}
                    </option>
                );
            });
        }
    };
    const states = () => {
        var keys = Object.keys(cityState);
        return keys.map((state, idx) => {
            return (
                <option key={idx} value={state}>
                    {CapFirst(state)}
                </option>
            );
        });
    };

    return (
        <main>
            <div className="main__container">
                <Form>
                    <Label style={{ marginTop: "24px", marginBottom: "24px", textAlign: "center" }} ><h1>Research Per State and City</h1></Label>
                    <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
                        <Col xs={5}>
                            <FormGroup>
                                <Label>State</Label>
                                <Input
                                    type='select'
                                    name='State'
                                    value={State}
                                    onChange={(e) => setState(e.target.value)}
                                    style={{ marginTop: "24px" }}>
                                    <option selected value>
                                        -- select an option --
                                    </option>
                                    {states()}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs={5}>
                            <FormGroup>
                                <Label>City</Label>
                                <Input
                                    type='select'
                                    name='city'
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                    style={{ marginTop: "24px" }}>
                                    <option selected value>
                                        -- select an option --
                                    </option>
                                    {getCity(State)}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Col style={{ padding: "20px", textAlign: "left" }}>
                        <Button onClick={() => formSubbmit()} color='primary'>
                            Submit
                        </Button>
                    </Col>
                </Form>
                {showChart ?
                    <Container fluid className='contant-container'>
                        <Row>
                            <Col xs={3} style={{ margin: "auto" }}>
                                <h2 style={{ fontWeight: "bold" }}>Success Rate Of Category</h2>
                            </Col>
                            <Col >
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            width: 500,
                                            type: "pie",
                                        },
                                        labels:
                                            categorydatalabels,
                                        responsive: [
                                            {
                                                breakpoint: 480,
                                                options: {
                                                    chart: {
                                                        width: 300,
                                                    },
                                                    legend: {
                                                        position: "bottom",
                                                    },
                                                },
                                            },
                                        ],
                                    }}
                                    series={
                                        categorycountvalue
                                    }
                                    type='pie'
                                    width={500}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} style={{ margin: "auto" }}>
                                <h2 style={{ fontWeight: "bold" }}>Success Rate Of SubCategory</h2>
                            </Col>
                            <Col>
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            width: 500,
                                            type: "pie",
                                        },
                                        labels:
                                            subcategorydatalabels,
                                        responsive: [
                                            {
                                                breakpoint: 480,
                                                options: {
                                                    chart: {
                                                        width: 300,
                                                    },
                                                    legend: {
                                                        position: "bottom",
                                                    },
                                                },
                                            },
                                        ],
                                    }}
                                    series={
                                        subcategorycountvalue
                                    }
                                    type='pie'
                                    width={500}
                                />
                            </Col>
                        </Row>

                    </Container> : null}
            </div>
        </main>
    )
}


export default Home;