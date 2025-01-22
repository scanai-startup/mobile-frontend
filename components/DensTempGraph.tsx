import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryLine,
  VictoryLabel,
  VictoryLegend,
} from "victory-native";

const dataTemp = [
  { x: 1, y: 30 }, // Dia 1, temperatura = 30
  { x: 2, y: 28 },
  { x: 3, y: 32 },
  { x: 4, y: 31 },
  { x: 5, y: 29 },
];

const dataDens = [
  { x: 1, y: 1.15 }, // Dia 1, densidade = 1.2
  { x: 2, y: 1.15 },
  { x: 3, y: 1.25 },
  { x: 4, y: 1.18 },
  { x: 5, y: 1.22 },
];

export function DensTempGraph() {
  return (
    <VictoryChart domainPadding={{ x: 30, y: 20 }}>
      {/* Eixo X: Dias */}
      <VictoryAxis
        label="Dias"
        style={{
          axisLabel: { padding: 30 },
          tickLabels: { fontSize: 10 },
        }}
      />

      {/* Eixo Y: Temperatura / Densidade */}
      <VictoryAxis
        dependentAxis
        label="Temperatura (ºC) e Densidade (g/cm³)"
        style={{
          axisLabel: { padding: 30 },
          tickLabels: { fontSize: 10 },
        }}
      />

      {/* Barras da Temperatura */}
      <VictoryBar
        data={dataTemp}
        barWidth={24}
        style={{
          data: { fill: "rgba(255, 0, 0, 0.5)" },
        }}
        x="x"
        y="y"
      />

      <VictoryLine
        data={[
          { x: 1, y: 24 },
          { x: 5, y: 24 },
        ]}
        style={{
          data: {
            stroke: "green",
            strokeWidth: 2,
            strokeDasharray: "5,5",
          },
        }}
        labels={(label) => {
          if (label.index == "1") return "Temp: 28";
          return "";
        }}
        labelComponent={
          <VictoryLabel dy={-10} style={{ fontSize: 14, fontWeight: 700 }} />
        }
      />

      {/* Linha de Média Densidade */}
      <VictoryLine
        data={[
          { x: 1, y: 10 },
          { x: 5, y: 10 },
        ]}
        style={{
          data: {
            stroke: "black",
            strokeWidth: 2,
            strokeDasharray: "5,5",
          },
        }}
        labels={(label) => {
          if (label.index == "1") return "Dens: 10";
          return "";
        }}
        labelComponent={
          <VictoryLabel dy={-10} style={{ fontSize: 14, fontWeight: 700 }} />
        }
      />

      {/* Barras da Densidade */}
      <VictoryBar
        data={dataDens}
        barWidth={24}
        style={{
          data: { fill: "rgba(0, 0, 255, 0.7)" },
        }}
        x="x"
        y={(d) => d.y * 10}
      />

      {/* Legenda */}
      <VictoryLegend
        x={125}
        y={10}
        orientation="horizontal"
        gutter={20}
        data={[
          {
            name: "Temperatura",
            symbol: { fill: "rgba(255, 0, 0, 0.5)" },
          },
          {
            name: "Densidade",
            symbol: { fill: "rgba(0, 0, 255, 0.5)" },
          },
        ]}
      />
    </VictoryChart>
  );
}
