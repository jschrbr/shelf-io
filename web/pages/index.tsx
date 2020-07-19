import React, { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import * as FirestoreService from "../services/admin";

import ErrorMessage from "../components/ErrorMessage";

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
    <Fragment>
      <Link
        href="stock/[id]"
        as={`/stock/${part.id}`}
        key={`${part.id}`}
        prefetch={true}
      >
        <a className="card">
          <h3>Name: {part.name} &rarr;</h3>
          <p>Quantity: {part.quantity}</p>
        </a>
      </Link>
      <style jsx>{`
        a {
          color: #0070f3;
          text-decoration: none;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </Fragment>
  ));

  return (
    <div className="container">
      <Head>
        <title>Shelf-io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid">
          <ErrorMessage errorCode={errors}></ErrorMessage>
          {groceryItemElements}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
