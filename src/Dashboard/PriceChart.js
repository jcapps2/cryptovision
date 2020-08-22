import React from "react";
import highchartsConfig from "./HighchartsConfig";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighchartsTheme from "./HighchartsTheme";

// Setting theme
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function() {
  return (
    <AppContext.Consumer>
      {({ historical }) => (
        <Tile>
          {historical ? (
            <ReactHighcharts config={highchartsConfig(historical)} />
          ) : (
            <div>Loading historical data...</div>
          )}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
