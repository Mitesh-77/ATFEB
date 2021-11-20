from flask import request, render_template
from app import app
import pandas as pd
df = pd.read_csv('static/All_data_US_Store.csv')

@app.route("/", methods=["get", "post"])
def test1():
    return render_template("index.html")


@app.route("/sales_data", methods=["get", "post"])
def sales_data():
    if request.method == "GET":
        new_df = df
        response = dict()
        response["Sales"] = list(map(list, new_df["Sales"].to_dict().items()))
        response["Category"] = list(map(list, new_df["Category"].to_dict().items()))
        return response



@app.route("/product_data", methods=["get", "post"])
def product_data():
    if request.method == "POST":
        re = request.get_json()
        # no = int(request.form.get("fname"))
        print(re)
        state = re["sname"]
        city = re["cname"]
        new_df = df
        new_df = filterByStateAndCity(new_df,state,city)
        response = dict()
        # response["Segment"] = list(map(list, new_df["Segment"].value_counts().to_dict().items()))
        Category= list(map(list, new_df["Category"].value_counts().to_dict().items()))
        response["Category_lables"] = [x for x,y in Category]
        response["Category_Values"] = [y for x,y in Category]
        Sub_Category = list(map(list, new_df["Sub-Category"].value_counts().head(10).to_dict().items()))
        response["SubCategory_lables"] = [x for x, y in Sub_Category]
        response["SubCategory_Values"] = [y for x, y in Sub_Category]
        response["dataframe"] = new_df.to_dict()
        # response["Product-Name"] = list(map(list, new_df["Product Name"].value_counts().to_dict().items()))
        print(response)
        return response

@app.route("/top10City", methods=["get", "post"])
def top10City():
    if request.method == "POST":
        re = request.get_json()
        Category = re["cat"]
        subCategory = re["subCat"]
        new_df = filterDataWithCatAndSubCat(Category,subCategory)
        response = dict()
        City_Sales = list(map(list, new_df.groupby(['City'])['Sales'].mean().round(2).sort_values(ascending=False).head(10).to_dict().items()))
        City_Sales_lable = [x for x, y in City_Sales]
        City_Sales_Value = [y for x, y in City_Sales]
        response["City_Sales_Lable"] = City_Sales_lable
        response["City_Sales_Value"] = City_Sales_Value
        return salesProfitPerSubCategory(response, new_df)

@app.route("/top10State", methods=["get", "post"])
def top10State():
    if request.method == "POST":
        re = request.get_json()
        Category = re["cat"]
        subCategory = re["subCat"]
        new_df = filterDataWithCatAndSubCat(Category,subCategory)
        response = dict()
        State_Sales= list(map(list, new_df.groupby(['State'])['Sales'].mean().round(2).sort_values(ascending=False).head(10).to_dict().items()))
        State_Sales_lable = [x for x,y in State_Sales]
        State_Sales_Value = [y for x,y in State_Sales]
        response["State_Sales_Lable"] = State_Sales_lable
        response["State_Sales_Value"] = State_Sales_Value
        return salesProfitPerSubCategory(response, new_df)

@app.route("/yearlySales", methods=["get", "post"])
def yearlySales():
    if request.method == "POST":
        re = request.get_json()
        state = re["sname"]
        city = re["cname"]
        new_df = df
        new_df = filterByStateAndCity(new_df,state,city)
        response = dict()
        profit = list(map(list, new_df.groupby(['order year','Category'])['Profit %'].mean().round(2).to_dict().items()))
        tmp_year = []
        tmp_furniture = []
        tmp_office_supplies = []
        tmp_technology = []
        for (x,y), z in profit:
            if x not in tmp_year:
                tmp_year.append(x)
            if (y == "Furniture"):
                tmp_furniture.append(z)
            if (y == "Office Supplies"):
                tmp_office_supplies.append(z)
            if (y == "Technology"):
                tmp_technology.append(z)
        response["Order_year_labels"] = tmp_year
        print(response)
        return categoryProfit(response,tmp_furniture,tmp_office_supplies,tmp_technology)

