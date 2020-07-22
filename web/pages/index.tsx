import React, { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import * as FirestoreService from "../middleware/admin";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import Container from "@material-ui/core/Container";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ErrorMessage from "../components/ErrorMessage";

import { CardStyle, HomeStyle } from "../helpers/theme";

function Home() {
  const [parts, setParts] = useState([]);
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamParts(0, {
      next: (querySnapshot) => {
        const updatedParts = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setLoading(false);
        setParts(updatedParts);
      },
      error: () => setError("item-get-fail"),
    });
    return unsubscribe;
  }, ["parts", setParts]);

  const partCards = parts.map((part) => (
    <Fragment key={`${part.id}`}>
      <Grid item xs={12} sm={6}>
        <Card elevation={6}>
          <CardContent>
            <Link href="stock/[id]" as={`/stock/${part.id}`} prefetch={true}>
              <a>
                <h3>Name: {part.name}&rarr;</h3>
                <p>Quantity: {part.quantity}</p>
              </a>
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <CardStyle />
    </Fragment>
  ));

  const loadCards = (count = 12) => {
    const loadSkeleton: any = [];

    for (let i = 0; i < count; i++) {
      loadSkeleton.push(
        <Fragment key={i}>
          <Grid item xs={12} sm={6}>
            <Card elevation={6}>
              <CardContent>
                <h3>
                  <Skeleton width={250} />
                </h3>
                <p>
                  <Skeleton width={80} />
                </p>
              </CardContent>
            </Card>
          </Grid>

          <CardStyle />
        </Fragment>,
      );
    }
    return loadSkeleton;
  };

  return (
    <Container>
      <Head>
        <title>Shelf-io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid container spacing={2}>
          <ErrorMessage errorCode={errors}></ErrorMessage>
          {loading ? loadCards() : partCards}
        </Grid>
      </main>

      <HomeStyle />
    </Container>
  );
}

export default Home;
