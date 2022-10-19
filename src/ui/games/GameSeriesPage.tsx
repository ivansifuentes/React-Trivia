import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import styled from 'styled-components';
import { AxisOptions, Chart } from 'react-charts';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';

type MyDatum = { game: number, count: number };

const GameSeriesPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClickContinue = () => {
    navigate('/trivia');
  }

  const gameSeries = useSelector((state: RootState) => state.gameSeries);

  const data = React.useMemo(
    () => [{
      label: 'Correct',
      data: gameSeries.gameResults.map((gr, i) => ({
        game: i + 1,
        count: gr.correct
      }))
    }, {
      label: 'Incorrect',
      data: gameSeries.gameResults.map((gr, i) => ({
        game: i + 1,
        count: gr.incorrect
      }))
    }],
    [gameSeries.gameResults]
  );
  // console.log(data);
  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: datum => datum.game,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: datum => datum.count,
      },
    ],
    []
  );

  return (
    <div>
      <Header title="Game Series" />
      <ChartContainer>
        {gameSeries.gameResults.length > 0 ? (
          <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
        ) : (
          <NoResults>
            There are no results to show
          </NoResults>
        )}
      </ChartContainer>
      <Continue onClick={handleClickContinue}>
        Click to continue
      </Continue>
    </div>
  )
}

const ChartContainer = styled.div`
  min-width: 350px;
  max-width: 700px;
  min-height: 300px;
  padding: 25px;
  margin: 20px 0;
`;

const Continue = styled.div``;

const NoResults = styled.div``;

export default GameSeriesPage;
