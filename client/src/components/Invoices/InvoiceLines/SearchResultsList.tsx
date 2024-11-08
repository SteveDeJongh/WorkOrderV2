import SearchResult from "./SearchResult";

type Props = {
  results: Array<object> | String;
};

export default function SearchResultsList({ results }: Props) {
  console.log("results", results instanceof String);
  if (typeof results === "string" || results instanceof String) {
    return <div>No Results</div>;
  }
  return (
    <>
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult key={id} data={result} />;
        })}
      </div>
    </>
  );
}
