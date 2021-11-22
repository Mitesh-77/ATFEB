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
import cityState from '../jsondropdown/city_state.json'
import yearsList from '../jsondropdown/month_year.json'
import CapFirst from '../utils/firstletterCap'

const DailySales = () => {
    let history = useHistory();

    const [DailyLabels, setDailyLabels] = useState([]);
    const [furnitureProfit, setFurnitureProfit] = useState([]);
    const [officeSuppliesProfit, setOfficeSuppliesProfit] = useState([]);
    const [technologyProfit, setTechnologyProfit] = useState([]);
    const [city, setCity] = useState("true");
    const [year, setYear] = useState("0000");
    const [month, setMonth] = useState("0");
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
            cname: city,
            year: year,
            month: month,
        }
        await axios.post("/dailySales", data)
            .then((result) => {
                setFurnitureProfit(result.data.Furniture_profit)
                setOfficeSuppliesProfit(result.data.Office_Supplies_profit)
                setTechnologyProfit(result.data.Technology_profit)
                setDailyLabels(result.data.Order_Day_labels)
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

    const getYear = () => {
        var value = yearsList["year"]
        return value.map((year, idx) => {
            return (
                <option key={idx} value={year}>
                    {year}
                </option>
            );
        });
    };

    const getMonth = () => {
        var value = yearsList["month"]
        return value.map((month, idx) => {
            return (
                <option key={idx} value={month}>
                    {month}
                </option>
            );
        });
    };

    return (
        <main>
            <div className="main__container animate__animated animate__fadeInUp">
                <Form>
                    <div className="head">Daily Research Per State and City</div>
                    <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
                        <Col xs={5}>
                            <FormGroup>
                                <Label>Year</Label>
                                <Input
                                    type='select'
                                    name='year'
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    style={{ marginTop: "24px" }}>
                                    <option selected value>
                                        -- select an option --
                                    </option>
                                    {getYear()}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs={5}>
                            <FormGroup>
                                <Label>Month</Label>
                                <Input
                                    type='select'
                                    name='month'
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    style={{ marginTop: "24px" }}>
                                    <option selected value>
                                        -- select an option --
                                    </option>
                                    {getMonth()}
                                </Input>
                            </FormGroup>
                        </Col>
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
                    <Col style={{ padding: "0px", textAlign: "left" }}>
                        <Button onClick={() => formSubbmit()} color='primary'>
                            Submit
                        </Button>
                    </Col>
                </Form>
                {showChart ?
                    <Container fluid className='contant-container animate__animated animate__fadeInUp '>
                        <Row>
                            <Col xs={3} style={{ margin: "auto" }}>
                                <h2 style={{ fontWeight: "bold" }}>Daily profit</h2>
                            </Col>
                            <Col>
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            type: "bar",
                                            height: 430,
                                        },
                                        title: {
                                            text: "Profit Daily in %",
                                        },
                                        plotOptions: {
                                            bar: {
                                                horizontal: false,
                                                dataLabels: {
                                                    position: "top",
                                                },
                                            },
                                        },
                                        dataLabels: {
                                            enabled: true,
                                            offsetX: -6,
                                            style: {
                                                fontSize: "12px",
                                                colors: ["black"],
                                            },
                                        },
                                        stroke: {
                                            show: true,
                                            width: 1,
                                            colors: ["#fff"],
                                        },
                                        tooltip: {
                                            shared: true,
                                            intersect: false,
                                        },
                                        xaxis: {
                                            categories: DailyLabels
                                        },
                                    }}
                                    series={[
                                        { name: "Office Supplies", data: officeSuppliesProfit },
                                        { name: "Furniture", data: furnitureProfit },
                                        { name: "Technology", data: technologyProfit }
                                    ]}
                                    type='bar'
                                    height={500}
                                    width={1000}
                                />
                            </Col>
                        </Row>

                    </Container> : null}
            </div>
        </main>
    )
}


export default DailySales;