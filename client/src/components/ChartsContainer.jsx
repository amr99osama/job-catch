import { useState } from "react";
import AreaChartComponent from "./AreaChartComponent";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartComponent from "./BarChartComponent";

const ChartsContainer = (data) => {
    console.log("the data", data)
    const [barChart, setBarChart] = useState(true);
    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type="button" onClick={() => setBarChart(!barChart)}>
                {barChart ? "Area Chart" : "Bar Chart"}
            </button>
            {barChart ? <BarChartComponent data={data.defaultMonthlyApps} /> : <AreaChartComponent data={data.defaultMonthlyApps} />}
        </Wrapper>
    );
};

export default ChartsContainer;