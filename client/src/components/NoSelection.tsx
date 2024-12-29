type Props = {
  item: string;
};

function NoSelection({ item }: Props) {
  return (
    <>
      <h1>No {item} selected.</h1>
    </>
  );
}

export { NoSelection };
