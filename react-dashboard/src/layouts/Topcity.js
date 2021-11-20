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
import CapFirst from '../utils/firstletterCap'

const Top10City = () => {
    const [category, setCatgory] = useState("Technology");
    const [subcategory, setSubCatgory] = useState("true");
    const [citylabels, setCityLables] = useState([]);
    const [cityvalue, setCityValue] = useState([]);
    const [salesSubCategoryLabel, setSalesSubCategoryLabel] = useState([]);
    const [profitSum, setProfitSum] = useState([])
    const [salesSum, setSalesSum] = useState([])
    const [showChart, setShowChart] = useState(false)

    useEffect(() => {
        load();
    }, [])


    const load = async () => {

    }

    const formSubbmit = async () => {
        const data = {
            cat: category,
            subCat: subcategory,
        }
        await axios.post("/top10City", data)
            .then((result) => {
                setCityLables(result.data.City_Sales_Lable)
                setCityValue(result.data.City_Sales_Value)
                setSalesSubCategoryLabel(result.data.SubCategory_labels)
                setProfitSum(result.data.Profit_Sum)
                setSalesSum(result.data.Sales_Sum)
                setSubCatgory("true")
                setShowChart(true);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getSubcategory = (category) => {
        if (category !== "true") {
            let subcategory = catSubcat[category];
            return subcategory.map((subcat, idx) => {
                return (
                    <option key={idx} value={subcat}>
                        {CapFirst(subcat)}
                    </option>
                );
            });
        }
    };
    const categories = () => {
        var keys = Object.keys(catSubcat);
        return keys.map((cat, idx) => {
            return (
                <option key={idx} value={cat}>
                    {CapFirst(cat)}
                </option>
            );
        });
    };

    return (
        <main>
            <div className="main__container">
                <Form>
                    <Label style={{ marginTop: "24px", marginBottom: "24px", textAlign: "center" }} ><h1>Research Per Category and SubCategory</h1></Label>
                    <Row style={{ marginTop: "24px", marginBottom: "24px" }}>
                        <Col xs={5}>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input
                                    type='select'
                                    name='category'
                                    value={category}
                                    onChange={(e) => setCatgory(e.target.value)}
                                    style={{ marginTop: "24px" }}>
                                    <option selected value>
                                        -- select an option --
                                    </option>
                                    {categories()}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs={5}>
                            <FormGroup>
                                <Label>SubCategory</Label>
                                <Input
                                    type='select'
                                    name='subcategory'
                                    onChange={(e) => setSubCatgory(e.target.value)}
                                    value={subcategory}
                                    style={{ marginTop: "24px" }}>
                                    <option selected value>
                                        -- select an option --
                                    </option>
                                    {getSubcategory(category)}
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
                            <Col>
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            type: "bar",
                                            height: 430,
                                        },
                                        title: {
                                            text: "Top 10 City",
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
                                            categories: citylabels
                                        },
                                    }}
                                    series={[
                                        { name: "SubCategory", data: cityvalue },
                                    ]}
                                    type='bar'
                                    height={500}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ReactApexChart
                                    options={{
                                        chart: {
                                            type: "bar",
                                            height: 430,
                                        },
                                        title: {
                                            text: "Sales and Profit based On sub Category",
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
                                            categories: salesSubCategoryLabel
                                        },
                                    }}
                                    series={[
                                        { name: "Sales", data: salesSum },
                                        { name: "Profit", data: profitSum },
                                    ]}
                                    type='bar'
                                    height={500}
                                />
                            </Col>

                        </Row>
                    </Container> : null}


            </div>
        </main>
    )
}


export default Top10City;