@app.route("/monthlySales", methods=["get", "post"])
def monthlySales():
    if request.method == "POST":
        re = request.get_json()
        year = int(re["year"])
        state = re["sname"]
        city = re["cname"]
        new_df = df
        if (year != "" and year != 0000):
            new_df = new_df[(new_df['order year']) == year]
        new_df = filterByStateAndCity(new_df,state,city)
        response = dict()
        profit = list(map(list, new_df.groupby(['order month','Category'])['Profit %'].mean().round(2).to_dict().items()))
        tmp_month = []
        tmp_furniture = []
        tmp_office_supplies = []
        tmp_technology = []
        print(profit)
        for (x,y), z in profit:
            if x not in tmp_month:
                tmp_month.append(x)
            if (y == "Furniture"):
                tmp_furniture.append(z)
            if (y == "Office Supplies"):
                tmp_office_supplies.append(z)
            if (y == "Technology"):
                tmp_technology.append(z)
        response["Order_month_labels"] = tmp_month
        print(response)
        return categoryProfit(response,tmp_furniture,tmp_office_supplies,tmp_technology)

@app.route("/dailySales", methods=["get", "post"])
def dailySales():
    if request.method == "POST":
        re = request.get_json()
        year = int(re["year"])
        month = int(re["month"])
        state = re["sname"]
        city = re["cname"]
        new_df = df
        if (year != "" and year != 0000):
            new_df = new_df[(new_df['order year']) == year]
        if (month != "" and month != 0000):
            new_df = new_df[(new_df['order month']) == month]
        new_df = filterByStateAndCity(new_df,state,city)
        response = dict()
        profit = list(map(list, new_df.groupby(['order day','Category'])['Profit %'].mean().round(2).to_dict().items()))
        tmp_day = []
        tmp_furniture = []
        tmp_office_supplies = []
        tmp_technology = []
        print(profit)
        for (x,y), z in profit:
            if x not in tmp_day:
                tmp_day.append(x)
            if (y == "Furniture"):
                tmp_furniture.append(z)
            if (y == "Office Supplies"):
                tmp_office_supplies.append(z)
            if (y == "Technology"):
                tmp_technology.append(z)

        response["Order_Day_labels"] = tmp_day
        return categoryProfit(response,tmp_furniture,tmp_office_supplies,tmp_technology)

def categoryProfit(response,tmp_furniture,tmp_office_supplies,tmp_technology):
    response["Furniture_profit"] = tmp_furniture
    response["Office_Supplies_profit"] = tmp_office_supplies
    response["Technology_profit"] = tmp_technology
    return response


def salesProfitPerSubCategory(response,new_df):
    SubCategory_labels = list(new_df["Sub-Category"].unique())
    Sales_1 = new_df.groupby('Sub-Category')['Profit', 'Sales'].agg(['sum'])
    Profit_Sum = [round(x, 2) for x in Sales_1["Profit"]["sum"]]
    Sales_Sum = [round(y, 2) for y in Sales_1["Sales"]["sum"]]
    response["SubCategory_labels"] = SubCategory_labels
    response["Profit_Sum"] = Profit_Sum
    response["Sales_Sum"] = Sales_Sum
    return response

def filterDataWithCatAndSubCat(Category,subCategory):
    new_df = df
    if Category != "" and subCategory != "" and Category != "true" and subCategory != "true":
        new_df = new_df[(new_df['Category'] == Category) & (new_df['Sub-Category'] == subCategory)]
    elif Category != "" and Category != "true":
        new_df = new_df[new_df['Category'] == Category]
    elif subCategory != "" and subCategory != "true":
        new_df = new_df[new_df['Sub-Category'] == subCategory]
    else:
        new_df = new_df
    return new_df

def filterByStateAndCity(new_df,state,city):
    print(state, city)
    if state != "" and city != "" and state != "true" and city != "true":
        new_df = new_df[(new_df['State'] == state) & (new_df['City'] == city)]
    elif state != "" and state != "true":
        new_df = new_df[new_df['State'] == state]
    elif city != "" and city != "true":
        new_df = new_df[new_df['City'] == city]
    else:
        new_df = new_df
    return  new_df