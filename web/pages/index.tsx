import React, { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import * as FirestoreService from "../services/admin";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import ErrorMessage from "../components/ErrorMessage";
import Dial from "../components/Dial";

import { CardStyle, HomeStyle } from "../helpers/theme";

function Home() {
  const [groceryItems, setGroceryItems] = useState([]);
  const [errors, setError] = useState("");

  useEffect(() => {
    const unsubscribe = FirestoreService.streamParts({
      next: (querySnapshot) => {
        const updatedGroceryItems = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setGroceryItems(updatedGroceryItems);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, ["parts", setGroceryItems]);

  const groceryItemElements = groceryItems.map((part) => (
    <Fragment key={`${part.id}`}>
      <Grid item xs={6}>
        <Card elevation={6}>
          <CardContent>
            <Link href="stock/[id]" as={`/stock/${part.id}`} prefetch={true}>
              <a>
                <h3>Name: {part.name}</h3>
                <p>Quantity: {part.quantity}</p>
              </a>
            </Link>
          </CardContent>
        </Card>
      </Grid>

      <CardStyle />
    </Fragment>
  ));

  return (
    <div className="container">
      <Head>
        <title>Shelf-io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Grid container spacing={2}>
          <ErrorMessage errorCode={errors}></ErrorMessage>

          {groceryItemElements}
        </Grid>
      </main>
      <Dial />

      <HomeStyle />
    </div>
  );
}

export default Home;
