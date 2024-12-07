export default function SearchResult({ data }) {
  return <div onClick={() => console.log(data)}>{data.name}</div>;
}
