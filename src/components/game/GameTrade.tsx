import React, { useEffect, useState } from 'react';
import { RebaseHistory } from 'types';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

interface Props {
  history: Array<RebaseHistory>;
}

const GameTrade: React.FC<Props> = ({ history }: Props) => {
  const [labels, setLabels] = useState<Array<string>>([]);
  const [redData, setRedData] = useState<Array<number>>([]);
  const [blueData, setBlueData] = useState<Array<number>>([]);
  useEffect(() => {
    const _labels: Array<string> = [];
    const _redData: Array<number> = [];
    const _blueData: Array<number> = [];
    history.forEach((x) => {
      _labels.push(moment(x.date).format('HH:mm'));
      _redData.push(x.supply_red / Math.pow(10, 18));
      _blueData.push(x.supply_blue / Math.pow(10, 18));
    });
    setLabels(_labels);
    setRedData(_redData);
    setBlueData(_blueData);
  }, [history]);
  return (
    <div className='game-trade center-v'>
      <Line 
        data={{
          labels: labels,
          datasets: [
            {
              label: "Red's Token",
              data: redData,
              fill: false,
              borderColor: "red",
              pointBorderColor: "transparent",
              pointHoverBackgroundColor: "red"
            },
            {
              label: "Blue's Token",
              data: blueData,
              fill: false,
              borderColor: "Blue",
              pointBorderColor: "transparent",
              pointHoverBackgroundColor: "Blue"
            }
          ]
        }}
        options={{
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  drawOnChartArea: false
                },
                scaleLabel: {
                  display: true
                },
                ticks: {
                  autoSkip: true,
                  autoSkipPadding: 20
                }
              }
            ],
            yAxes: [{
              display: true,
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                  suggestedMax: 4,
                  min: 900000,
                  max: 1100000
              }
            }]
          },
          elements: {
            line: {
              fill: false
            }
          }
        }}
      />
    </div>
  )
}

export default GameTrade;
