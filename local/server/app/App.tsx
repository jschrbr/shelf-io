import { React, ReatDOMServer } from "../deps.ts";

const loadingEl = React.createElement("h1", null, "Loading...");
export const loading = ReatDOMServer.renderToString(loadingEl);

const App = () => {
  // const [paddingGarden, setPadding] = React.useState("37px");
  const [parts, setParts] = React.useState(<span></span>);

  // const garden = {
  //   height: "auto",
  //   fontSize: "50px",
  //   padding: paddingGarden,
  //   width: "100%",
  //   alignSelf: "center",
  // };

  React.useEffect(() => {
    const url = "/graphql";
    const resolver = `    {
      getParts{
              name
              id
              quantity
          }
  }`;
    const query = { query: resolver };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((data: any) => {
        return data.json();
      })
      .then((data: any) => {
        const parts = data.data.getParts;
        const partArray = Array(parts.length).fill(0);
        parts.forEach((part: any, i: number) => {
          partArray[i] = (
            <div key={part.id} className="col s12 m6">
              <div className="card">
                <div className="card-title">{part.name}</div>
                <div className="card-content">{part.quantity}</div>
              </div>
            </div>
          );
        });
        setParts(partArray as any);
      });
  });

  return (
    <div className="center-align">
      <h2>Shelf-io</h2>
      {/* <a
        className="waves-effect waves-light btn"
        onClick={async () => {
          setCount(count + 1);
          setPadding("0px");
          setParts((await getParts()) as any);
        }}
      >
        Add a 🦕 in your garden!
      </a> */}
      <div className="row">{parts}</div>
    </div>
  );
};

export default App;
