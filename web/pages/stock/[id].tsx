import { useState, useEffect, Fragment } from "react";
import * as FirestoreService from "../../middleware/admin";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { scaleLinear } from "d3-scale";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

import { HomeStyle } from "../../helpers/theme";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";
import { line, curveStepAfter } from "d3-shape";

import ErrorMessage from "../../components/ErrorMessage";
import { CardActions } from "@material-ui/core";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    return {
      props: {
        id: params.id,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
interface PartType {
  name: string;
  quantity: number;
  id: string;
}

const format = () => (tick) => dayjs(tick).fromNow();

function Part({ id }) {
  dayjs.extend(relativeTime);

  const [part, setParts] = useState({} as PartType);
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [loadHistory, setLoadHistory] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamPart(id, {
      next: (querySnapshot) => {
        const updatedPart = querySnapshot.data();
        setParts(updatedPart);
        setLoading(false);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, ["part", setParts]);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamHistory(limit, id, {
      next: (querySnapshot) => {
        const updatedHistory = querySnapshot.docs.map((docSnapshot) => {
          const historyData = docSnapshot.data();
          historyData.updatedAt = new Date(historyData.updatedAt);
          return historyData;
        });

        setHistory(updatedHistory);
        setLoadHistory(false);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, [limit, id, setHistory]);

  const handleChange = (e) => {
    setLoadHistory(true);
    setLimit(e.target.value);
  };

  return (
    <main>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card elevation={6}>
              <CardContent>
                <ErrorMessage errorCode={errors}></ErrorMessage>
                <Container>
                  <Grid container spacing={3}>
                    <h2>
                      {loading ? <Skeleton /> : `Quantity: ${part.quantity}`}
                    </h2>
                  </Grid>
                  {loadHistory ? (
                    <Fragment>
                      <Grid container justify="center">
                        <Typography variant="h3">
                          <Skeleton width={200} />
                        </Typography>
                      </Grid>
                      <Skeleton variant="rect" height={475} />
                    </Fragment>
                  ) : (
                    <Chart data={history}>
                      <ArgumentAxis tickFormat={format} />
                      <ValueAxis />
                      <LineSeries
                        name={part.name}
                        valueField="quantity"
                        argumentField="updatedAt"
                        seriesComponent={(props) => (
                          <LineSeries.Path
                            {...props}
                            path={line()
                              .x(({ arg }) => arg)
                              .y(({ val }) => val)
                              .curve(curveStepAfter)}
                          />
                        )}
                      />
                      <Title text={part.name} />
                      <Animation />
                    </Chart>
                  )}
                </Container>
              </CardContent>
              <CardActions>
                <Container>
                  <Grid container justify="flex-end">
                    <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Results
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          fullWidth
                          value={limit}
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={25}>25</MenuItem>
                          <MenuItem value={50}>50</MenuItem>
                          <MenuItem value={0}>All</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Container>
              </CardActions>
            </Card>
          </Grid>
          <HomeStyle />
        </Grid>
      </Container>
    </main>
  );
}

export default Part;
